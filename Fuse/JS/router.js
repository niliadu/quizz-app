var Observable = require('FuseJS/Observable');
var routerCalls = require("routerCalls");

routerCalls.setRouter(mainRouter);

function UxGoTo(e){
	mainRouter.goto(e.sender);
}

function UxPush(e){
	mainRouter.push(e.sender);
}

function UxGoBack(){
	mainRouter.goBack();
}


routerCalls.on('call', function(e){

	var call = e[0];
	if(call.type == 'go'){
		switch(call.to){
			case "back":
				UxGoBack();
			break;
			case "test":
				mainRouter.goto('test', call.data);
			break;
			case "result":
				mainRouter.goto('result', call.data);
			break;
			case "home":
				mainRouter.goto('home', call.data);
			break;
			case "emailVerification":
				mainRouter.goto('emailVerification', call.data);
			break;
			case "login":
				mainRouter.goto('login', call.data);
			break;
		}
	}else if(call.type == 'push'){
		switch(call.to){
			case 'result':
				mainRouter.push("result", call.data);
			break;
			case 'history':
				mainRouter.push("history", call.data);
			break;
		}
	}	
});

module.exports = {
	UxGoTo : UxGoTo,
	UxPush : UxPush,
	UxGoBack : UxGoBack
};