import { Component } from '@angular/core';
import { Pet } from '../../component/pet/pet';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [Pet],
  templateUrl: './pet-page.html',
  styleUrl: './pet-page.css'
})
export class PetPage {

}
