import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css'
})
export class AdminPage {

  username = '';

  password = '';

  logged = false;

  reports = [

    {
      user:'Carlos',
      room:'Ansiedad',
      message:'Nadie te quiere',
      danger:'Bullying'
    },

    {
      user:'Ana',
      room:'Soledad',
      message:'Hazte daño',
      danger:'Riesgo'
    }

  ];

  login(){

    if(
      this.username === 'admin'
      &&
      this.password === '1234'
    ){

      this.logged = true;

    }

  }

}