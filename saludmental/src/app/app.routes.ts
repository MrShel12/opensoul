import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PetPage } from './pages/pet-page/pet-page';
import { ChatPage } from './pages/chat-page/chat-page';
import { Forum } from './component/forum/forum';

export const routes: Routes = [

  {
    path:'',
    component: Home
  },
  
  {
    path:'pet',
    component: PetPage
  },

  {
    path:'forum',
    component: Forum
  },

  {
    path:'chat',
    component: ChatPage
  }

]; 
