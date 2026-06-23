import { decode } from "base64-arraybuffer";

import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentDaycareId, getCurrentUser } from "./auth.service";

const GALLERY_BUCKET = "gallery";

export type GalleryMediaType = "image" | "video";

export interface GalleryPhoto {
  id: string;
  label: string;
  imageUrl: string;
  mediaType: GalleryMediaType;
  createdAt: string;
}

function publicGalleryUrl(imagePath: string): string | null {
  const baseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    return null;
  }
  return `${baseUrl}/storage/v1/object/public/${GALLERY_BUCKET}/${imagePath}`;
}

function mediaTypeFromPath(path: string): GalleryMediaType {
  return /\.(mp4|mov|webm|m4v)$/i.test(path) ? "video" : "image";
}

function extensionForMime(mimeType: string): string {
  if (mimeType.includes("png")) {
    return "png";
  }
  if (mimeType.includes("quicktime")) {
    return "mov";
  }
  if (mimeType.startsWith("video/")) {
    return "mp4";
  }
  return "jpg";
}

async function readUploadBody(uri: string, mimeType: string): Promise<ArrayBuffer | Blob> {
  if (mimeType.startsWith("video/")) {
    const response = await fetch(uri);
    return await response.blob();
  }

  const FileSystem = await import("expo-file-system/legacy");
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return decode(base64);
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const daycareId = getCurrentDaycareId();
  if (!daycareId) {
    return [];
  }

  const { data, error } = await supabase
    .from("gallery_photos")
    .select("*")
    .eq("daycare_id", daycareId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data
    .map((row) => {
      const imageUrl = publicGalleryUrl(row.image_path);
      if (!imageUrl) {
        return null;
      }
      return {
        id: row.id,
        label: row.label ?? "תמונה",
        imageUrl,
        mediaType: mediaTypeFromPath(row.image_path),
        createdAt: row.created_at,
      };
    })
    .filter((row): row is GalleryPhoto => row !== null);
}

export async function uploadGalleryMedia(
  fileUri: string,
  label: string,
  mimeType = "image/jpeg",
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const daycareId = getCurrentDaycareId();
  const userId = getCurrentUser().id;
  if (!daycareId) {
    return false;
  }

  try {
    const ext = extensionForMime(mimeType);
    const path = `${daycareId}/${Date.now()}.${ext}`;
    const body = await readUploadBody(fileUri, mimeType);

    const { error: uploadError } = await supabase.storage
      .from(GALLERY_BUCKET)
      .upload(path, body, { contentType: mimeType, upsert: false });

    if (uploadError) {
      return false;
    }

    const defaultLabel = mimeType.startsWith("video/") ? "סרטון" : "תמונה";
    const { error } = await supabase.from("gallery_photos").insert({
      daycare_id: daycareId,
      image_path: path,
      label: label.trim() || defaultLabel,
      uploaded_by: userId,
    });

    return !error;
  } catch {
    return false;
  }
}

/** @deprecated Use uploadGalleryMedia */
export async function uploadGalleryPhoto(
  fileUri: string,
  label: string,
  mimeType = "image/jpeg",
): Promise<boolean> {
  return uploadGalleryMedia(fileUri, label, mimeType);
}

export async function deleteGalleryPhoto(photoId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return true;
  }

  const { data: row } = await supabase
    .from("gallery_photos")
    .select("image_path")
    .eq("id", photoId)
    .single();

  if (row?.image_path) {
    await supabase.storage.from(GALLERY_BUCKET).remove([row.image_path]);
  }

  const { error } = await supabase.from("gallery_photos").delete().eq("id", photoId);
  return !error;
}
