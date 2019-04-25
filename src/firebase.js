import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // Firebase info here
  apiKey: "AIzaSyBPc67YP8til_UZzg5iuzTgyGmE5SsIC48",
  authDomain: "the-hideout-eb132.firebaseapp.com",
  databaseURL: "https://the-hideout-eb132.firebaseio.com",
  projectId: "the-hideout-eb132",
  storageBucket: "",
  messagingSenderId: "104745427034"
});

const base = Rebase.createClass(firebaseApp.database());

// Named Export
export { firebaseApp };

// Default Export
export default base;