export type UserRole = "teacher" | "parent" | "admin";

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email?: string;
  phone?: string;
}
