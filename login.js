// Importer les fonctions nécessaires de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdxlwg8vgSet4ZX7CD9xzc_gsPif5uJbY",
  authDomain: "thebiggestone-6e5ef.firebaseapp.com",
  projectId: "thebiggestone-6e5ef",
  storageBucket: "thebiggestone-6e5ef.appspot.com",
  messagingSenderId: "942794830712",
  appId: "1:942794830712:web:14b37d79f27c63d543ce8d",
  measurementId: "G-HB7VWE6XD9"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Obtenir les instances des services
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);
async function getUsersData() {
const usersData = [];
const docRef = collection(db,"Users");
try {
const docsSnap = await getDocs(docRef);
docsSnap.forEach((doc) => {
    const userData = doc.data();
    usersData.push(userData);
});
} catch (error) {
  console.error("Erreur lors de la récupération des utilisateurs:", error);
}
}
// Écouter l'événement DOMContentLoaded pour s'assurer que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
  // Obtenir le bouton d'envoi
  const sendButton = document.getElementById("envoi");
  const email = document.getElementById("lemail").value;

  if (sendButton) {
    sendButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = document.getElementById("lemail").value;
      const password = document.getElementById("lemotdepasse").value;

      try {
        // Connexion de l'utilisateur
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Utilisateur connecté
        const user = userCredential.user;
        sessionStorage.setItem('ContentUser', JSON.stringify(user));
        window.location.href = 'index.html';
        // Vous pouvez maintenant utiliser l'objet user pour d'autres opérations
      } catch (error) {
        alert('mots de passe incorrect');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Erreur (${errorCode}): ${errorMessage}`);
      }
    });
  } else {
    console.error("Bouton d'envoi introuvable");
  }
  const backtosignin = document.getElementById('creation');
  backtosignin.addEventListener('click', () => {
    window.location.href = 'signin.html';
  });
  const forgot = document.getElementById('oublie');
  forgot.addEventListener('click', function(event){
    event.preventDefault()
    const email = document.getElementById("lemail").value;
    if(!email) {
      alert('entre ton email');
    }
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('message envoyer dans ton boite mail');
    })
  });
});   
