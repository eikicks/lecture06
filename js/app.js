var INTERVAL = 1000;
var DEFAULT_MESSAGE = "終了";
var alarm = {
		duration: -1,
		qtime: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";
};

var formatCounterAsStringQA = function(){
		return "あと" + alarm.qtime + "秒";
};

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
		
		var QAmessage = "プレゼン時間は残り" + alarm.duration + "秒です";
		var remainingSec = Number(alarm.duration);
		var ringAlarm = Number(alarm.message);
		
		if(remainingSec == ringAlarm){
		   var notification = new Notification(QAmessage);
		}
};

var updateCounterQA = function(){
		alarm.output.textContent = formatCounterAsStringQA();
		console.log(alarm.qtime);
};

var showAlarmMessage = function(){
		var message = "プレゼン時間は終了です";

		if(Notification.permission == "granted"){
			var notification = new Notification(message);
		}
		alarm.output.textContent = message;
		console.log(message);
};

var showAlarmMessageQA = function(){
		var message = "質疑応答時間は終了です";

		if(Notification.permission == "granted"){
			var notification = new Notification(message);
		}
		alarm.output.textContent = message;
		console.log(message);
};

var update = function(){
		alarm.duration = alarm.duration - 1;
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}else{
				showAlarmMessage();
		}
};

var updateQA = function(){
		alarm.qtime = alarm.qtime - 1;
		if(isReadyToCountdownQA()){
				updateCounterQA();
				window.setTimeout(updateQA, INTERVAL);
		}else{
				showAlarmMessageQA();
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};

var isReadyToCountdownQA = function(){
		return Number.isInteger(alarm.qtime) && alarm.qtime > 0;
};

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};

var setupQAAlarm = function(durationString, message){
		alarm.qtime = Number(durationString),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.durationInput.value, alarm.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

var startQAAlarm = function(){
		setupQAAlarm(alarm.durationQAInput.value, alarm.messageInput.value);
		if(isReadyToCountdownQA()){
				updateCounterQA();
				window.setTimeout(updateQA, INTERVAL);
		}
};

var initApp = function(){
		alarm.durationInput = document.querySelector("#duration");
		alarm.durationQAInput = document.querySelector("#durationQA");
		alarm.messageInput = document.querySelector("#message");
		alarm.output = document.querySelector("#countdown");
		Notification.requestPermission(function(status){
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});
		
		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);
		var startQAButton = document.querySelector("#startQA");
		startQAButton.addEventListener("click", startQAAlarm);
};

initApp();
