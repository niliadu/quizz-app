var Observable = require('FuseJS/Observable');
var md5 =  require("JS/md5.js");
var http = require("JS/http.js");
var toast = require("toast");
var us = require("userState");
var routerCalls = require("routerCalls");

var email = Observable("");
var emailError = Observable();
var emailErrorMessage = Observable();
var password = Observable("");
var passwordError = Observable();
var passwordErrorMessage = Observable();

var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function checkLogin(){
	var procced = true;
	
	//reset values
	emailError.value = false;
	passwordError.value = false;

	emailErrorMessage.value = "";
	passwordErrorMessage.value = "";

	//check if blank fields
	if(email.value == null || email.value == ""){
		emailError.value = true;
		emailErrorMessage.value = "Este campo não pode ficar em branco.";
		procced = false;

	}else if(!emailRegex.test(email.value)){
		//check if email is in the correct format
		emailError.value = true;
		emailErrorMessage.value = "Formato de email inválido";
		procced = false;
	}


	if(password.value == null || password.value == ""){
		passwordError.value = true;
		passwordErrorMessage.value = "Este campo não pode ficar em branco.";
		procced = false;
	}else if(password.value.length < 6){
		//check if password has 6 digits
		passwordError.value = true;
		passwordErrorMessage.value = "A senha deve ter no mínimo 6 caracteres";
		procced = false;
	}

	if(procced){
		http.functions("checkLogin",{
			email : email.value,
			password : md5(password.value)
		}, true).then(function(user){
			var userData = us.userData();
			userData == null ? userData = {} : null;

			userData.uid = user.uid;
			userData.email = user.email;
			userData.password = md5(password.value);
			userData.name = user.name;
			userData.emailVerified =  user.emailVerified;
			userData.isLogged = true;
			
			us.userData(userData);
			us.isLogged(true);

			var destination = user.emailVerified ? "home" : "emailVerification";
			routerCalls.send({
				type : "go", 
				to: destination,
				data : {}
			});
		}).catch(function(e){
			var msg = e.message;
			if(
				msg.indexOf("auth/user-not-found") !== -1
				|| msg.indexOf("auth/wrong-password") !== -1
			){
				toast.show("Email ou senha incorretos!");
			}else{
				toast.show();
			}
		});
	}

}

module.exports = {

	checkLogin : checkLogin,
	email : email,
	emailError : emailError,
	emailErrorMessage : emailErrorMessage,
	password : password,
	passwordError : passwordError,
	passwordErrorMessage : passwordErrorMessage
};