export type UserRole = "teacher" | "parent" | "admin" | "platform_admin";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email?: string;
  phone?: string;
}
