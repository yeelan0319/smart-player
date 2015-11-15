DZ.init({
  appId  : '167595',
  channelUrl : 'chrome-extension://ljeljfkfobcelmkgbldmmjakfkccbcof/',
  player: {
    container: 'player',
    width : 300,
    height : 300,
    format : 'square',
    onload : function(){
      DZ.player.playTracks([3135556]);
    }
  }
});