export interface CameraSchedule {
  timezone?: string;
  days?: number[];
  startTime?: string;
  endTime?: string;
}

const DEFAULT_SCHEDULE: CameraSchedule = {
  timezone: "Asia/Jerusalem",
  days: [0, 1, 2, 3, 4, 5],
  startTime: "08:00",
  endTime: "16:00",
};

export function parseCameraSchedule(raw: unknown): CameraSchedule {
  if (!raw || typeof raw !== "object") {
    return DEFAULT_SCHEDULE;
  }
  const s = raw as CameraSchedule;
  return {
    timezone: s.timezone ?? DEFAULT_SCHEDULE.timezone,
    days: s.days ?? DEFAULT_SCHEDULE.days,
    startTime: s.startTime ?? DEFAULT_SCHEDULE.startTime,
    endTime: s.endTime ?? DEFAULT_SCHEDULE.endTime,
  };
}

export function isCameraWithinSchedule(schedule: CameraSchedule, now = new Date()): boolean {
  const day = now.getDay();
  const days = schedule.days ?? DEFAULT_SCHEDULE.days!;
  if (!days.includes(day)) {
    return false;
  }

  const startTime = schedule.startTime ?? "08:00";
  const endTime = schedule.endTime ?? "16:00";
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  const minutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  return minutes >= startMinutes && minutes <= endMinutes;
}

export function formatScheduleLabel(schedule: CameraSchedule): string {
  const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
  const days = (schedule.days ?? []).map((d) => dayNames[d]).join(", ");
  return `${days} · ${schedule.startTime ?? "08:00"}–${schedule.endTime ?? "16:00"}`;
}
