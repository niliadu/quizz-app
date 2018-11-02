var Observable = require('FuseJS/Observable');
var confirm = require("confirmPopup");
var myEmitter = require("myEmitter");

var opened = Observable(false);
var title = Observable("");
var description = Observable("");
var confirmText =  Observable("");
var confirmCall = "";
var cancelText =  Observable("");

confirm.on("showConfirm", function(data){
	data = data[0];
	title.value = data.title;
	description.value = data.description;
	confirmText.value = data.confirmText;
	confirmCall = data.confirmCall;
	confirmArgs = data.confirmArgs;
	cancelText.value = data.cancelText;
	cancelCall = data.cancelCall;
	cancelArgs = data.cancelArgs;
	opened.value = true;
});

function close(e){
	opened.value = false;
}

function confirmation(){
	switch(confirmCall){
		default:
			myEmitter.call(confirmCall, confirmArgs);
			break;
	}
}

function cancellation(){
	switch(cancelCall){
		default:
			myEmitter.call(cancelCall,cancelArgs);
		break;
	}
}

module.exports = {
	close : close,
	opened : opened,
	title : title,
	description : description,
	confirmText : confirmText,
	confirmation : confirmation,
	cancelText : cancelText,
	cancellation : cancellation
};