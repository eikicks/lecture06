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
		
		var QAmessage = "プレゼン時間は残り" + alarm.duration + "秒です";
		var remainingSec = Number(alarm.duration);
		var ringAlarm = Number(alarm.message);
		
		if(remainingSec == ringAlarm){
		   var notification = new Notification(QAmessage);
/* 			window.alert(QAmessage); */
		}
				console.log(alarm.duration);
				console.log(ringAlarm);
};

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;

		if(Notification.permission == "granted"){
			var notification = new Notification(message);
		}
		alarm.output.textContent = message;
		console.log(message);
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

var setupQAAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
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
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};
//isReadyToCountdown関数を呼び出す、trueならupdateCounter関数を呼び出す、trueならupdate関数をINTERVAL(1秒)ごとに呼び出す

var initApp = function(){
		alarm.durationInput = document.querySelector("#duration");
		alarm.durationQAInput = document.querySelector("#durationQA");
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
		var startQAButton = document.querySelector("#startQA");
		startQAButton.addEventListener("click", startQAAlarm);
		//表示する（id="message"）をクリックするとstartAlarmの関数を呼び出す	
};
//関数initapp　設定する
initApp();
