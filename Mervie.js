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

async function getUsers() {
    const usersData = [];
    const docRef = collection(db, "Users");
    const docsSnap = await getDocs(docRef);
    docsSnap.forEach((doc) => {
        const userData = doc.data();
        usersData.push(userData);
    });
    return usersData;
}

const currentUser = JSON.parse(sessionStorage.getItem('ContentUser'));

async function updateUser(uid, updatedData) {
    // Use `doc()` to target the specific document by uid
    const userDocRef = doc(db, "Users", uid);
    await updateDoc(userDocRef, updatedData);
    console.log("User data updated successfully");
}

async function changedata() {
    const users = await getUsers();
    const user = users.find(user => user.uid === currentUser?.uid);

    if (user) {
        console.log(user);

        // Populate fields with current user data
        const name = document.getElementById('name');
        name.value = user.firstname;
        name.readOnly = true;

        const lastname = document.getElementById('lastname');
        lastname.value = user.lastname;
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

        // Update on button click
        const submit = document.getElementById('envoi');
        submit.addEventListener("click", async () => {
            const newemail = document.getElementById('newmail').value;
            const newnumber = document.getElementById('newnumber').value;
            const newadresse = document.getElementById('newadresse').value;

            const updatedData = {
                adresse: newadresse,
                email: newemail,
                number: newnumber
            };

            await updateUser(user.uid, updatedData); // Call the update function
            alert('Le changement a été fait');
        });
    }
}

document.addEventListener("DOMContentLoaded", changedata);
