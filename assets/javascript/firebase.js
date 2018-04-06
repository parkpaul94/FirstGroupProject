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
     if (user != null) {
         var email_id = user.email;
            //  $('.loginbutton').hide();
             $('.firebase-container').hide();
             $('.logoutbutton').show();
             $('#sdrinktitle').show();
             $('.sDContent').show();
     }
 } else {
     $('.firebase-container').show();
    //  $('.loginbutton').show();
     $('#sdrinktitle').hide();
     $('.sDContent').hide();
     $('.logoutbutton').hide();
 }
 });
$('#password').on('keyup', function (event) {
    if (event.which === 13) {
        event.preventDefault();
        searchText = $('#NSearched').val();
        login();
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
