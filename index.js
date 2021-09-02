// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import {} from 'firebase/firestore';

initializeApp(firebaseConfig);
auth = getAuth();

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

let rsvpListener = null;
let guestbookListener = null;

let db, auth;

async function main() {
  // Add Firebase project configuration object here
  const firebaseConfig = {};

  // initializeApp(firebaseConfig);

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };

  const ui = new firebaseui.auth.AuthUI(auth);
}
main();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDj4RNohGUdcRR1slvgZdUVNbKJ2odJkNc',
  authDomain: 'fir-web-codelab-398dd.firebaseapp.com',
  projectId: 'fir-web-codelab-398dd',
  storageBucket: 'fir-web-codelab-398dd.appspot.com',
  messagingSenderId: '390940575886',
  appId: '1:390940575886:web:5fc4e675e08423b59a21df'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
