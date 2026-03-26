import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  userId = signal<string | null>(null);
  channelId = signal<string | null>(null);
  chatId = signal<string | null>(null);
  threadId = signal<string | null>(null);
  chatType = signal<string | null>(null);
  openChatAnswers = signal<boolean>(false);
  editChannel = signal<boolean>(false);
}
