// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtilPNsPUT_qhacgwJYs0aBpF06i7qP8A",
  authDomain: "t-diagram-379315.firebaseapp.com",
  projectId: "t-diagram-379315",
  storageBucket: "t-diagram-379315.appspot.com",
  messagingSenderId: "459354056092",
  appId: "1:459354056092:web:10e54bd13a6d59ed639459",
  measurementId: "G-HQGBZ67VJV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// ====================User Data Start========================
const signupEmail = document.getElementById("signup_email");
const signupPassword = document.getElementById("signup_password");
const signupAccount = document.getElementById("signupAccount");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

signupAccount.addEventListener("click", createUserAccount);

function createUserAccount() {
  createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User successfully signup.");
      document.getElementById("signup").style.display = "none";
      document.getElementById("signin").className = "d-flex flex-column animationttb";
    })
    .catch((error) => {
        signinPassword.value = "";
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
}

const signinEmail = document.getElementById("signin_email");
const signinPassword = document.getElementById("signin_password");
const signinAccount = document.getElementById("signinAccount");

signinAccount.addEventListener("click", loginUserAccount);

function loginUserAccount() {
  signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User successfully logged in')
      document.getElementById("welcome").style.display = "flex";
      document.getElementById("container").style.display = "none";
      document.getElementById('getEmail').innerText = user.email;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
      alert(errorMessage);
    });
}

//=================Signout Account=====================
const logoutAccount = document.getElementById("logout");

logoutAccount.addEventListener("click", logoutFunction);

function logoutFunction() {
  signOut(auth)
    .then(() => {
      console.log("user logout");
      document.getElementById("welcome").style.display = "none";
      document.getElementById("container").style.display = "flex";
      document.getElementById("signup").style.display = "block";
      document.getElementById("signin").style.display = "none";
    })
    .catch((error) => {
      // An error happened.
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const signupScreen = document.getElementById("signup");
  const signinScreen = document.getElementById("signin");

  document.getElementById("showSignin").addEventListener("click", function () {
    signupScreen.style.display = "none";
    signinScreen.style.display = "flex";
    signinScreen.className = "flex-column animationttb";
  });

  document.getElementById("showSignup").addEventListener("click", function () {
    signinScreen.style.display = "none";
    signupScreen.style.display = "flex";
    signupScreen.className = "signup flex-column animationttb";
  });
});
