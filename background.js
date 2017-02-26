//see: https://developer.chrome.com/extensions/webRequest

//From Feb 2017
var nexus5UA = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36"
var iphone6UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"

chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		//TODO: cookie blocking, script blocking
		//TODO: don't mess with whitelisted urls
		//add logic to determine what UA to use
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			//console.log(details);
			//Use mobile user agent
			if (details.requestHeaders[i].name === 'User-Agent') {
				//if you use andriod UA, google give urls for android intents
				details.requestHeaders[i].value = iphone6UA;
			//Remove referers
			} else if(details.requestHeaders[i].make === "Referer") {
				details.requestHeaders.splice(i, 1);
			}
		}
		return {requestHeaders: details.requestHeaders};
	},
	{urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
console.log("init");
