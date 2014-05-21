var INTERVAL = 1000;
//1000mm秒＝1秒
var DEFAULT_MESSAGE = "終了";
var alarm = {
		duration: -1,
		qtime: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";
};
//プレゼン時間があと何（alarm.durationの値）秒か表示する

var formatCounterAsStringQA = function(){
		return "あと" + alarm.qtime + "秒";
};
//質疑応答時間があと何（alarm.qtimeの値）秒か表示する


var updateCounter = function(){
		alarm.output.textContent = formatCounterAsString();
		//formatcounerassting関数を呼び出す
		
		var QAmessage = "プレゼン時間は残り" + alarm.duration + "秒です";
		var remainingSec = Number(alarm.duration);
		var ringAlarm = Number(alarm.message);
		
		if(remainingSec == ringAlarm){
		   var notification = new Notification(QAmessage);
		}
		//プレゼンの残り時間と予鈴の時間が一致した時に、通知（予鈴）をだす。
};

var updateCounterQA = function(){
		alarm.output.textContent = formatCounterAsStringQA();
		//formatCounterAsStringQA関数を呼び出す
};

var showAlarmMessage = function(){
		var message = "プレゼン時間は終了です";

		if(Notification.permission == "granted"){
			var notification = new Notification(message);
		}
		//プレゼン時間が終了したときにお知らせの通知をだす。
		alarm.output.textContent = message;
};

var showAlarmMessageQA = function(){
		var message = "質疑応答時間は終了です";

		if(Notification.permission == "granted"){
			var notification = new Notification(message);
		}
		//質疑応答時間が終了したときにお知らせの通知をだす。
		alarm.output.textContent = message;
};

var update = function(){
		alarm.duration = alarm.duration - 1;
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
				//updatecounter関数をINTERVAL(1秒)ごとに呼び出し、1ずつalarm.durationの値を減らす
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
//isReatyToCountdownの関数　実行されalarm.durationの数値が０以上の場合は実行される

var isReadyToCountdownQA = function(){
		return Number.isInteger(alarm.qtime) && alarm.qtime > 0;
};
//isReatyToCountdownQAの関数　実行されalarm.qtimeの数値が０以上の場合は実行される

var setupAlarm = function(durationString, message){
		alarm.duration = Number(durationString),
		alarm.message = message;
};
//setupAlarm関数の準備をしている。

var setupQAAlarm = function(durationString, message){
		alarm.qtime = Number(durationString),
		alarm.message = message;
};
//setupQAAlarm関数の準備をしている。

var startAlarm = function(){
		setupAlarm(alarm.durationInput.value, alarm.messageInput.value);
		//タイマーの設定時間の値、アラームのメッセージのテキストの値を代入する。	
		if(isReadyToCountdown()){
		 //isReadyToCountdown関数を呼び出す、trueならupdateCounter関数を呼び出す、trueならupdate関数をINTERVAL(1秒)ごとに呼び出す
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
		//1秒ずつupdateの関数を呼び出す
};

var startQAAlarm = function(){
		setupQAAlarm(alarm.durationQAInput.value, alarm.messageInput.value);
		//タイマーの設定時間の値、アラームのメッセージのテキストの値を代入する。	
		if(isReadyToCountdownQA()){
		 //isReadyToCountdown関数を呼び出す、trueならupdateCounter関数を呼び出す、trueならupdate関数をINTERVAL(1秒)ごとに呼び出す
				updateCounterQA();
				window.setTimeout(updateQA, INTERVAL);
		}
};

var initApp = function(){
		alarm.durationInput = document.querySelector("#duration");
		 //タイマーの設定時間(id="duration")
		alarm.durationQAInput = document.querySelector("#durationQA");
		//入力したテキスト(id="message")
		alarm.messageInput = document.querySelector("#message");
		//タイマーのカウントダウンメッセージ(id="countdown")
		alarm.output = document.querySelector("#countdown");
		Notification.requestPermission(function(status){
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});
		
		var startButton = document.querySelector("#start");
		startButton.addEventListener("click", startAlarm);
		//startAlarmの関数を呼び出す
		var startQAButton = document.querySelector("#startQA");
		startQAButton.addEventListener("click", startQAAlarm);
		//startQAAlarmの関数を呼び出す

};

initApp();
