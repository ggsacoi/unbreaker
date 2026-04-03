import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDocs, collection, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdxlwg8vgSet4ZX7CD9xzc_gsPif5uJbY",
    authDomain: "thebiggestone-6e5ef.firebaseapp.com",
    projectId: "thebiggestone-6e5ef",
    storageBucket: "thebiggestone-6e5ef.appspot.com",
    messagingSenderId: "942794830712",
    appId: "1:942794830712:web:14b37d79f27c63d543ce8d",
    measurementId: "G-HB7VWE6XD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const currentUser = JSON.parse(localStorage.getItem('ContentUser'));

async function getUsers() {
    const usersData = [];
    // Utilise la bonne collection : 'Users' ou 'people' selon ton besoin
    const docRef = collection(db, "Users"); // Remplace par "people" si besoin
    const docsSnap = await getDocs(docRef);
    docsSnap.forEach((doc) => {
        const userData = doc.data();
        usersData.push(userData); // Ajoute l'id du document et fusionne les propriétés
    });
    return usersData;
}

async function changedata() {
    const users = await getUsers();
    const user = currentUser ? users.find(u => u.userId === currentUser) : undefined;

    if (user) {
        console.log(user);

        // Populate fields with current user data
        const name = document.getElementById('name');
        name.value = user.firstName;
        name.readOnly = true;

        const lastname = document.getElementById('lastname');
        lastname.value = user.lastName;
        lastname.readOnly = true;

        const email = document.getElementById('lemail');
        email.value = user.email;
        email.readOnly = true;

        const number = document.getElementById('number');
        number.value = user.number;
        number.readOnly = true;

        const adresse = document.getElementById('adresse');
        adresse.value = user.adresse;
        adresse.readOnly = true;
    } else {
        console.warn('Aucun utilisateur trouvé pour ce currentUser.uid:', currentUser?.uid);
    }
}

const newnumber = document.getElementById('newnumber');
const newadress = document.getElementById('newadresse');

const submit = document.getElementById('envoi');

submit.addEventListener("click", async () => {
    try {
        const peopleRef = collection(db, "Users");
        const peopleSnap = await getDocs(peopleRef);
        let foundUser = null;
        peopleSnap.forEach((docu) => {
            const person = docu.data();
            if (person.uid === currentUser?.uid) {
                foundUser = { id: docu.id, ...person };
            }
        });
        if (foundUser) {
            let updatedFields = {};
            if (newnumber.value) updatedFields.number = newnumber.value;
            if (newadress.value) updatedFields.adresse = newadress.value;
            if (Object.keys(updatedFields).length > 0) {
                await updateDoc(doc(db, "Users", foundUser.id), updatedFields);
                alert("Champs mis à jour pour : " + foundUser.uid);
            } else {
                alert("Aucune nouvelle valeur renseignée, rien n'a été modifié.");
            }
        } else {
            alert("Aucun utilisateur trouvé dans 'Users' avec cet uid.");
        }
    } catch (error) {
        alert('Erreur lors de la mise à jour : ' + error.message);
        console.error(error);
    }
});

document.addEventListener("DOMContentLoaded", changedata);