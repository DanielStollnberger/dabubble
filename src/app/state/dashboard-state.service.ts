import { effect, Injectable, signal } from '@angular/core';

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
  messageId = signal<string | null>(null);
  chatView = signal<string | null>('sidenav');

  constructor() {
    effect(() => {
      const chatId = this.chatId();
      const threadId = this.openChatAnswers();
      const channelId = this.channelId();

      if (threadId) {
        this.chatView.set('thread');
      } else if (chatId || channelId) {
        this.chatView.set('chat');
      } else {
        this.chatView.set('sidenav');
      }
    });
  }
}
