// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// A generic onclick callback function.
function genericOnClick(info, tab) {
	openPlayer(info.selectionText)
}

var whiteList = new RegExp("http://www.residentadvisor.net*");

chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log("tab activate");
        var currentTab = tabs[0];
	    	var url = currentTab.url;

	    if(whiteList.test(url)) {
            console.log("in white list");
            showPageAction(currentTab);

            loadPlayerDependency(currentTab, function(){
                chrome.tabs.executeScript(currentTab.id, {file: "parser/residentadvisor.net.js"});
            });

	    }
	});
});
// chrome.tabs.onActiveChanged.addListener( function(tabId, info) {
//     chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
// 	    console.log(tabs[0].url);
// 		});
// });
chrome.contextMenus.create({"title":"Play Music!","contexts":["selection"], "onclick":genericOnClick});


function showPageAction(tab) {
    console.log("page action");
    chrome.pageAction.show(tab.id);
};
