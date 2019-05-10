  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBa4tgLd5vJicvFJ_jW7gR2DaoiX6kN9-A",
    authDomain: "icopico-89023.firebaseapp.com",
    databaseURL: "https://icopico-89023.firebaseio.com",
    projectId: "icopico-89023",
    storageBucket: "icopico-89023.appspot.com",
    messagingSenderId: "915607181568",
    appId: "1:915607181568:web:5015da4ac78a8615"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function sign_out_function() {
    location.href = "../index.html";
    firebase.auth().signOut();
  };