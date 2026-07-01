// firebase.js

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Setup reCAPTCHA for phone authentication
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "recaptcha-container",
  {
    size: "normal",
    callback: function () {
      console.log("reCAPTCHA verified");
    }
  }
);

recaptchaVerifier.render();