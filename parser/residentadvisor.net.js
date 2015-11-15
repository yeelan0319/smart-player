$(document).ready(function(){


    var $albumNameEle = $("#sectionHead h1");

    if($albumNameEle.length == 1) {

        var albumName = $albumNameEle.text();

        console.log(albumName);

    }


});


function showPageAction() {

    if(!window.tabID) {
        console.log("error no tab id");
    }

    chrome.pageAction.show(window.tabID);

};
