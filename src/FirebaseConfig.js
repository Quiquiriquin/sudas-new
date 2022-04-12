/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
import * as firebase from 'firebase/app';
import {
  getMessaging,
  isSupported,
  getToken,
} from 'firebase/messaging';
import {
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  projectId,
  storageBucket,
  vapId,
} from './Variables/Variables';

firebase.initializeApp({
  apiKey,
  appId,
  authDomain,
  messagingSenderId,
  projectId,
  storageBucket,
});
console.log(firebase);

let messaging = null;
let getTokenFunction = null;
let messagingListener = null;

if (isSupported()) {
  messaging = getMessaging();
  getTokenFunction = (setTokenFound) => {
    if (isSupported()) {
      return getToken(messaging, { vapidKey: vapId })
        .then((currentToken) => {
          if (currentToken) {
            // console.log('current token for client: ', currentToken);
            setTokenFound(currentToken);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
            localStorage.setItem('teament_fcm_token', currentToken);
          } else {
            console.log(
              'No registration token available. Request permission to generate one.'
            );
            setTokenFound(false);
            // shows on the UI that permission is required
          }
        })
        .catch((err) => {
          console.log(
            'An error occurred while retrieving token. ',
            err
          );
          // catch error while creating client token
        });
    }
  };

  messagingListener = () =>
    new Promise((resolve) => {
      if (isSupported()) {
        messaging.onMessage((payload) => {
          resolve(payload);
        });
      }
    });
} else {
  messagingListener = () =>
    new Promise((resolve) => resolve('Browser not supported'));
  getTokenFunction = () =>
    new Promise((reject) => reject('Browser not supported'));
}

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: '/firebase-logo.png'
//   };
//   // eslint-disable-next-line no-restricted-globals
//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
//
// // eslint-disable-next-line no-restricted-globals
// self.addEventListener('notificationclick', event => {
//   console.log(event)
//   return event;
// });

// export const getToken = (setTokenFound) => {
//   if (firebaseMessaging.isSupported()) {
//     return messaging.getToken().then((currentToken) => {
//       if (currentToken) {
//         console.log('current token for client: ', currentToken);
//         setTokenFound(true);
//         // Track the token -> client mapping, by sending to backend server
//         // show on the UI that permission is secured
//         localStorage.setItem('teament_fcm_token', currentToken);
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//         setTokenFound(false);
//         // shows on the UI that permission is required
//       }
//     }).catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//       // catch error while creating client token
//     });
//   }
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     if (firebaseMessaging.isSupported()) {
//       messaging.onMessage((payload) => {
//         resolve(payload);
//       });
//     }
//   });

// if (firebaseMessaging.isSupported()){
//     // messaging.requestPermission()
//     //   .then((data) => {
//     //       console.log('Have Permission');
//     //       return messaging.getToken();
//     //   })
//     //   .then((token) => {
//     //       console.log(token);
//     //       localStorage.setItem('messageToken_Teament', token);
//     //   })
//     //   .catch((err) => {
//     //       console.log('Not permission', err);
//     //       localStorage.setItem('messageToken_Teament', false);
//     //   });
//
//     messaging.onMessage((payload) => {
//         console.log('payload', payload);
//     })
// }

export const getTokenMethod = getTokenFunction;
export const onMessageListener = messagingListener;
