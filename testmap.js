import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { getDatabase, ref, push,set,onValue  } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js' 

import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js'


import { getAuth } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js'

const map= L.map('map')
map.setView([15.4907,73.8295],11)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.Control.geocoder().addTo(map);


function onMapClick(e)
{
    console.log(e.latlng);
    var latlang =document.querySelector(".lat-long")
    latlang.value = e.latlng.lat + ", " + e.latlng.lng;
}
map.on('click',onMapClick);


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
const database=getDatabase(app);
const urlParams = new URLSearchParams(window.location.search);
const communityName = urlParams.get('communityName');
const CommunityEventDB = ref(database, `CommunityEvent/${communityName}`);

onValue(CommunityEventDB, function(snapshot) {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var coordinates = childData.Coordinates;
        var [lat, lng] = coordinates.split(',');
        var event = childData.Event;
        var marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup('<h1>' + event + '</h1>');
    });
});



