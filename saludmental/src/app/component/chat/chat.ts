import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {

  username = '';

  currentRoom = '';

  message = '';

  joined = false;

  rooms = [

    'Ansiedad',
    'Estrés escolar',
    'Soledad',
    'Motivación'

  ];

  messages:any[] = [];

  joinRoom(room:string){

    this.currentRoom = room;

    this.joined = true;

  }

  sendMessage(){

    if(this.message.trim() !== ''){

      this.messages.push({

        username:this.username,
        text:this.message,
        room:this.currentRoom

      });

      this.message = '';

    }

  }

}