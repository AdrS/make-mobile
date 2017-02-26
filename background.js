function replaceHeader(headers, name, value) {
		for (var i = 0; i < headers.length; ++i) {
			if (headers[i].name === name) {
				if(value) {
					headers[i].value = value;
				} else {
					headers.splice(i, 1); //if no value given, then remove header
				}
				break;
			}
		}
		return {requestHeaders: headers};
}

//current as of Feb 2017
var iphone6UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";

var mobile_blacklist = ["https://youtube.com", "https://m.youtube.com", "https://mail.google.com", "https://drive.google.com"];
var black_list_mode = true;

if(black_list_mode) {
	console.log("blacklist mode");
	chrome.webRequest.onBeforeSendHeaders.addListener(
		function(details) {
			//if on site whose mobile version is blacklisted, use normal UA
			for(var i = 0; i < mobile_blacklist.length; ++i) {
				if(details.url.startsWith(mobile_blacklist[i])) {
					return {requestHeaders: details.requestHeaders};
				}
			}
			//otherwise
			return replaceHeader(details.requestHeaders, 'User-Agent', iphone6UA);
		},
		{urls: ["<all_urls>"]},
		["blocking", "requestHeaders"]);
} else {
	console.log("whitelist mode");
	chrome.webRequest.onBeforeSendHeaders.addListener(
		function(details) {
			return replaceHeader(details.requestHeaders, 'User-Agent', iphone6UA);
		},
		{urls: ["https://en.wikipedia.org/*", "https://arstechnica.com/*"]},
		["blocking", "requestHeaders"]);
}

//remove referers
chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
		return replaceHeader(details.requestHeaders, 'Referer', null);
	},
	{urls: ["<all_urls>"]},
	["blocking", "requestHeaders"]);
