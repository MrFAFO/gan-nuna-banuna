import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getCurrentDaycareId, getCurrentUser } from "./auth.service";

export interface EventSuggestion {
  id: string;
  title: string;
  body: string;
  suggestionType: string;
  eventDate: string | null;
  requiresRsvp: boolean;
  createdAt: string;
  myResponse: boolean | null;
  attendingCount: number;
  notAttendingCount: number;
}

export async function getEventSuggestions(): Promise<EventSuggestion[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const userId = getCurrentUser().id;
  const sb = supabase;

  const { data, error } = await sb
    .from("event_suggestions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const suggestions = await Promise.all(
    data.map(async (row) => {
      const { data: responses } = await sb
        .from("event_suggestion_responses")
        .select("profile_id, attending")
        .eq("suggestion_id", row.id);

      const list = responses ?? [];
      const mine = list.find((r) => r.profile_id === userId);

      return {
        id: row.id,
        title: row.title,
        body: row.body,
        suggestionType: row.suggestion_type,
        eventDate: row.event_date,
        requiresRsvp: row.requires_rsvp,
        createdAt: row.created_at,
        myResponse: mine ? mine.attending : null,
        attendingCount: list.filter((r) => r.attending).length,
        notAttendingCount: list.filter((r) => !r.attending).length,
      };
    }),
  );

  return suggestions;
}

export async function createEventSuggestion(input: {
  title: string;
  body: string;
  suggestionType?: string;
  eventDate?: string;
  requiresRsvp?: boolean;
  notifyParents?: boolean;
}): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const daycareId = getCurrentDaycareId();
  const userId = getCurrentUser().id;
  if (!daycareId) {
    return false;
  }

  const { data: suggestion, error } = await supabase
    .from("event_suggestions")
    .insert({
      daycare_id: daycareId,
      title: input.title.trim(),
      body: input.body.trim(),
      suggestion_type: input.suggestionType ?? "event",
      event_date: input.eventDate || null,
      requires_rsvp: input.requiresRsvp ?? false,
      created_by: userId,
    })
    .select("id, title, body")
    .single();

  if (error || !suggestion) {
    return false;
  }

  if (input.notifyParents !== false) {
    const { data: parents } = await supabase
      .from("profiles")
      .select("id")
      .eq("daycare_id", daycareId)
      .eq("role", "parent");

    if (parents?.length) {
      await supabase.from("notifications").insert(
        parents.map((p) => ({
          daycare_id: daycareId,
          recipient_id: p.id,
          type: "event_suggestion",
          title: input.title.trim(),
          body: input.body.trim(),
        })),
      );
    }
  }

  return true;
}

export async function respondToEventSuggestion(
  suggestionId: string,
  attending: boolean,
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const userId = getCurrentUser().id;
  if (!userId) {
    return false;
  }

  const { error } = await supabase.from("event_suggestion_responses").upsert(
    {
      suggestion_id: suggestionId,
      profile_id: userId,
      attending,
      responded_at: new Date().toISOString(),
    },
    { onConflict: "suggestion_id,profile_id" },
  );

  return !error;
}

export async function deleteEventSuggestion(suggestionId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return true;
  }

  const { error } = await supabase.from("event_suggestions").delete().eq("id", suggestionId);
  return !error;
}

export const SUGGESTION_TYPES = [
  { id: "event", label: "אירוע מיוחד" },
  { id: "costume", label: "יום תחפושות" },
  { id: "contribution", label: "בקשת תרומה/חומר" },
  { id: "photo_day", label: "יום צילום" },
] as const;
