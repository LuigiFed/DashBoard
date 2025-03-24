import { Component, inject } from '@angular/core';
import { getMessaging, getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DashBoard';

  private messaging = inject(Messaging);



  ngOnInit(): void {
    this.setupServiceWorker();
  }

  private setupServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js', { type: 'module' })
        .then((registration) => {
          console.log('Service Worker registrato:', registration);
          this.requestPermission();
        })
        .catch((err) => console.log('Service Worker non registrato:', err));
    }
  }

  requestPermission() {
    console.log('Chiedendo il permesso per le notifiche...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permesso concesso.');
        getToken(this.messaging, {
          vapidKey: environment.firebaseConfig.vapidKey,
        })
          .then((currentToken: string) => {
            if (currentToken) {
              console.log('Token FCM:', currentToken);
            } else {
              console.log('Nessun token trovato.');
            }
          })
          .catch((err) => console.log('Errore nel recupero del token:', err));
      }
    });
  }
}




