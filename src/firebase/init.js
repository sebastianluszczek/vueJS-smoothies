import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAmxHO98z1ucBwgnfUjoDvTUhgx3VU5ENA",
  authDomain: "vuejs-smoothies-d20e5.firebaseapp.com",
  databaseURL: "https://vuejs-smoothies-d20e5.firebaseio.com",
  projectId: "vuejs-smoothies-d20e5",
  storageBucket: "vuejs-smoothies-d20e5.appspot.com",
  messagingSenderId: "240427295484"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({
  timestampsInSnapshots: true
});

// export firestore database
export default firebaseApp.firestore()
