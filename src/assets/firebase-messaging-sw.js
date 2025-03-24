importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAveZjeMwKEm7Njtcf6sU0jpzX7U5a-Yz0",
  authDomain: "flights-3afb2.firebaseapp.com",
  projectId: "flights-3afb2",
  storageBucket: "flights-3afb2.firebasestorage.app",
  messagingSenderId: "81663858175",
  appId: "1:81663858175:web:7c0e010166c23da35983ca",
  measurementId: "G-DNVDPWTTXJ",
  vapidKey: "BKz_2Bcs44AWUGRKrAtYZTg9dz-XdzDg8iAYYKDun-IIsEIer4T0My0I80_dOuIMblKUkIe-n8KXpqlGMLD7KwU"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    //icon: '/assets/logo.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
