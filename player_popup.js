window.loaded = false;

function openPlayer(songName) {
	chrome.tabs.getSelected(null, function(tab) {
		// chorme.tabs.insertCSS(tab.id, )
		chrome.tabs.executeScript(tab.id, {code: "var songName ='" + songName + "'; var loaded = '" + window.loaded + "'"}, function() {
			console.log(window.nameOfSong);
			chrome.tabs.executeScript(tab.id, {file: "jquery-2.1.4.min.js"}, function() {
				chrome.tabs.executeScript(tab.id, {file: "deezer-sdk.js"}, function() {
					chrome.tabs.executeScript(tab.id, {file: "contentScript.js"});
					window.loaded = true;
				});
			});
		});
  });
}


function loadPlayerDependency(tab, cb) {
    console.log("loading dep");

    chrome.tabs.executeScript(tab.id, {file: "jquery-2.1.4.min.js"}, function() {
        chrome.tabs.executeScript(tab.id, {file: "deezer-sdk.js"}, function() {
            console.log("dep loaded");
            window.loaded = true;
            cb();
        });
    });
};
