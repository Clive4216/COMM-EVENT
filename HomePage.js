import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyC3fErJkfj1XMyyz8Ir9fnvWrf9diAnIJU",
  authDomain: "comevent-467db.firebaseapp.com",
  databaseURL: "https://comevent-467db-default-rtdb.firebaseio.com",
  projectId: "comevent-467db",
  storageBucket: "comevent-467db.appspot.com",
  messagingSenderId: "246720279605",
  appId: "1:246720279605:web:e126de8f520c86c9f4ed7c",
  measurementId: "G-RYGDLEEKVV"
  };


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);

const signoutBtn = document.querySelector('#signoutbtn');


signoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('User signed out successfully');
      location.href = "startUp.html";
    })
    .catch((error) => {
      alert('Error signing out: ', error);
    });
});


const usernameElement = document.getElementById('username');


onAuthStateChanged(auth, function(user) {
  if (user) {
  
    console.log('User signed in:', user.uid);
    const uid = user.uid;
  
    getDoc(doc(firestore, "users", uid)).then((doc) => {
      if (doc.exists()) {
        
        usernameElement.textContent = doc.data().username;
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  } else {
    
    console.log("No user signed in.");
  }
});



document.getElementById('ViewComm').addEventListener('click', function() {
  console.log("view comm");
  window.location.href = 'joinedComm.html';
});

document.getElementById('JoinComm').addEventListener('click', function() {
  console.log("Join comm");
  window.location.href = 'viewComm.html';
});

document.getElementById('CreateComm').addEventListener('click', function() {
  console.log("Create comm");
  const username = usernameElement.textContent; 
  console.log("Create comm with username:", username);
  window.location.href = `CreateComm.html?username=${encodeURIComponent(username)}`;
});
