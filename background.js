// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
window.loaded = false;
// A generic onclick callback function.
function genericOnClick(info, tab) {
	console.log(info);
	window.nameOfSong = info.selectionText;
	// chrome.tabs.getCurrent(function setred(tab){
	// 	chrome.tabs.executeScript(tab.id, {
	//     code: 'document.body.style.backgroundColor="red"'
	// 	});
	// });
	chrome.tabs.getSelected(null, function(tab) {
		// chorme.tabs.insertCSS(tab.id, )
		chrome.tabs.executeScript(tab.id, {code: "var songName ='" + window.nameOfSong + "'; var loaded = '" + window.loaded + "'"}, function() {
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

function callPopupFunciton(nameOfSong, popup)
{
	console.log(popup);
	popup.document.getElementById('status').textContent = nameOfSong;
}




chrome.contextMenus.create({"title":"Play Music!","contexts":["selection"], "onclick":genericOnClick});