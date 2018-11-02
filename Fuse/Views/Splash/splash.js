var Observable = require('FuseJS/Observable');
var Storage = require("FuseJS/Storage");
var us = require("userState");
var routerCalls = require("routerCalls");

//check if user information already exists
//if not exists create and save a new set
var userData = Storage.readSync("userData");
if(userData == "" || userData == null){
	userData = {
		uid : null,
		email : null,
		password : null,
		name : null,
		isLogged : false,
		emailVerified : false
	};
	Storage.writeSync("userData", JSON.stringify(userData));
}else{
	userData = JSON.parse(userData);
} 

us.userData(userData);
us.isLogged(userData.isLogged);

var destination = us.isLogged() && userData.emailVerified ? "home" : (us.isLogged() ? "emailVerification" : "login");

routerCalls.send({
	type : "go", 
	to: destination, 
	data : {}
});


module.exports = {
	cycle : true,
};