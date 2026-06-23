import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export type GalleryCaptureMode = "camera-photo" | "camera-video" | "library";

export interface PickedGalleryMedia {
  uri: string;
  mimeType: string;
  fileName?: string | null;
  mediaType: "image" | "video";
}

async function requestCameraPermission(): Promise<boolean> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("הרשאה נדרשת", "יש לאשר גישה למצלמה כדי לצלם תמונות וסרטונים.");
    return false;
  }
  return true;
}

async function requestLibraryPermission(): Promise<boolean> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("הרשאה נדרשת", "יש לאשר גישה לגלריית המדיה.");
    return false;
  }
  return true;
}

function mapAsset(asset: ImagePicker.ImagePickerAsset): PickedGalleryMedia {
  const mimeType = asset.mimeType ?? (asset.type === "video" ? "video/mp4" : "image/jpeg");
  return {
    uri: asset.uri,
    mimeType,
    fileName: asset.fileName,
    mediaType: asset.type === "video" || mimeType.startsWith("video/") ? "video" : "image",
  };
}

export async function pickGalleryMedia(mode: GalleryCaptureMode): Promise<PickedGalleryMedia | null> {
  if (mode === "library") {
    if (!(await requestLibraryPermission())) {
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 0.85,
      videoMaxDuration: 60,
    });

    if (result.canceled || !result.assets?.length) {
      return null;
    }

    return mapAsset(result.assets[0]);
  }

  if (!(await requestCameraPermission())) {
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: mode === "camera-video" ? ["videos"] : ["images"],
    quality: 0.85,
    videoMaxDuration: 60,
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  return mapAsset(result.assets[0]);
}
