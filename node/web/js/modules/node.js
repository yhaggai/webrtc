app.modules.node = (function(){
	var socket;
	var myInfo;
	var users;
	var addListener = function(){
	    socket.on('connect', function(){
	    	console.log(arguments);
			socket.emit('adduser', prompt("What's your name?"));
	    });

	    socket.on('task', taskHandler);
	    socket.on('rtc', rtcHandler);
	};
	var init = function(servUrl){console.log(servUrl);
		socket = io.connect(servUrl);
		addListener();
	};
	var taskHandler = function(action, data){
		switch(action){

			case 'initInfo':
				console.log('initInfo');
				console.log(data);
				myInfo = data.myInfo;
				users = data.users;
				break;

			case 'onboard':
				console.log('onboard msg: '+ data.msg)
				break;

			case 'msg':
				console.log('from: '+data.from+' - msg: '+ data.msg)
				break;
		};
	};
	var rtcHandler = function(action, data){
		switch(action){

			case 'offerInfo':
				console.log('offerInfo');
				break;

			case 'answerInfo':
				console.log('answerInfo')
				break;
		};
	};
	var sendTo = function(userid, data){
		data.from = myInfo.userid;
		socket.emit('task', 'sendto', {"to":userid, "data": data});
	};
	var sendToAll = function(data){
		data.from = myInfo.userid;
		socket.emit('task', 'sendtoall', data);
	};
	var sendRtcData = function(userid, infoType, data){//infoType: offerInfo/answerInfo
		socket.emit('rtc', infoType, {"to":userid, "data": data});
	};

	return {
		init: init,
		sendTo: sendTo,
		send: sendToAll,
		sendRtcData: sendRtcData
	};

})();