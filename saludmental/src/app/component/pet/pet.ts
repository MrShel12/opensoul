import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [],
  templateUrl: './pet.html',
  styleUrl: './pet.css'
})
export class Pet implements OnDestroy {

  hunger = 70;
  happiness = 60;
  energy = 80;

  message = 'Hola, estoy lista para acompanarte.';
  currentImage = '/pet-idle.png';
  animationClass = 'idle';

  private animationTimeout?: number;
  private frameInterval?: number;

  feedPet(){
    this.hunger = this.increaseStat(this.hunger);
    this.energy = this.decreaseStat(this.energy, 5);
    this.message = 'Gracias por alimentarme.';
    this.setPetState(['/pet-eat1.png', '/pet-eat2.png'], 'is-feeding');
  }

  petPet(){
    this.happiness = this.increaseStat(this.happiness);
    this.message = 'Eso me hace feliz.';
    this.setPetState('/pet-happy.png', 'is-playing');
  }

  sleepPet(){
    this.energy = this.increaseStat(this.energy);
    this.hunger = this.decreaseStat(this.hunger, 5);
    this.message = 'Que buena siesta.';
    this.setPetState(['/pet-sleepy1.png', '/pet-sleepy2.png'], 'is-sleeping');
  }

  ngOnDestroy(){
    this.clearAnimationTimers();
  }

  private setPetState(image: string | string[], animationClass: string){
    const frames = Array.isArray(image) ? image : [image];

    this.clearAnimationTimers();

    this.currentImage = frames[0];
    this.animationClass = animationClass;

    if(frames.length > 1){
      let frameIndex = 0;

      this.frameInterval = window.setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length;
        this.currentImage = frames[frameIndex];
      }, 300);
    }

    this.animationTimeout = window.setTimeout(() => {
      this.currentImage = '/pet-idle.png';
      this.animationClass = 'idle';
      this.clearAnimationTimers();
    }, 1400);
  }

  private clearAnimationTimers(){
    if(this.animationTimeout){
      window.clearTimeout(this.animationTimeout);
      this.animationTimeout = undefined;
    }

    if(this.frameInterval){
      window.clearInterval(this.frameInterval);
      this.frameInterval = undefined;
    }
  }

  private increaseStat(value: number){
    return Math.min(value + 10, 100);
  }

  private decreaseStat(value: number, amount: number){
    return Math.max(value - amount, 0);
  }

}
