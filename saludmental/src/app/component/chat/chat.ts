import { Component, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  orderBy,
  query,
  serverTimestamp
} from '@angular/fire/firestore';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements OnDestroy {

  private messagesSubscription?: Subscription;
  private roomStatusSubscription?: Subscription;
  private banSubscription?: Subscription;

  username = '';

  currentRoom = '';

  message = '';

  joined = false;

  userBanned = false;

  roomStopped = false;

  blockedMessage = '';

  rooms = [

    'Ansiedad',
    'Estrés escolar',
    'Soledad',
    'Motivación'

  ];

  messages:any[] = [];

  constructor(private firestore: Firestore){}

  private dangerousWords = [

    'idiota',
    'tonto',
    'estupido',
    'estupida',
    'odio',
    'muerete',
    'matate',
    'suicidate',
    'hazte dano',
    'hazte daño',
    'nadie te quiere',
    'no vales',
    'lastimate',
    'lastimarte'

  ];

  joinRoom(room:string){

    this.currentRoom = room;

    this.joined = true;

    this.listenToRoomMessages();

    this.listenToModerationStatus();

  }

  async sendMessage(){

    if(this.userBanned || this.roomStopped){
      console.warn('Mensaje bloqueado por moderacion.', {
        userBanned:this.userBanned,
        roomStopped:this.roomStopped
      });
      return;
    }

    if(this.message.trim() !== ''){

      const username = this.username.trim() || 'Usuario anonimo';
      const text = this.message.trim();
      const danger = this.detectDanger(text);

      console.log('enviando...');
      console.log('currentRoom:', this.currentRoom);
      console.log('mensaje:', text);

      try{
        await addDoc(
          collection(this.firestore, `chatRooms/${this.currentRoom}/messages`),
          {

            username,
            text,
            room:this.currentRoom,
            flagged:danger !== '',
            createdAt:serverTimestamp()

          }
        );

        if(danger !== ''){

          await addDoc(
            collection(this.firestore, 'moderationReports'),
            {

              user:username,
              room:this.currentRoom,
              message:text,
              danger,
              status:'pending',
              createdAt:serverTimestamp()

            }
          );

        }

        this.message = '';
      }
      catch(error){
        console.error('Error enviando mensaje a Firestore:', error);
      }

    }

  }

  ngOnDestroy(){
    this.messagesSubscription?.unsubscribe();
    this.roomStatusSubscription?.unsubscribe();
    this.banSubscription?.unsubscribe();
  }

  private listenToRoomMessages(){
    this.messagesSubscription?.unsubscribe();

    const messagesQuery = query(
      collection(this.firestore, `chatRooms/${this.currentRoom}/messages`),
      orderBy('createdAt', 'asc')
    );

    this.messagesSubscription = collectionData(messagesQuery, { idField:'id' })
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  private detectDanger(text:string){
    const normalizedText = text.toLowerCase();

    const detectedWord = this.dangerousWords.find((word) => {
      return normalizedText.includes(word);
    });

    return detectedWord ? 'Mensaje de riesgo: ' + detectedWord : '';
  }

  private listenToModerationStatus(){
    this.roomStatusSubscription?.unsubscribe();
    this.banSubscription?.unsubscribe();

    const username = this.username.trim() || 'Usuario anonimo';

    this.roomStatusSubscription = docData(doc(this.firestore, `stoppedRooms/${this.currentRoom}`))
      .subscribe((room:any) => {
        this.roomStopped = room?.stopped === true;
        this.updateBlockedMessage();
      });

    this.banSubscription = docData(doc(this.firestore, `bannedUsers/${encodeURIComponent(username)}`))
      .subscribe((user:any) => {
        this.userBanned = user?.banned === true;
        this.updateBlockedMessage();
      });
  }

  private updateBlockedMessage(){
    if(this.userBanned){
      this.blockedMessage = 'Tu usuario fue bloqueado por un administrador.';
      return;
    }

    if(this.roomStopped){
      this.blockedMessage = 'Esta sala fue detenida por un administrador.';
      return;
    }

    this.blockedMessage = '';
  }

}
