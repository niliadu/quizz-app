var Observable = require('FuseJS/Observable');
var us = require("userState");
var Storage = require("FuseJS/Storage");

us.on('userDataChange',function(ud){
	var userData = Storage.readSync("userData");
	userData = JSON.parse(userData);
	for(var id in ud){
		userData[id] = ud[id];
	}

	Storage.writeSync("userData", JSON.stringify(userData));
});

us.on('isLoggedChange',function(logged){
	if(!logged){
		userData = {
			uid : null,
			email : null,
			password : null,
			name : null,
			isLogged : false,
			emailVerified : false
		};
		
		Storage.writeSync("userData", JSON.stringify(userData));
	}
});