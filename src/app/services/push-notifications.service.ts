import { inject, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../../environments/environment';
import { Flight } from '../components/models/flight';
import { Requestor } from './requestor';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  private messaging: any;
  voli : any[] = [];
  cercaVoli: string = '';
  voliFiltrati: any[] = [];

  constructor(private requestor: Requestor) {}

  setupServiceWorker(flight: Flight): Promise<string> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      this.messaging = getMessaging(app);

      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          getToken(this.messaging, { vapidKey: environment.firebaseConfig.vapidKey })
            .then((currentToken: string) => {
              if (currentToken) {
                console.log('Token FCM:', currentToken);
                resolve(currentToken);
              } else {
                reject('Nessun token disponibile');
              }
            })
            .catch((err) => {
              console.error('Errore generazione token:', err);
              reject(err);
            });
        } else {
          reject('Permesso negato');
        }
      });
    });
  }

  private showNotification(title: string, body: string): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }

    requestPermission(flight : Flight) {

      console.log('Requesting permission...');
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          getToken(this.messaging, {
            vapidKey: environment.firebaseConfig.vapidKey,
          })
            .then((currentToken: string) => {
              if (currentToken) {
                console.log('Token FCM:', currentToken);

                this.sendSubscriptionToBackend(flight,currentToken);
              } else {
                console.log('Nessun token disponibile');
              }
            })
            .catch((err) => {
              console.error('Errore generazione token:', err);
            });
        }
      });
    }

    sendSubscriptionToBackend(flight : Flight,token: string) {

      console.log('Flight ricevuto (tipo):', typeof flight);
      console.log('Flight ricevuto (valore):', JSON.stringify(flight, null, 2));

      const token_firebase = token;
      if (!flight) {
          console.error('Flight è undefined o null');
          alert('Errore: Nessun volo selezionato');
          return;
      }


      /*const subscriptionData = {
        action: 'subscribe',
        token_firebase,
        flight,
        enabled: true,
        querybyexample: false,
        class: 'it.swdes.test.models.Flight',

      };

      console.log('Dati inviati al backend:', JSON.stringify(subscriptionData, null, 2));*/
      flight.token = token_firebase;
      this.requestor.sendSync(
        [flight],
        'processSubscription',
        'https://dashboard-fstq.onrender.com/dashboard/home'
        //'http://localhost:8080/flightservlet'
      ).subscribe({
        next: (res: any) => {
          if (res?.result?.acronym !== 'OK') {
            console.error('Errore backend:', res);
            alert(res?.result?.descr || 'Errore durante la sottoscrizione');
        }
          else {
            console.error('Errore backend:', res?.result?.descr);
            alert(res?.result?.descr || 'Errore durante la sottoscrizione');
          }
        },
        error: (err) => {
          console.error('Errore completo:', err);
          console.error('Stato:', err.status);
          console.error('Messaggio:', err.message);
          console.error('Dettagli:', err.error);
          alert('Errore durante la sottoscrizione');
        }
      });
    }}
