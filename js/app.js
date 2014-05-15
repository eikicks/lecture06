var INTERVAL = 1000;
var DEFAULT_MESSAGE = "終了";
//関数default_messageは終了	
var alarm = {
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";
};
//formatcounerassting関数はalarm.durationを　return=計算を返す

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;
		if(alarm.message.length > 0){
				message = alarm.message;
		}
		if(Notification.permission == "granted"){
				var notification = new Notification(message);
		}
		alarm.output.textContent = message;
};

var update = function(){
		alarm.duration = alarm.duration - 1;
		//alarm.durationのを1引く
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
				//update関数をINTERVAL(1秒)ごとに呼び出す
		}else{
				showAlarmMessage();
		}//falseならshowalrmmessageの関数を呼び出す
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};
//isReatyToCountdownの関数　実行されalarm.durationの数値が０以上の場合は

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};
//isReadyToCountdown関数を呼び出す、trueならupdateCounter関数を呼び出す、trueならupdate関数をINTERVAL(1秒)ごとに呼び出す
//

var initApp = function(){
		alarm.durationSelect = document.querySelector("#duration");
		//タイマーの設定時間(id="duration")
		alarm.messageInput = document.querySelector("#message");
		//入力したテキスト(id="message")
		alarm.output = document.querySelector("#countdown");
		//タイマーのカウントダウン(id="countdown")
		Notification.requestPermission(function(status){
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});

		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);
		//表示する（id="message"）をクリックするとstartAlarmの関数を呼び出す	
};
//関数initapp　設定する
initApp();
