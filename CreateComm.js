import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "comevent-467db.firebaseapp.com",
    databaseURL: "https://comevent-467db-default-rtdb.firebaseio.com",
    projectId: "comevent-467db",
    storageBucket: "comevent-467db.appspot.com",
    messagingSenderId: "246720279605",
    appId: "1:246720279605:web:e126de8f520c86c9f4ed7c",
    measurementId: "G-RYGDLEEKVV"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log("Firebase initialized successfully");

document.getElementById('community-form').addEventListener('submit', submitForm);

function submitForm(event) {
    console.log("Form submitted");
    event.preventDefault(); 
    const communityName = document.getElementById('community-name').value;

    console.log("Form values:", {
        communityName
    });

    const communityData = {
        name: communityName,
    };

    const communitiesRef = ref(database, `Community`);
    push(communitiesRef, communityData)
        .then(() => {
            console.log('Community created successfully!');
            alert('Community created successfully!');
            document.getElementById('community-form').reset();
        })
        .catch((error) => {
            console.error('Error writing new community to Firebase Database', error);
        });
}
