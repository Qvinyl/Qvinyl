$(document).ready(function () {
    console.clear();
    var player = SC.Widget($('iframe.sc-widget')[0]);

    var pOffset = $('.progress').offset(); //Zero the progress bar
    var pWidth = $('.progress').width();
    var scrub;

    player.bind(SC.Widget.Events.READY, function (eventData) {
        setInfo();
    }); //Set info on load
    player.bind(SC.Widget.Events.PLAY_PROGRESS, function (e) {
        if (e.relativePosition < 0.003) {
            setInfo();
        }
        //Event listener when track is playing
        $('.progress-bar').css('width', (e.relativePosition * 100) + "%");

        if (!$(".play").hasClass('glyphicon-pause')) {
            $(".play")
                .removeClass('glyphicon-play')
                .addClass('glyphicon-pause');
        }
    });

    player.bind(SC.Widget.Events.PAUSE, function (e) { //Event listener when track is paused
        setInfo();
        $(".play")
            .addClass('glyphicon-play')
            .removeClass('glyphicon-pause');
    });

    $('.progress').mousemove(function (e) { //Get position of mouse for scrubbing
        scrub = (e.pageX - pOffset.left);
    });

    $('.progress').click(function () { //Use the position to seek when clicked
        $('.progress-bar').css('width', scrub + "px");
        var seek = player.duration * (scrub / pWidth);
        player.seekTo(seek);
    });

    //Buttons
    $('.play').click(function () {
        player.toggle();
    });
    $('.backward').click(function () {
        player.prev();
    });
    $('.forward').click(function () {
        player.next();
    });

    function setInfo() {
        player.getCurrentSound(function (song) {
            if (!song) {
                $('.art').css('background-image', '');
                $('.title').html('');
                $('.song').html('No artist found :(');
                return;
            }
            $('.art').css('background-image', "url('" + song.artwork_url.replace('-large', '-t500x500') + "')");
            $('.title').html(song.user.username);
            $('.song').html(song.title);
            player.current = song;
        });

        player.getDuration(function (value) {
            player.duration = value;
        });

        player.isPaused(function (bool) {
            player.getPaused = bool;
        });
    }

    $('.settings').click(function () {
        var url = prompt('Enter a soundcloud link', '');

        if (url) {
            player.pause();

            var option = {
                callback: function () {
                    setInfo();
                }
            };
            player.load(url, option);

        }

    });
});
