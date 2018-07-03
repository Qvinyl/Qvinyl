'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_ACTIVATE = exports.PLAYER_ACTIVATE = exports.FULLSCREEN_CHANGE = exports.OPERATE = undefined;
exports.handleFullscreenChange = handleFullscreenChange;
exports.activate = activate;
exports.userActivate = userActivate;
exports.play = play;
exports.pause = pause;
exports.togglePlay = togglePlay;
exports.seek = seek;
exports.forward = forward;
exports.replay = replay;
exports.changeRate = changeRate;
exports.changeVolume = changeVolume;
exports.mute = mute;
exports.toggleFullscreen = toggleFullscreen;

var _fullscreen = require('../utils/fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPERATE = exports.OPERATE = 'video-react/OPERATE';
var FULLSCREEN_CHANGE = exports.FULLSCREEN_CHANGE = 'video-react/FULLSCREEN_CHANGE';
var PLAYER_ACTIVATE = exports.PLAYER_ACTIVATE = 'video-react/PLAYER_ACTIVATE';
var USER_ACTIVATE = exports.USER_ACTIVATE = 'video-react/USER_ACTIVATE';

function handleFullscreenChange(isFullscreen) {
  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen: isFullscreen
  };
}

function activate(activity) {
  return {
    type: PLAYER_ACTIVATE,
    activity: activity
  };
}

function userActivate(activity) {
  return {
    type: USER_ACTIVATE,
    activity: activity
  };
}

function play() {
  var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    action: 'play',
    source: ''
  };

  this.video.play();

  return {
    type: OPERATE,
    operation: operation
  };
}

function pause() {
  var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    action: 'pause',
    source: ''
  };

  this.video.pause();

  return {
    type: OPERATE,
    operation: operation
  };
}

function togglePlay() {
  var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    action: 'toggle-play',
    source: ''
  };

  this.video.togglePlay();

  return {
    type: OPERATE,
    operation: operation
  };
}

// seek video by time
function seek(time) {
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    action: 'seek',
    source: ''
  };

  this.video.seek(time);

  return {
    type: OPERATE,
    operation: operation
  };
}

// jump forward x seconds
function forward(seconds) {
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    action: 'forward-' + seconds,
    source: ''
  };

  this.video.forward(seconds);

  return {
    type: OPERATE,
    operation: operation
  };
}

// jump back x seconds
function replay(seconds) {
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    action: 'replay-' + seconds,
    source: ''
  };

  this.video.replay(seconds);

  return {
    type: OPERATE,
    operation: operation
  };
}

function changeRate(rate) {
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    action: 'change-rate',
    source: ''
  };

  this.video.playbackRate = rate;

  return {
    type: OPERATE,
    operation: operation
  };
}

function changeVolume(volume) {
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    action: 'change-volume',
    source: ''
  };

  var v = volume;
  if (volume < 0) {
    v = 0;
  }
  if (volume > 1) {
    v = 1;
  }
  this.video.volume = v;

  return {
    type: OPERATE,
    operation: operation
  };
}

function mute(muted) {
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    action: muted ? 'muted' : 'unmuted',
    source: ''
  };

  this.video.muted = muted;

  return {
    type: OPERATE,
    operation: operation
  };
}

function toggleFullscreen(player) {
  if (_fullscreen2.default.enabled) {
    if (_fullscreen2.default.isFullscreen) {
      _fullscreen2.default.exit();
    } else {
      _fullscreen2.default.request(this.rootElement);
    }
    return {
      type: OPERATE,
      operation: {
        action: 'toggle-fullscreen',
        source: ''
      }
    };
  }

  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen: !player.isFullscreen
  };
}