$('.verifyID').hide();
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
        // var displayname = window.prompt('Please Enter Your Name');
        console.log(email_verified);
        // var welcomeuser = $('<div>').text('Welcome: ' + displayname + email_id);
        var welcomeuser = $('<div>').text('Welcome: ' + email_id);
        console.log(email_id);
        $('.welcomecontainer').show();
        $('.welcomefont').html(welcomeuser);
        $('.welcomecontainer').append($('.welcomefont'));
        // var logout_button = $('<button>').text('Log Out').addClass('logoutbutton');
        // $('.welcomecontainer').append(logout_button);
            //  $('.loginbutton').hide();
             $('.firebase-container').hide();
             $('.logoutbutton').show();
             $('#sdrinktitle').show();
             $('#drinktitle').show();
             $('.sDContent').show();             
     }
 } else {
     $('.firebase-container').show();
     $('.welcomecontainer').hide();
    //  $('.loginbutton').show();
    // $('#drinktitle').hide();
     $('#sdrinktitle').hide();
     $('.sDContent').hide();
    //  $('.logoutbutton').hide();
 }
 });
function create() {
    console.log('create');
    var userEmail = document.getElementById('email').value;
    var userPW = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPW).then( function(user) {
        $('.verifyID').show();
        $('.loginbutton').hide();
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
        $('.welcomecontainer').hide();
        $('.logoutbutton').hide();
    }
    else {
        return false;
    }
})
function login () {
    var userEmail = document.getElementById('email').value;
    var userPW = document.getElementById('password').value;
 // $('.loginbutton').hide();
 // $('.main-container').hide();
 // $('#sdrinktitle').show();
 // $('.sdcontent').show();
 // $('.logoutbutton').show();
 // alert(userEmail + userPW);

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
     // $('#sdrinktitle').hide();
    //  $('.sDContent').hide();
    //  $('.main-container').show();
   }).catch(function(error) {
     // An error happened.
   });
}
