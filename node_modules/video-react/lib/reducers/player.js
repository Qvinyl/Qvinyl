'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.player = player;

var _video = require('../actions/video');

var _player = require('../actions/player');

var initialState = {
  currentSrc: null,
  duration: 0,
  currentTime: 0,
  seekingTime: 0,
  buffered: null,
  waiting: false,
  seeking: false,
  paused: true,
  autoPaused: false,
  ended: false,
  playbackRate: 1,
  muted: false,
  volume: 1,
  readyState: 0,
  networkState: 0,
  videoWidth: 0,
  videoHeight: 0,
  hasStarted: false,
  userActivity: true,
  isActive: false,
  isFullscreen: false
};

function player() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _player.USER_ACTIVATE:
      return _extends({}, state, {
        userActivity: action.activity
      });
    case _player.PLAYER_ACTIVATE:
      return _extends({}, state, {
        isActive: action.activity
      });
    case _player.FULLSCREEN_CHANGE:
      return _extends({}, state, {
        isFullscreen: !!action.isFullscreen
      });
    case _video.SEEKING_TIME:
      return _extends({}, state, {
        seekingTime: action.time
      });
    case _video.END_SEEKING:
      return _extends({}, state, {
        seekingTime: 0
      });
    case _video.LOAD_START:
      return _extends({}, state, action.videoProps, {
        hasStarted: false,
        ended: false
      });
    case _video.CAN_PLAY:
      return _extends({}, state, action.videoProps, {
        waiting: false
      });
    case _video.WAITING:
      return _extends({}, state, action.videoProps, {
        waiting: true
      });
    case _video.CAN_PLAY_THROUGH:
    case _video.PLAYING:
      return _extends({}, state, action.videoProps, {
        waiting: false
      });
    case _video.PLAY:
      return _extends({}, state, action.videoProps, {
        ended: false,
        paused: false,
        autoPaused: false,
        waiting: false,
        hasStarted: true
      });
    case _video.PAUSE:
      return _extends({}, state, action.videoProps, {
        paused: true
      });
    case _video.END:
      return _extends({}, state, action.videoProps, {
        ended: true
      });
    case _video.SEEKING:
      return _extends({}, state, action.videoProps, {
        seeking: true
      });
    case _video.SEEKED:
      return _extends({}, state, action.videoProps, {
        seeking: false
      });
    case _video.ERROR:
      return _extends({}, state, action.videoProps, {
        error: 'UNKNOWN ERROR',
        ended: true
      });
    case _video.DURATION_CHANGE:
    case _video.TIME_UPDATE:
    case _video.VOLUME_CHANGE:
    case _video.PROGRESS_CHANGE:
    case _video.RATE_CHANGE:
    case _video.SUSPEND:
    case _video.ABORT:
    case _video.EMPTIED:
    case _video.STALLED:
    case _video.LOADED_META_DATA:
    case _video.LOADED_DATA:
    case _video.RESIZE:
      var newState = _extends({}, state, action.videoProps);
      if (action.videoProps.paused === false) {
        newState.hasStarted = true;
        newState.waiting = false;
      }
      return newState;
    default:
      return state;
  }
}

exports.default = player;