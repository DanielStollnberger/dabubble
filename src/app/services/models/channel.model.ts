export interface Channel {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string; // optional später Date
  members: string[];
}