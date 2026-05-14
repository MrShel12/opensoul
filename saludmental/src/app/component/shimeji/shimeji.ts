import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-shimeji',
  standalone: true,
  imports: [],
  templateUrl: './shimeji.html',
  styleUrl: './shimeji.css'
})
export class Shimeji implements OnInit, OnDestroy {

  visible = true;
  talking = true;
  message = 'Estoy aqui contigo.';
  image = '/pet-idle.png';
  x = 40;
  y = 40;
  facingRight = true;
  walking = true;

  messages = [
    'Respira, lo estas haciendo bien.',
    'No tienes que poder con todo hoy.',
    'Estoy orgullosa de ti.',
    'Toma agua y descansa un poquito.',
    'Tu esfuerzo tambien cuenta.',
    'Un paso pequeño sigue siendo avance.',
    'Recuerda comer fresas con crema, ayudan',
     "no todos deben saber como estas."
  ];

  private messageTimer?: number;
  private walkTimer?: number;
  private animationFrame?: number;
  private lastFrameTime = 0;
  private velocityX = 48;
  private velocityY = 26;
  private readonly shimejiWidth = 110;
  private readonly shimejiHeight = 150;
  private frameIndex = 0;

  ngOnInit(){
    this.resetPosition();
    this.move();

    this.messageTimer = window.setInterval(() => {
      this.sayRandomMessage();
    }, 8000);

    this.walkTimer = window.setInterval(() => {
      const frames = this.walking
        ? ['/pet-run1.png', '/pet-run2.png']
        : ['/pet-idle.png', '/pet-happy.png'];

      this.frameIndex = (this.frameIndex + 1) % frames.length;
      this.image = frames[this.frameIndex];
    }, 650);
  }

  ngOnDestroy(){
    if(this.messageTimer){
      window.clearInterval(this.messageTimer);
    }

    if(this.walkTimer){
      window.clearInterval(this.walkTimer);
    }

    if(this.animationFrame){
      window.cancelAnimationFrame(this.animationFrame);
    }
  }

  sayRandomMessage(){
    const nextMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
    this.message = nextMessage;
    this.talking = true;
    this.walking = false;

    window.setTimeout(() => {
      this.talking = false;
      this.walking = true;
    }, 4500);
  }

  toggle(){
    this.visible = !this.visible;
  }

  private resetPosition(){
    this.x = Math.max(window.innerWidth - 150, 16);
    this.y = Math.max(window.innerHeight - 170, 90);
  }

  private move(){
    this.animationFrame = window.requestAnimationFrame((time) => {
      if(!this.lastFrameTime){
        this.lastFrameTime = time;
      }

      const delta = (time - this.lastFrameTime) / 1000;
      this.lastFrameTime = time;

      if(this.visible && this.walking){
        this.x += this.velocityX * delta;
        this.y += this.velocityY * delta;

        const maxX = Math.max(window.innerWidth - this.shimejiWidth, 16);
        const maxY = Math.max(window.innerHeight - this.shimejiHeight, 90);

        if(this.x <= 16 || this.x >= maxX){
          this.velocityX *= -1;
          this.x = Math.min(Math.max(this.x, 16), maxX);
        }

        if(this.y <= 90 || this.y >= maxY){
          this.velocityY *= -1;
          this.y = Math.min(Math.max(this.y, 90), maxY);
        }

        this.facingRight = this.velocityX > 0;
      }

      this.move();
    });
  }

}
