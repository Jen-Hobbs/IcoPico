firebase.auth().onAuthStateChanged(function (user) {
    database.ref("userList/" + user.uid).update({
        "name": user.displayName,
        "email": user.email
    });
    sessionStorage.setItem("uid", user.uid);
    sessionStorage.setItem("name", user.displayName);
})

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            return true;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'icopico.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'icopico.html',
    // Privacy policy url.
    privacyPolicyUrl: 'icopico.html'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);