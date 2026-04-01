export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string; // ISO-Date String
  isGuest?: boolean;
}