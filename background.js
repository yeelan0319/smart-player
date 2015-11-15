// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
window.loaded = false;
// A generic onclick callback function.
function genericOnClick(info, tab) {
	openPlayer(info.selectionText)
}

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

chrome.contextMenus.create({"title":"Play Music!","contexts":["selection"], "onclick":genericOnClick});