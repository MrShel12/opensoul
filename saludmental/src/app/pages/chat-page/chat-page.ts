import { Component } from '@angular/core';

import { Chat } from '../../component/chat/chat';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [Chat],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css'
})
export class ChatPage {

}
