import { inject, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  private messaging: any;//inject(Messaging);

  constructor() {}

  setupServiceWorker(): void {
    /*if ('serviceWorker' in navigator) {

      navigator.serviceWorker
        .register('/firebase-messaging-sw.js', {
          scope: '/'
        })
        .then((registration) => {
          console.log('Dettagli registrazione:', {
            scope: registration.scope,
            scriptURL: registration.active?.scriptURL
          });
          this.requestPermission(registration);
        })
        .catch((err) => {
          console.error('Errore di registrazione:', {
            name: err.name,
            message: err.message,
            stack: err.stack
          });
        });
    }*/

        const app = initializeApp(environment.firebaseConfig);
        this.messaging = getMessaging(app);
        this.requestPermission();

        onMessage(this.messaging, (payload) => {
          alert(JSON.stringify(payload));
          // ...
        });
  }
 /* private requestPermission(registration: ServiceWorkerRegistration): void {
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
  }*/

    requestPermission() {
      console.log('Requesting permission...');
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          getToken(this.messaging, {
            vapidKey: environment.firebaseConfig.vapiKey,
          })
            .then((currentToken: string) => {
              if (currentToken) {
                console.log(currentToken);
              } else {
                console.log(
                  'No registration token available. Request permission to generate one.'
                );
              }
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
      });
    }
}
