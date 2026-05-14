import { Component } from '@angular/core';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [],
  templateUrl: './pet.html',
  styleUrl: './pet.css'
})
export class Pet {

  hunger = 70;
  happiness = 60;
  energy = 80;

  message = 'Hola, estoy lista para acompanarte.';
  currentImage = '/pet-idle.jpeg';
  animationClass = 'idle';

  private animationTimeout?: number;

  feedPet(){
    this.hunger = this.increaseStat(this.hunger);
    this.energy = this.decreaseStat(this.energy, 5);
    this.message = 'Gracias por alimentarme.';
    this.setPetState('/pet-happy.jpeg', 'is-feeding');
  }

  petPet(){
    this.happiness = this.increaseStat(this.happiness);
    this.message = 'Eso me hace feliz.';
    this.setPetState('/pet-playful.jpeg', 'is-playing');
  }

  sleepPet(){
    this.energy = this.increaseStat(this.energy);
    this.hunger = this.decreaseStat(this.hunger, 5);
    this.message = 'Que buena siesta.';
    this.setPetState('/pet-sleepy.jpeg', 'is-sleeping');
  }

  private setPetState(image: string, animationClass: string){
    this.currentImage = image;
    this.animationClass = animationClass;

    if(this.animationTimeout){
      window.clearTimeout(this.animationTimeout);
    }

    this.animationTimeout = window.setTimeout(() => {
      this.currentImage = '/pet-idle.jpeg';
      this.animationClass = 'idle';
    }, 1400);
  }

  private increaseStat(value: number){
    return Math.min(value + 10, 100);
  }

  private decreaseStat(value: number, amount: number){
    return Math.max(value - amount, 0);
  }

}
