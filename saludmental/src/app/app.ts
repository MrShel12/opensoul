import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './component/navbar/navbar';
import { Shimeji } from './component/shimeji/shimeji';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Shimeji],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
