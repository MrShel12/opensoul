import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAnalytics(() => getAnalytics()),

    provideFirestore(() => getFirestore())

  ]

};
