var Observable = require('FuseJS/Observable');
var us = require("userState");
var routerCalls = require("routerCalls");
var http = require("JS/http.js");
var toast = require("toast");
var colors = require("JS/colors.js");

var userData = us.userData();
var email = Observable(userData.email);

function returnToLogin(){
	us.isLogged(false);
	routerCalls.send({
		type : "go", 
		to: 'login', 
		data : {}
	});
}

function resendEmail(){
	http.functions("checkEmailVerification",{
		email : userData.email,
		password : userData.password
	}, true).then(function(verified){
		if(verified){
			userData.emailVerified = true;
			us.userData(userData);
			toast.show("Seu email já foi verificado!",colors.success);
			setTimeout(function(){
				routerCalls.send({
					type : "go", 
					to: 'home', 
					data : {}
				});
			},2500);
		}else{
			http.functions("resendEmailVerification",{
				email : userData.email,
				password : userData.password
			}, true).then(function(sent){
				if(sent){
					toast.show("Email reenviado com sucesso!",colors.success);
				}else{
					toast.show("Houve um problema no envio do email!\r\nPor favor, tente novamente.");
				}
			}).catch(function(e){
				toast.show();
			});
		}
	}).catch(function(e){
		console.log("2");
		toast.show();
	});
}

function checkEmailVerified(){
	http.functions("checkEmailVerification",{
		email : userData.email,
		password : userData.password
	}, true).then(function(verified){
		if(verified){
			userData.emailVerified = true;
			us.userData(userData);
			toast.show("Seu email já foi verificado!",colors.success);
			setTimeout(function(){
				routerCalls.send({
					type : "go", 
					to: 'home', 
					data : {}
				});
			},2500);
		}else{
			toast.show("Seu email ainda não foi verificado!");
		}
	}).catch(function(e){
		toast.show();
	});
}

module.exports = {
	email : email,
	returnToLogin :  returnToLogin,
	resendEmail :  resendEmail,
	checkEmailVerified : checkEmailVerified
};