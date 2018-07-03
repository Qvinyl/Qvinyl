'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleLoadStart = handleLoadStart;
exports.handleCanPlay = handleCanPlay;
exports.handleWaiting = handleWaiting;
exports.handleCanPlayThrough = handleCanPlayThrough;
exports.handlePlaying = handlePlaying;
exports.handlePlay = handlePlay;
exports.handlePause = handlePause;
exports.handleEnd = handleEnd;
exports.handleSeeking = handleSeeking;
exports.handleSeeked = handleSeeked;
exports.handleDurationChange = handleDurationChange;
exports.handleTimeUpdate = handleTimeUpdate;
exports.handleVolumeChange = handleVolumeChange;
exports.handleProgressChange = handleProgressChange;
exports.handleRateChange = handleRateChange;
exports.handleSuspend = handleSuspend;
exports.handleAbort = handleAbort;
exports.handleEmptied = handleEmptied;
exports.handleStalled = handleStalled;
exports.handleLoadedMetaData = handleLoadedMetaData;
exports.handleLoadedData = handleLoadedData;
exports.handleResize = handleResize;
exports.handleError = handleError;
exports.handleSeekingTime = handleSeekingTime;
exports.handleEndSeeking = handleEndSeeking;
var LOAD_START = exports.LOAD_START = 'video-react/LOAD_START';
var CAN_PLAY = exports.CAN_PLAY = 'video-react/CAN_PLAY';
var WAITING = exports.WAITING = 'video-react/WAITING';
var CAN_PLAY_THROUGH = exports.CAN_PLAY_THROUGH = 'video-react/CAN_PLAY_THROUGH';
var PLAYING = exports.PLAYING = 'video-react/PLAYING';
var PLAY = exports.PLAY = 'video-react/PLAY';
var PAUSE = exports.PAUSE = 'video-react/PAUSE';
var END = exports.END = 'video-react/END';
var SEEKING = exports.SEEKING = 'video-react/SEEKING';
var SEEKED = exports.SEEKED = 'video-react/SEEKED';
var SEEKING_TIME = exports.SEEKING_TIME = 'video-react/SEEKING_TIME';
var END_SEEKING = exports.END_SEEKING = 'video-react/END_SEEKING';
var DURATION_CHANGE = exports.DURATION_CHANGE = 'video-react/DURATION_CHANGE';
var TIME_UPDATE = exports.TIME_UPDATE = 'video-react/TIME_UPDATE';
var VOLUME_CHANGE = exports.VOLUME_CHANGE = 'video-react/VOLUME_CHANGE';
var PROGRESS_CHANGE = exports.PROGRESS_CHANGE = 'video-react/PROGRESS_CHANGE';
var RATE_CHANGE = exports.RATE_CHANGE = 'video-react/RATE_CHANGE';
var SUSPEND = exports.SUSPEND = 'video-react/SUSPEND';
var ABORT = exports.ABORT = 'video-react/ABORT';
var EMPTIED = exports.EMPTIED = 'video-react/EMPTIED';
var STALLED = exports.STALLED = 'video-react/STALLED';
var LOADED_META_DATA = exports.LOADED_META_DATA = 'video-react/LOADED_META_DATA';
var LOADED_DATA = exports.LOADED_DATA = 'video-react/LOADED_DATA';
var RESIZE = exports.RESIZE = 'video-react/RESIZE';
var ERROR = exports.ERROR = 'video-react/ERROR';

function handleLoadStart(videoProps) {
  return {
    type: LOAD_START,
    videoProps: videoProps
  };
}

function handleCanPlay(videoProps) {
  return {
    type: CAN_PLAY,
    videoProps: videoProps
  };
}

function handleWaiting(videoProps) {
  return {
    type: WAITING,
    videoProps: videoProps
  };
}

function handleCanPlayThrough(videoProps) {
  return {
    type: CAN_PLAY_THROUGH,
    videoProps: videoProps
  };
}

function handlePlaying(videoProps) {
  return {
    type: PLAYING,
    videoProps: videoProps
  };
}

function handlePlay(videoProps) {
  return {
    type: PLAY,
    videoProps: videoProps
  };
}

function handlePause(videoProps) {
  return {
    type: PAUSE,
    videoProps: videoProps
  };
}

function handleEnd(videoProps) {
  return {
    type: END,
    videoProps: videoProps
  };
}

function handleSeeking(videoProps) {
  return {
    type: SEEKING,
    videoProps: videoProps
  };
}

function handleSeeked(videoProps) {
  return {
    type: SEEKED,
    videoProps: videoProps
  };
}

function handleDurationChange(videoProps) {
  return {
    type: DURATION_CHANGE,
    videoProps: videoProps
  };
}

function handleTimeUpdate(videoProps) {
  return {
    type: TIME_UPDATE,
    videoProps: videoProps
  };
}

function handleVolumeChange(videoProps) {
  return {
    type: VOLUME_CHANGE,
    videoProps: videoProps
  };
}

function handleProgressChange(videoProps) {
  return {
    type: PROGRESS_CHANGE,
    videoProps: videoProps
  };
}

function handleRateChange(videoProps) {
  return {
    type: RATE_CHANGE,
    videoProps: videoProps
  };
}

function handleSuspend(videoProps) {
  return {
    type: SUSPEND,
    videoProps: videoProps
  };
}

function handleAbort(videoProps) {
  return {
    type: ABORT,
    videoProps: videoProps
  };
}

function handleEmptied(videoProps) {
  return {
    type: EMPTIED,
    videoProps: videoProps
  };
}

function handleStalled(videoProps) {
  return {
    type: STALLED,
    videoProps: videoProps
  };
}

function handleLoadedMetaData(videoProps) {
  return {
    type: LOADED_META_DATA,
    videoProps: videoProps
  };
}

function handleLoadedData(videoProps) {
  return {
    type: LOADED_DATA,
    videoProps: videoProps
  };
}

function handleResize(videoProps) {
  return {
    type: RESIZE,
    videoProps: videoProps
  };
}

function handleError(videoProps) {
  return {
    type: ERROR,
    videoProps: videoProps
  };
}

function handleSeekingTime(time) {
  return {
    type: SEEKING_TIME,
    time: time
  };
}

function handleEndSeeking(time) {
  return {
    type: END_SEEKING,
    time: time
  };
}