"use strict";
var config = {
    apiKey: "AIzaSyAkWUrZWkfDkiqEol6LSQXdnS851tNQttg",
    authDomain: "project-7899973828813008019.firebaseapp.com",
    databaseURL: "https://project-7899973828813008019.firebaseio.com",
    storageBucket: "project-7899973828813008019.appspot.com",
    messagingSenderId: "1067496200873"
};
firebase.initializeApp(config);
var db = firebase.database();
var contactsRef = db.ref('flyaware/contacten');
var afsprakenRef = db.ref('flyaware/afspraken');
var intakesRef = db.ref('flyaware/intakes');
