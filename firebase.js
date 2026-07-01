// firebase.js

const firebaseConfig = {
  apiKey: "AIzaSyCOMfJ1YtbHeszwOSaPDfDO3ppGwliavuU",
  authDomain: "qchat-f07eb.firebaseapp.com",
  projectId: "qchat-f07eb",
  storageBucket: "qchat-f07eb.firebasestorage.app",
  messagingSenderId: "441281898455",
  appId: "1:441281898455:web:c369ac4ff1f6ff8bd08d92"
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
