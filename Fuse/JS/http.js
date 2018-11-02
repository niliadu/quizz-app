var sysVars = require("JS/systemVars");
var myEmitter = require("myEmitter");

function functions(url,postData, loader = false){
	loader ? myEmitter.call("showLoader") : null;
	postData.hash = sysVars.hashAuth;
	const r = fetch(
		sysVars.baseUrl + url,
		{
			method: 'POST',
			headers: { "Content-type": "application/json"},
			body: JSON.stringify(postData)
		}).then(function(response) {
		if(response.ok){
			try{
				JSON.parse(response['_bodyInit']);
				return response.json();  
			}catch(e){
				loader ? myEmitter.call("hideLoader") : null;
				console.log("httpJSON Error=> Problema com o servidor conteudo retornado => "+response['_bodyInit']);
				throw new Error("Problema com o servidor conteudo retornado => "+response['_bodyInit']);
			}
		}
		loader ? myEmitter.call("hideLoader") : null;
		console.log("httpJSON Error=> Problema com a conexao ao servidor. ERRO => " + response.status +" - "+response.statusText);
		throw new Error("Problema com a conexao ao servidor. ERRO => " + response.status +" - "+response.statusText);
	},function(error){
		loader ? myEmitter.call("hideLoader") : null;
		console.log("httpJSON Error=> Problema com a conexao ao servidor. ERRO => " + error.message);
		throw new Error("Problema com a conexao ao servidor. ERRO => " + error.message);
	}).then(function(responseObject) {

		if(responseObject.error){
			loader ? myEmitter.call("hideLoader") : null;
			console.log("httpJSON Error=> "+responseObject.desc.code+"\r\n-- "+responseObject.desc.message);
			throw new Error("Erro encontrado no servidor. Erro => "+responseObject.desc.code+"\r\n-- "+responseObject.desc.message);
		}else{
			loader ? myEmitter.call("hideLoader") : null;
			return responseObject.ans;
		}
	});
	return r;
}

module.exports = {
	functions: functions,
};