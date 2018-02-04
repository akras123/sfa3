 "use strict";
// Initialize Firebase
let config = {
    apiKey: "AIzaSyAkWUrZWkfDkiqEol6LSQXdnS851tNQttg",
    authDomain: "project-7899973828813008019.firebaseapp.com",
    databaseURL: "https://project-7899973828813008019.firebaseio.com",
    storageBucket: "project-7899973828813008019.appspot.com",
    messagingSenderId: "1067496200873"
};
firebase.initializeApp(config);

let db = firebase.database();
let contactsRef = db.ref('flyaware/contacten');
let afsprakenRef = db.ref('flyaware/afspraken');
let intakesRef = db.ref('flyaware/intakes');
