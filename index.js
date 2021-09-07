// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, addDoc, collection } from 'firebase/firestore';

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

  // Make sure Firebase is initilized
  try {
    if (firebaseConfig && firebaseConfig.apiKey) {
      initializeApp(firebaseConfig);
    }
    auth = getAuth();
    db = getFirestore();
  } catch (e) {
    console.log('error:', e);
    document.getElementById('app').innerHTML =
      '<h1>Welcome to the Codelab! Add your Firebase config object to <pre>/index.js</pre> and refresh to get started</h1>';
    throw new Error(
      'Welcome to the Codelab! Add your Firebase config object from the Firebase Console to `/index.js` and refresh to get started'
    );
  }

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

  // Initialize the FirebaseUI widget using Firebase
  const ui = new firebaseui.auth.AuthUI(getAuth());

  // Listen to RSVP button clicks
  startRsvpButton.addEventListener('click', () => {
    if (auth.currentUser) {
      // User is signed in; allows user to sign out
      signOut(auth);
    } else {
      // No user is signed in; allows user to sign in
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });

  // Listen to the current Auth state
  onAuthStateChanged(auth, user => {
    if (user) {
      startRsvpButton.textContent = 'LOGOUT';
    } else {
      // rsvpListener
      startRsvpButton.textContent = 'RSVP';
      // Hide guestbook for non-logged-in users
      guestbookContainer.style.display = 'none';
    }
  });

  // Listen to the form submission
  form.addEventListener('submit', async e => {
    // Prevent the default form redirect
    e.preventDefault();
    // Write a new message to the database collection "guestbook"
    addDoc(collection(db, 'guestbook'), {
      text: input.value,
      timestamp: Date.now(),
      name: auth.currentUser.displayName,
      userId: auth.currentUser.uid
    });
    // clear messages input field
    input.value = '';
    // Return false to avoid redirect
    return false;
  });
}
main();
