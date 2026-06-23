import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Json } from "../types/database";
import { getCurrentDaycareId, getCurrentUser } from "./auth.service";
import {
  formatScheduleLabel,
  isCameraWithinSchedule,
  parseCameraSchedule,
  type CameraSchedule,
} from "../utils/cameraSchedule";

export interface Camera {
  id: string;
  name: string;
  location: string | null;
  streamProvider: string;
  streamExternalId: string | null;
  isEnabled: boolean;
  schedule: CameraSchedule;
  scheduleLabel: string;
  isWithinSchedule: boolean;
  createdAt: string;
}

export interface CameraStreamSession {
  streamUrl: string;
  expiresAt: string;
  provider: string;
}

function mapCamera(row: {
  id: string;
  name: string;
  location: string | null;
  stream_provider: string;
  stream_external_id: string | null;
  is_enabled: boolean;
  schedule_json: unknown;
  created_at: string;
}): Camera {
  const schedule = parseCameraSchedule(row.schedule_json);
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    streamProvider: row.stream_provider,
    streamExternalId: row.stream_external_id,
    isEnabled: row.is_enabled,
    schedule,
    scheduleLabel: formatScheduleLabel(schedule),
    isWithinSchedule: isCameraWithinSchedule(schedule),
    createdAt: row.created_at,
  };
}

export async function getCamerasForTeacher(): Promise<Camera[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const daycareId = getCurrentDaycareId();
  if (!daycareId) {
    return [];
  }

  const { data, error } = await supabase
    .from("cameras")
    .select("*")
    .eq("daycare_id", daycareId)
    .order("name");

  if (error || !data) {
    return [];
  }

  return data.map(mapCamera);
}

export async function getEnabledCamerasForParent(): Promise<Camera[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const daycareId = getCurrentDaycareId();
  if (!daycareId) {
    return [];
  }

  const { data, error } = await supabase
    .from("cameras")
    .select("*")
    .eq("daycare_id", daycareId)
    .eq("is_enabled", true)
    .order("name");

  if (error || !data) {
    return [];
  }

  return data.map(mapCamera);
}

export async function hasCameraConsent(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const userId = getCurrentUser().id;
  const daycareId = getCurrentDaycareId();
  if (!userId || !daycareId) {
    return false;
  }

  const { data } = await supabase
    .from("camera_consents")
    .select("profile_id")
    .eq("profile_id", userId)
    .eq("daycare_id", daycareId)
    .maybeSingle();

  return Boolean(data);
}

export async function setCameraConsent(consented: boolean): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return consented;
  }

  const userId = getCurrentUser().id;
  const daycareId = getCurrentDaycareId();
  if (!userId || !daycareId) {
    return false;
  }

  if (!consented) {
    const { error } = await supabase
      .from("camera_consents")
      .delete()
      .eq("profile_id", userId)
      .eq("daycare_id", daycareId);
    return !error;
  }

  const { error } = await supabase.from("camera_consents").upsert(
    {
      profile_id: userId,
      daycare_id: daycareId,
      consented_at: new Date().toISOString(),
    },
    { onConflict: "profile_id,daycare_id" },
  );

  return !error;
}

export async function getCameraStreamUrl(cameraId: string): Promise<CameraStreamSession | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) {
    return null;
  }

  const baseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/functions/v1/get-camera-stream`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cameraId }),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as CameraStreamSession;
    return payload.streamUrl ? payload : null;
  } catch {
    return null;
  }
}

export interface UpsertCameraInput {
  name: string;
  location?: string;
  streamExternalId?: string;
  streamProvider?: string;
  isEnabled?: boolean;
  schedule?: CameraSchedule;
}

export async function createCamera(input: UpsertCameraInput): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const daycareId = getCurrentDaycareId();
  if (!daycareId) {
    return false;
  }

  const { error } = await supabase.from("cameras").insert({
    daycare_id: daycareId,
    name: input.name.trim(),
    location: input.location?.trim() || null,
    stream_external_id: input.streamExternalId?.trim() || null,
    stream_provider: input.streamProvider ?? "demo",
    is_enabled: input.isEnabled ?? false,
    schedule_json: (input.schedule ?? parseCameraSchedule(null)) as Json,
  });

  return !error;
}

export async function updateCamera(cameraId: string, input: UpsertCameraInput): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { error } = await supabase
    .from("cameras")
    .update({
      name: input.name.trim(),
      location: input.location?.trim() || null,
      stream_external_id: input.streamExternalId?.trim() || null,
      stream_provider: input.streamProvider ?? "demo",
      is_enabled: input.isEnabled,
      schedule_json: input.schedule as Json | undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", cameraId);

  return !error;
}

export async function toggleCameraEnabled(cameraId: string, enabled: boolean): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { error } = await supabase
    .from("cameras")
    .update({ is_enabled: enabled, updated_at: new Date().toISOString() })
    .eq("id", cameraId);

  return !error;
}

export async function deleteCamera(cameraId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return true;
  }

  const { error } = await supabase.from("cameras").delete().eq("id", cameraId);
  return !error;
}
