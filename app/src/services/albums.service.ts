import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentDaycareId, getCurrentUser } from "./auth.service";

const GALLERY_BUCKET = "gallery";

export interface GalleryAlbum {
  id: string;
  title: string;
  theme: string;
  description: string | null;
  photoCount: number;
  coverImageUrl: string | null;
  createdAt: string;
}

export interface GalleryAlbumPhoto {
  id: string;
  label: string;
  imageUrl: string;
  sortOrder: number;
}

export interface GalleryAlbumDetail extends GalleryAlbum {
  photos: GalleryAlbumPhoto[];
}

function publicGalleryUrl(imagePath: string): string | null {
  const baseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    return null;
  }
  return `${baseUrl}/storage/v1/object/public/${GALLERY_BUCKET}/${imagePath}`;
}

export const ALBUM_THEMES = [
  { id: "trip", label: "טיול" },
  { id: "birthday", label: "יום הולדת" },
  { id: "holiday", label: "חג" },
  { id: "daily", label: "יום בגן" },
  { id: "art", label: "יצירה" },
] as const;

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const daycareId = getCurrentDaycareId();
  if (!daycareId) {
    return [];
  }

  const { data: albums, error } = await supabase
    .from("gallery_albums")
    .select("*")
    .eq("daycare_id", daycareId)
    .order("created_at", { ascending: false });

  if (error || !albums) {
    return [];
  }

  const results: GalleryAlbum[] = [];

  for (const album of albums) {
    const { count } = await supabase
      .from("gallery_album_photos")
      .select("*", { count: "exact", head: true })
      .eq("album_id", album.id);

    let coverImageUrl: string | null = null;
    if (album.cover_photo_id) {
      const { data: cover } = await supabase
        .from("gallery_photos")
        .select("image_path")
        .eq("id", album.cover_photo_id)
        .maybeSingle();
      if (cover?.image_path) {
        coverImageUrl = publicGalleryUrl(cover.image_path);
      }
    }

    results.push({
      id: album.id,
      title: album.title,
      theme: album.theme,
      description: album.description,
      photoCount: count ?? 0,
      coverImageUrl,
      createdAt: album.created_at,
    });
  }

  return results;
}

export async function getGalleryAlbumDetail(albumId: string): Promise<GalleryAlbumDetail | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data: album, error } = await supabase
    .from("gallery_albums")
    .select("*")
    .eq("id", albumId)
    .single();

  if (error || !album) {
    return null;
  }

  const { data: links } = await supabase
    .from("gallery_album_photos")
    .select("sort_order, photo_id")
    .eq("album_id", albumId)
    .order("sort_order");

  const photoIds = (links ?? []).map((l) => l.photo_id);
  let photos: GalleryAlbumPhoto[] = [];

  if (photoIds.length) {
    const { data: photoRows } = await supabase
      .from("gallery_photos")
      .select("id, label, image_path")
      .in("id", photoIds);

    const orderMap = new Map((links ?? []).map((l) => [l.photo_id, l.sort_order]));
    photos = (photoRows ?? [])
      .map((photo) => {
        const imageUrl = publicGalleryUrl(photo.image_path);
        if (!imageUrl) {
          return null;
        }
        return {
          id: photo.id,
          label: photo.label ?? "תמונה",
          imageUrl,
          sortOrder: orderMap.get(photo.id) ?? 0,
        };
      })
      .filter((p): p is GalleryAlbumPhoto => p !== null)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  const coverImageUrl = photos[0]?.imageUrl ?? null;

  return {
    id: album.id,
    title: album.title,
    theme: album.theme,
    description: album.description,
    photoCount: photos.length,
    coverImageUrl,
    createdAt: album.created_at,
    photos,
  };
}

export async function createGalleryAlbum(input: {
  title: string;
  theme: string;
  description?: string;
  photoIds: string[];
}): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const daycareId = getCurrentDaycareId();
  const userId = getCurrentUser().id;
  if (!daycareId || !input.photoIds.length) {
    return false;
  }

  const coverPhotoId = input.photoIds[0];

  const { data: album, error } = await supabase
    .from("gallery_albums")
    .insert({
      daycare_id: daycareId,
      title: input.title.trim(),
      theme: input.theme,
      description: input.description?.trim() || null,
      cover_photo_id: coverPhotoId,
      created_by: userId,
    })
    .select("id")
    .single();

  if (error || !album) {
    return false;
  }

  const rows = input.photoIds.map((photoId, index) => ({
    album_id: album.id,
    photo_id: photoId,
    sort_order: index,
  }));

  const { error: linkError } = await supabase.from("gallery_album_photos").insert(rows);
  return !linkError;
}

export async function deleteGalleryAlbum(albumId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return true;
  }

  const { error } = await supabase.from("gallery_albums").delete().eq("id", albumId);
  return !error;
}

export function themeLabel(themeId: string): string {
  return ALBUM_THEMES.find((t) => t.id === themeId)?.label ?? themeId;
}
