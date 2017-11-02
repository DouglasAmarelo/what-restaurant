'use strict';

// PLAY YOUTUBE VIDEO
function playYoutubeVideo() {
	var player = $('.lightbox-video');
	var btnPlay = $('.btn-play');
	var btnClose = $('.btn-close');
	var frameVideo = $('.lightbox-video .frame-video');
	var frameVideoUrl = frameVideo.attr('src');

	btnPlay.on('click', function(e) {
		e.preventDefault();
		console.log('lala -stop');
		player.addClass('-active');
		frameVideo[0].src += '&autoplay=1';
	});
	btnClose.on('click', function(e) {
		e.preventDefault();
		console.log('lala -stop');
		player.removeClass('-active');
		frameVideo.attr('src','');
		frameVideo.attr('src',frameVideoUrl);
	});
}

$(window).load(function(){
	playYoutubeVideo();
});