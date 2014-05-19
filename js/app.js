var INTERVAL = 1000;
//1000mm秒＝1秒
var DEFAULT_MESSAGE = "終了";
//関数default_messageは終了	
var alarm = {
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";
};
//formatcounerassting関数はあと何（alarm.durationの値）秒を表示する

var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
};
//formatcounerassting関数を呼び出す

var showAlarmMessage = function(){
		var message = DEFAULT_MESSAGE;
		//関数default_messageを呼び出す
		if(alarm.message.length > 0){
				message = alarm.message;
		}
		//もし、アラートメッセージの値が入力されていたら、alarm.messageを実行し、メッセージの関数へ			
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
				//updatecounter関数をINTERVAL(1秒)ごとに呼び出し、1ずつalarm.durationの値を減らす
		}else{
				showAlarmMessage();
		}//falseならshowalrmmessageの関数を呼び出す
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};
//isReatyToCountdownの関数　実行されalarm.durationの数値が０以上の場合は実行される

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.messageInput.value);
		//タイマーの設定時間の値、アラームのメッセージのテキストの値を代入する		
		if(isReadyToCountdown()){
			//実行されalarm.durationの数値が０以上の場合はupdatecounterを実行する
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
		//1秒ずつupdateの関数を呼び出す
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
