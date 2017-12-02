angular.module('WebSocketService',[]).service('WebSocketService',function () {
	var service = {}
	var conexao
	var mensagem
	var socket
	var ehServidor = false
	var callbackConectou
	var callbackDesConectou
	var callbackRecebeuMensagem
	var callbackSalaCriada

	function configuraOnMessage(callback){
		callbackRecebeuMensagem = callback;
	}

	function conectou(par1,par2){
		if (ehServidor){
			conexao = par1
		}else{
			conexao = socket
		}
		callbackConectou(conexao)
	}

	function recebeuMensagem (par1,par2){
		if (ehServidor){
			 conexao = par1
			 mensagem = par2
		}else{
			mensagem = par1.data
		}
		callbackRecebeuMensagem(mensagem)
	}

	function enviaMensagem(mensagem){
		if (ehServidor){
			var wsserver = cordova.plugins.wsserver;
			wsserver.send(conexao,mensagem);
		}else{
			conexao.send(mensagem);
		}
	}

	function onFailure(addr, port, reason) {
			console.log('Stopped listening on %s:%d. Reason: %s', addr, port, reason);
	}
	//function onOpen(conn) {
    //			conexao = conn;
    //			console.log('A user connected from %s', conn.remoteAddr);
	//}
	//function onMessage(conn, msg) {
	 //       console.log(conn, msg);
	//}
	function onClose(conn, code, reason, wasClean) {
		callbackDesConectou()
		console.log('A user disconnected from %s', conn.remoteAddr);
	}
	function onStart(addr, port) {
		callbackSalaCriada()
		console.log('Sala criada com sucesso. Escutando em  %s:%d', addr, port);
	}
	function onDidNotStart(reason) {
		console.log('Não criei a sala. Razão: %s', reason);
	}

	function criarSala(port,salaCriada,onConnect,onDisconnect){
		ehServidor = true
		porta = port
		callbackConectou = onConnect
		callbackDesConectou = onDisconnect 
		callbackSalaCriada = salaCriada
	
		var wsserver = cordova.plugins.wsserver

		wsserver.start(port, {
			// WebSocket Server handlers
			'onFailure' : onFailure,    
			'onOpen' :    conectou ,
			'onMessage' : recebeuMensagem,
			'onClose' : onClose,   
			'origins' : [ 'file://' ], // validates the 'Origin' HTTP Header.
			'protocols' : [ 'my-protocol-v1', 'my-protocol-v2' ], // validates the 'Sec-WebSocket-Protocol' HTTP Header.
			'tcpNoDelay' : true // disables Nagle's algorithm.
		},onStart, onDidNotStart);
	}


	function conectarSala(ip,porta,onConnect,onDisconnect){
		ehServidor = false;
		socket = new WebSocket("ws://"+ip+":"+porta+"/", ["my-protocol-v1"])
		callbackConectou = onConnect
		socket.onmessage = recebeuMensagem
		socket.onopen = conectou
		socket.onclose = onDisconnect
	}


	function getIPs(onIPs){
		var ips;
		var wsserver = cordova.plugins.wsserver;
		ips = {};
		wsserver.getInterfaces(function(result) {
			for (var interface in result) {
				if (result.hasOwnProperty(interface)) {
					console.log('interface', interface);
					console.log('ipv4', result[interface].ipv4Addresses);
					console.log('ipv6', result[interface].ipv6Addresses);
					if (result[interface].ipv4Addresses.length>0)
						ips[result[interface].ipv4Addresses]="ipv4"
					if (result[interface].ipv6Addresses.length>0)
						ips[result[interface].ipv6Addresses]="ipv6"
				}
			}
			onIPs(ips);	
		});
	}

	function fecharSala(callbackSalaFechada){
		var wsserver = cordova.plugins.wsserver;
		wsserver.stop(function onStop(addr, port) {
			callbackSalaFechada()
    		console.log('Stopped listening on %s:%d', addr, port);
		});
	}

	function sairSala (){
		var wsserver = cordova.plugins.wsserver
		if(ehServidor)
			wsserver.close(conexao)	
		else
		socket.close()
	}

	service.getIPs = getIPs
	service.criarSala = criarSala 
	service.fecharSala= fecharSala 
	service.sairSala = sairSala 
	service.conectarSala = conectarSala
	service.enviaMensagem = enviaMensagem
	service.configuraOnMessage= configuraOnMessage 
	
	return service;

});
