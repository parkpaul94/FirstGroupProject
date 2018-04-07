var config = {
    apiKey: "AIzaSyBhoExJwz5h53YXCP8x5Fx9cn5bwyTncTM",
    authDomain: "firstgroupproject-acd1a.firebaseapp.com",
    databaseURL: "https://firstgroupproject-acd1a.firebaseio.com",
    projectId: "firstgroupproject-acd1a",
    storageBucket: "firstgroupproject-acd1a.appspot.com",
    messagingSenderId: "497945108400"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
 if (user) {
     var user = firebase.auth().currentUser;
     var email_id = user.email;
     var email_verified = user.emailVerified;
     if (email_verified != false) {
        console.log(email_verified);
        var welcomeuser = $('<div>').text('Welcome: ' + email_id);
        console.log(email_id);
        $('.welcomecontainer').addClass('active');
        $('.welcomefont').html(welcomeuser);
        $('.welcomecontainer').append($('.welcomefont'));
        $('.firebase-container').removeClass('active');
        $('.logoutbutton').addClass('active');
        $('#sdrinktitle').addClass('active');
        $('#drinktitle').addClass('active');
        $('.sDContent').addClass('active');    
             $('.randomDrinks').addClass('active');
     $('.searchDrinks').addClass('active');         
     }
 } else {
     $('.randomDrinks').addClass('active');
     $('.searchDrinks').addClass('active');
     $('.firebase-container').addClass('active');
     $('.welcomecontainer').removeClass('active');
     $('#sdrinktitle').removeClass('active');
     $('.sDContent').removeClass('active');
 }
 });
function create() {
    console.log('create');
    var userEmail = document.getElementById('email').value;
    var userPW = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPW).then( function(user) {
        $('.verifyID').addClass('active');
        $('.loginbutton').addClass('active');
        alert('Created Account! Please verify your account!');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error)
        alert('Error: ' + errorMessage);

      });
}
function verifyID() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        alert('Verification Email Sent! Please refresh after verifying.');
            // Email sent.
        }).catch(function(error) {
            alert('Error: ' + error.message);
            // An error happened.
    });
}
$('#password').on('keyup', function (event) {
    if (event.which === 13) {
        event.preventDefault();
        searchText = $('#email').val();
        searchText = $('#password').val();
        login();
    }
})
$('.logoutbutton').on('click', function (event) {
    var logoff = window.confirm('Do you want to sign off?');
    if (logoff == true) {
        logout();
        $('.welcomecontainer').removeClass('active');
        $('.logoutbutton').removeClass('active');
    }
    else {
        return false;
    }
})
function login () {
    var userEmail = document.getElementById('email').value;
    var userPW = document.getElementById('password').value;

 firebase.auth().signInWithEmailAndPassword(userEmail, userPW).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;

     alert('Error: ' + errorMessage);
     // ...
   });
}

function logout () {
    firebase.auth().signOut().then(function() {
     // Sign-out successful.
   }).catch(function(error) {
     // An error happened.
   });
}
