import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdxlwg8vgSet4ZX7CD9xzc_gsPif5uJbY",
    authDomain: "thebiggestone-6e5ef.firebaseapp.com",
    projectId: "thebiggestone-6e5ef",
    storageBucket: "thebiggestone-6e5ef.appspot.com",
    messagingSenderId: "942794830712",
    appId: "1:942794830712:web:14b37d79f27c63d543ce8d",
    measurementId: "G-HB7VWE6XD9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const button = document.getElementById("logbutton");
button.addEventListener('click', function () {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        window.location.href = 'index.html';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    })
});
