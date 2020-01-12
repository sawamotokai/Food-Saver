import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAnyrQI1VlCRAUWF8Jy3MT8JdFEZGJF95M",
  authDomain: "nwhacks-e8841.firebaseapp.com",
  databaseURL: "https://nwhacks-e8841.firebaseio.com",
  projectId: "nwhacks-e8841",
  storageBucket: "nwhacks-e8841.appspot.com",
  messagingSenderId: "130353463524",
  appId: "1:130353463524:web:86db7a2c91d49851cc2cf1",
  measurementId: "G-HFSCYR506G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;