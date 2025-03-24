import { inject, Injectable } from '@angular/core';
import { Messaging } from '@angular/fire/messaging';
import { getToken } from 'firebase/messaging';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  private messaging = inject(Messaging);

  constructor() {}

  setupServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./firebase-messaging-sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registrato con successo:', registration);
          this.requestPermission(registration);
        })
        .catch((err) => console.log('Errore nella registrazione del Service Worker:', err));
    } else {
      console.log('Service Worker non supportato nel tuo browser.');
    }
  }

  private requestPermission(registration: ServiceWorkerRegistration): void {
    console.log('Chiedendo il permesso per le notifiche...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permesso per le notifiche concesso!');
        this.getToken(registration);
      } else {
        console.log('Permesso per le notifiche negato.');
      }
    }).catch((err) => {
      console.log('Errore durante la richiesta del permesso per le notifiche:', err);
    });
  }

  private getToken(registration: ServiceWorkerRegistration): void {
    getToken(this.messaging, {
      vapidKey: "BKz_2Bcs44AWUGRKrAtYZTg9dz-XdzDg8iAYYKDun-IIsEIer4T0My0I80_dOuIMblKUkIe-n8KXpqlGMLD7KwU",
      serviceWorkerRegistration: registration
    }).then((currentToken: string) => {
      if (currentToken) {
        console.log('Token FCM ricevuto:', currentToken);
      } else {
        console.log('Nessun token trovato.');
      }
    }).catch((err) => {
      console.log('Errore nel recupero del token FCM:', err);
    });
  }
}
