function openPlayer(songName) {
	$("#smart-player").remove();
	$('body').append('<div id="dz-root" style="position: relative"><div id="smart-player" style="display:none"><span id="close">x</span></div></div>');
	$('#smart-player').css({
		'position': 'fixed',
		'top': '0px',
		'left': '0px',
		'height': '62px',
		'width': '300px',
		'z-index': '10000',
		'background-color': 'black'
	});
	$('#close').css({
		'position': 'absolute',
		'top': '5px',
		'right': '10px',
		'font-size': '20px',
		'cursor': 'pointer',
		'z-index': '10001',
		'color': 'white'
	}).click(function(){
		$('#dz-root').remove();
	});
	$.get('https://api.deezer.com/search?q=' + songName, function(res){
		console.log('songName:' + songName);
		if(res.data && res.data.length != 0) {
			console.log('id:' + res.data[0].id);	
			DZ.init({
			  appId  : '167595',
			  channelUrl : '',
			  player: {
			    container: 'smart-player',
			    width : 300,
			    height : 62,
			    onload : function(){
			    	DZ.player.playTracks([res.data[0].id]);
			    	$('#smart-player').fadeIn();
			    }
			  }
			});
		}
		else {
			$('#smart-player').append('<h4 style="color: white; margin: 0; text-align: center; line-height: 62px">No Such Song</h4>').fadeIn().delay(1000).fadeOut();
		}	
	});  
};



$(document).ready(function(){
    console.log("in resident");

    var $albumNameEle = $("#sectionHead h1");

    if($albumNameEle.length == 1) {
        console.log("load player");

        var albumName = $albumNameEle.text().replace(" EP", "");
        console.log(albumName);
        openPlayer(albumName);
    }
});


