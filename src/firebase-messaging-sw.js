importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAveZjeMwKEm7Njtcf6sU0jpzX7U5a-Yz0",
  authDomain: "flights-3afb2.firebaseapp.com",
  databaseURL: "https://flights-3afb2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flights-3afb2",
  storageBucket: "flights-3afb2.firebasestorage.app",
  messagingSenderId: "81663858175",
  appId: "1:81663858175:web:7c0e010166c23da35983ca",
  measurementId: "G-DNVDPWTTXJ"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const flightId = payload.data?.flightId || '';
  console.log('Flight ID from payload:', flightId);
  const actions = [
    { action: 'view', title: 'Dettaglio volo' },
    { action: 'close', title: 'Chiudi' }
  ];

  const notificationTitle = 'Notifica volo';
  const notificationOptions = {
    body: payload.data?.body || 'Aggiornamento volo disponibile',
    icon: '/assets/icons/icon-72x72.png',
    data: { flightId: flightId },
    requireInteraction: true,
    actions: actions
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click ', event);

  event.notification.close();

  const flightId = event.notification.data.flightId;
  let url = `/dashboard/flightsDetails?id=${flightId}`;


  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {

    event.waitUntil(
      self.clients.matchAll({type: 'window'}).then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];

          if (client.url.includes('/dashboard') && 'focus' in client) {
            return client.focus();
          }
        }


        return self.clients.openWindow(url);
      })
    );
  } else {

    if (event.action === 'view' && flightId) {
      event.waitUntil(
        clients.openWindow(url).catch(() => {
          self.clients.matchAll().then((clients) => {
            if (clients && clients.length) {
              clients[0].navigate(url);
            } else {
              window.open(url, '_blank');
            }
          });
        })
      );
    } else if (event.action === 'close') {
      console.log('Notifica chiusa dall\'utente.');
    } else {
      event.waitUntil(clients.openWindow(url));
    }
  }
});

