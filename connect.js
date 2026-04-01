import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const button = document.getElementById("logbutton");
button.addEventListener('click', function () {
    signInWithPopup(auth, provider)
    .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        
        // Extraire le prénom et le nom du displayName
        const fullName = user.displayName || "";
        const nameParts = fullName.trim().split(/\s+/);
        const firstName = nameParts[0] || "User";
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
        
        // Sauvegarder l'utilisateur dans Firestore
        const userRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            await setDoc(userRef, {
                userId: user.uid,
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                photoURL: user.photoURL,
                createdAt: new Date(),
            });
            sessionStorage.setItem('ContentUser', JSON.stringify(user.uid));
        }
        
        window.location.href = 'index.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
});