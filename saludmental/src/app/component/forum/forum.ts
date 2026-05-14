import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forum.html',
  styleUrl: './forum.css'
})
export class Forum {

  newPost = '';

  posts = [
    {
      username:'Brayan',
      message:'Hoy no fue un buen día, sin embargo todo mejorara cuando coma fresas con crema '
    },
    {
      username:'Luis',
      message:'Recuerda descansar, dicen que es bueno para la salud mental jeje.'
    }
  ];

  publishPost(){

    if(this.newPost.trim() !== ''){

      this.posts.unshift({
        username:'Usuario',
        message:this.newPost
      });

      this.newPost = '';

    }

  }

}