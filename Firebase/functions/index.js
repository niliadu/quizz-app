const functions = require('firebase-functions');
const admin =  require('firebase-admin');
const md5 = require('md5');
const firebase = require('firebase');

admin.initializeApp(functions.config().firebase);
firebase.initializeApp(functions.config().firebase);

const db = admin.database().ref();

// Triggers------------------------------------------///
// exports.addUserDB = functions.auth.user().onCreate(event=>{
//     const uid = event.data.uid;
//     const email = event.data.email;

//     const newUser = db.child(`/users/${uid}`);
//     return newUser.set({
//         email : email,
//         emailVerified : false
//     });
// });

exports.deleteUserDB = functions.auth.user().onDelete(event=>{
    const uid = event.data.uid;
    const user = db.child(`/users/${uid}`);
    return user.remove();
});

// https -----------------------------////
const hashAuth = md5('ebianchsimuladosAviacao');
var returnData = {
    ans : null,
    error: false, 
    desc : null
};

exports.checkEmailExists = functions.https.onRequest((req, resp)=>{
    var data = getData(req); 
    var emails = db.child('users').orderByChild('email').equalTo(data.email);
    emails.once('value',snap=>{
        returnData.ans = !(snap.val() == null);
        resp.send(JSON.stringify(returnData));
    }).catch(e=>{
        returnData.error = true;
        returnData.desc = e;
        resp.send(JSON.stringify(returnData));
    });
});

exports.createNewUser = functions.https.onRequest((req, resp)=>{
    var data = getData(req);
    if(hashAuth != data.hash){
        returnData.error = true;
        returnData.desc = {code: "Not Authorized call", message: "access key not provided."};
        resp.send(JSON.stringify(returnData));
        return;
    }
    var email = data.email;
    var password = data.password;
    if(email == "" || email == null){
        returnData.error = true;
        returnData.desc = {code: "createUser/email", message: "email null or blank"};
        resp.send(JSON.stringify(returnData));
        return;
    }else if(password == "" || password == null){
        returnData.error = true;
        returnData.desc = {code: "createUser/password", message: "password null or blank"};
        resp.send(JSON.stringify(returnData));
        return;
    }else{
        
        password = md5(password);
        var newUser;

        firebase.auth().createUserWithEmailAndPassword(email, password).then(nu=>{
            newUser = nu;
            return newUser.sendEmailVerification();

        }).then(function(r){
            return newUser.updateProfile({
              displayName: data.name,
            });
        }).then(function(r){
            const newUserRef = db.child(`/users/${newUser.uid}`);
            return newUserRef.set({
                email : data.email,
                name : data.name,
                emailVerified : false
            });
        }).then(function(r){
            returnData.ans = newUser.uid;
            resp.send(JSON.stringify(returnData));
        }).catch(e => {
            returnData.error = true;
            returnData.desc = e;
            resp.send(JSON.stringify(returnData));
        });
    }
});


exports.checkLogin = functions.https.onRequest((req, resp)=>{
    var data = getData(req);
    if(hashAuth != data.hash){
        returnData.error = true;
        returnData.desc = {code: "Not Authorized call", message: "access key not provided."};
        resp.send(JSON.stringify(returnData));
        return;
    }
    var email = data.email;
    var password = data.password;
    if(email == "" || email == null){
        returnData.error = true;
        returnData.desc = {code: "checkLogin/email", message: "email null or blank"};
        resp.send(JSON.stringify(returnData));
        return;
    }else if(password == "" || password == null){
        returnData.error = true;
        returnData.desc = {code: "checkLogin/password", message: "password null or blank"};
        resp.send(JSON.stringify(returnData));
        return;
    }else{
        password = md5(password);
        
        firebase.auth().signInWithEmailAndPassword(email, password).then(newUser=>{
            var user = firebase.auth().currentUser;
            var userRef = db.child(`/users/${user.uid}`);
            userRef.once("value", function(userData) {
                returnData.ans = userData.val();
                returnData.ans.uid = user.uid;
                resp.send(JSON.stringify(returnData));
            });
        }).catch(e => {
            returnData.error = true;
            returnData.desc = e;
            resp.send(JSON.stringify(returnData));
        });
    }
});

exports.resendEmailVerification = functions.https.onRequest((req, resp)=>{
    var data = getData(req); 
    var email = data.email;
    var password = md5(data.password);

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        var user = firebase.auth().currentUser;
        user.sendEmailVerification();
        return firebase.auth().signOut();    
    }).then(out => {
        returnData.ans = true;
        resp.send(JSON.stringify(returnData));
    }).catch(e => {
        returnData.error = true;
        returnData.desc = e;
        resp.send(JSON.stringify(returnData));
    });
});

exports.checkEmailVerification = functions.https.onRequest((req, resp)=>{
    var data = getData(req); 
    var email = data.email;
    var password = md5(data.password);

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        var user = firebase.auth().currentUser;
        returnData.ans = user.emailVerified;
        return db.child(`/users/${user.uid}/emailVerified`).set(true);
    }).then(function(r){
        resp.send(JSON.stringify(returnData));
    }).catch(e => {
        returnData.error = true;
        returnData.desc = e;
        resp.send(JSON.stringify(returnData));
    });
});

function getData(r){
    return Object.keys(r.query).length > 0 ? r.query : r.body;
}