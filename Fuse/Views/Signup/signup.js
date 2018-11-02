var Observable = require('FuseJS/Observable');
var http = require("JS/http.js");
var md5 = require("JS/md5.js");
var toast = require("toast");
var colors = require("JS/colors.js");
var us = require("userState");
var routerCalls = require("routerCalls");

var email = Observable();
var emailError = Observable(false);
var emailErrorMessage = Observable();

var name = Observable();
var nameError = Observable(false);
var nameErrorMessage = Observable();

var password = Observable();
var passwordError = Observable(false);
var passwordErrorMessage = Observable();

var cPassword = Observable();
var cPasswordError = Observable(false);
var cPasswordErrorMessage = Observable();

var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function createUser(){
	var procced = true;
	
	//reset values
	emailError.value = false;
	nameError.value = false;
	passwordError.value = false;
	cPasswordError.value = false;

	emailErrorMessage.value = "";
	nameErrorMessage.value = "";
	passwordErrorMessage.value = "";
	cPasswordErrorMessage.value = "";

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

	if(name.value == null || name.value == ""){
		nameError.value = true;
		nameErrorMessage.value = "Este campo não pode ficar em branco.";
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

	if(cPassword.value == null || cPassword.value == ""){
		cPasswordError.value = true;
		cPasswordErrorMessage.value = "Este campo não pode ficar em branco.";
		procced = false;
	}else if(password.value != cPassword.value){
		cPasswordError.value = true;
		cPasswordErrorMessage.value = "A confirmação e a senha são diferentes";
		procced = false;
	}

	if(procced){
		http.functions("checkEmailExists",{
			email : email.value
		}, true).then(function(exists){
			if(exists != 'error'){
				if(exists){
					emailError.value = true;
					emailErrorMessage.value = "Este email já está sendo utilizado.";
					return null;
				}else{
					return http.functions("createNewUser",{
						email : email.value,
						password : md5(password.value),
						name : name.value
					}, true);
				}
			}
		}).then(function(newUser){
			if(newUser !== null){
				userData = us.userData();
				userData == null ? userData = {} : null;
				
				userData.uid = newUser;
				userData.email = email.value;
				userData.password = md5(password.value);
				userData.name = name.value;

				us.userData(userData);
				us.isLogged(true);
				toast.show("Sua conta foi criada com sucesso!",colors.success);

				routerCalls.send({
					type : "go", 
					to:"emailVerification", 
					data : {}
				});
			}
		}).catch(function(e){
			toast.show();
		});
	}
}

module.exports = {
	createUser : createUser,
	email : email,
	emailError : emailError,
	emailErrorMessage : emailErrorMessage,
	name : name,
	nameError :nameError,
	nameErrorMessage : nameErrorMessage,
	password : password,
	passwordError : passwordError,
	passwordErrorMessage : passwordErrorMessage,
	cPassword : cPassword,
	cPasswordError : cPasswordError,
	cPasswordErrorMessage : cPasswordErrorMessage
};