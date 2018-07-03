'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  actions: _propTypes2.default.object,
  player: _propTypes2.default.object,
  children: _propTypes2.default.any,
  startTime: _propTypes2.default.number,
  loop: _propTypes2.default.bool,
  muted: _propTypes2.default.bool,
  autoPlay: _propTypes2.default.bool,
  playsInline: _propTypes2.default.bool,
  src: _propTypes2.default.string,
  poster: _propTypes2.default.string,
  className: _propTypes2.default.string,
  preload: _propTypes2.default.oneOf(['auto', 'metadata', 'none']),
  crossOrigin: _propTypes2.default.string,

  onLoadStart: _propTypes2.default.func,
  onWaiting: _propTypes2.default.func,
  onCanPlay: _propTypes2.default.func,
  onCanPlayThrough: _propTypes2.default.func,
  onPlaying: _propTypes2.default.func,
  onEnded: _propTypes2.default.func,
  onSeeking: _propTypes2.default.func,
  onSeeked: _propTypes2.default.func,
  onPlay: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onProgress: _propTypes2.default.func,
  onDurationChange: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  onSuspend: _propTypes2.default.func,
  onAbort: _propTypes2.default.func,
  onEmptied: _propTypes2.default.func,
  onStalled: _propTypes2.default.func,
  onLoadedMetadata: _propTypes2.default.func,
  onLoadedData: _propTypes2.default.func,
  onTimeUpdate: _propTypes2.default.func,
  onRateChange: _propTypes2.default.func,
  onVolumeChange: _propTypes2.default.func,
  onResize: _propTypes2.default.func
};

var defaultProps = {
  preload: 'auto'
};

var Video = function (_Component) {
  _inherits(Video, _Component);

  function Video(props) {
    _classCallCheck(this, Video);

    var _this = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, props));

    _this.video = null; // the html5 video
    _this.play = _this.play.bind(_this);
    _this.pause = _this.pause.bind(_this);
    _this.seek = _this.seek.bind(_this);
    _this.forward = _this.forward.bind(_this);
    _this.replay = _this.replay.bind(_this);
    _this.toggleFullscreen = _this.toggleFullscreen.bind(_this);
    _this.getProperties = _this.getProperties.bind(_this);
    _this.renderChildren = _this.renderChildren.bind(_this);
    _this.handleLoadStart = _this.handleLoadStart.bind(_this);
    _this.handleCanPlay = _this.handleCanPlay.bind(_this);
    _this.handleCanPlayThrough = _this.handleCanPlayThrough.bind(_this);
    _this.handlePlay = _this.handlePlay.bind(_this);
    _this.handlePlaying = _this.handlePlaying.bind(_this);
    _this.handlePause = _this.handlePause.bind(_this);
    _this.handleEnded = _this.handleEnded.bind(_this);
    _this.handleWaiting = _this.handleWaiting.bind(_this);
    _this.handleSeeking = _this.handleSeeking.bind(_this);
    _this.handleSeeked = _this.handleSeeked.bind(_this);
    _this.handleFullscreenChange = _this.handleFullscreenChange.bind(_this);
    _this.handleError = _this.handleError.bind(_this);
    _this.handleSuspend = _this.handleSuspend.bind(_this);
    _this.handleAbort = _this.handleAbort.bind(_this);
    _this.handleEmptied = _this.handleEmptied.bind(_this);
    _this.handleStalled = _this.handleStalled.bind(_this);
    _this.handleLoadedMetaData = _this.handleLoadedMetaData.bind(_this);
    _this.handleLoadedData = _this.handleLoadedData.bind(_this);
    _this.handleTimeUpdate = _this.handleTimeUpdate.bind(_this);
    _this.handleRateChange = _this.handleRateChange.bind(_this);
    _this.handleVolumeChange = _this.handleVolumeChange.bind(_this);
    _this.handleDurationChange = _this.handleDurationChange.bind(_this);
    _this.handleProgress = (0, _utils.throttle)(_this.handleProgress.bind(_this), 250);
    _this.handleKeypress = _this.handleKeypress.bind(_this);
    return _this;
  }

  _createClass(Video, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.forceUpdate(); // make sure the children can get the video property
    }

    // get all video properties

  }, {
    key: 'getProperties',
    value: function getProperties() {
      var _this2 = this;

      if (!this.video) {
        return null;
      }

      return _utils.mediaProperties.reduce(function (properties, key) {
        properties[key] = _this2.video[key];
        return properties;
      }, {});
    }

    // get playback rate

  }, {
    key: 'play',


    // play the video
    value: function play() {
      var promise = this.video.play();
      if (promise !== undefined) {
        promise.catch(function (error) {}).then(function () {});
      }
    }

    // pause the video

  }, {
    key: 'pause',
    value: function pause() {
      var promise = this.video.pause();
      if (promise !== undefined) {
        promise.catch(function (error) {}).then(function () {});
      }
    }

    // Change the video source and re-load the video:

  }, {
    key: 'load',
    value: function load() {
      this.video.load();
    }

    // Add a new text track to the video

  }, {
    key: 'addTextTrack',
    value: function addTextTrack() {
      var _video;

      (_video = this.video).addTextTrack.apply(_video, arguments);
    }

    // Check if your browser can play different types of video:

  }, {
    key: 'canPlayType',
    value: function canPlayType() {
      var _video2;

      (_video2 = this.video).canPlayType.apply(_video2, arguments);
    }

    // toggle play

  }, {
    key: 'togglePlay',
    value: function togglePlay() {
      if (this.video.paused) {
        this.play();
      } else {
        this.pause();
      }
    }

    // seek video by time

  }, {
    key: 'seek',
    value: function seek(time) {
      try {
        this.video.currentTime = time;
      } catch (e) {
        // console.log(e, 'Video is not ready.')
      }
    }

    // jump forward x seconds

  }, {
    key: 'forward',
    value: function forward(seconds) {
      this.seek(this.video.currentTime + seconds);
    }

    // jump back x seconds

  }, {
    key: 'replay',
    value: function replay(seconds) {
      this.forward(-seconds);
    }

    // enter or exist full screen

  }, {
    key: 'toggleFullscreen',
    value: function toggleFullscreen() {
      var _props = this.props,
          player = _props.player,
          actions = _props.actions;

      actions.toggleFullscreen(player);
    }

    // Fired when the user agent
    // begins looking for media data

  }, {
    key: 'handleLoadStart',
    value: function handleLoadStart() {
      var _props2 = this.props,
          actions = _props2.actions,
          onLoadStart = _props2.onLoadStart;

      actions.handleLoadStart(this.getProperties());
      if (onLoadStart) {
        onLoadStart.apply(undefined, arguments);
      }
    }

    // A handler for events that
    // signal that waiting has ended

  }, {
    key: 'handleCanPlay',
    value: function handleCanPlay() {
      var _props3 = this.props,
          actions = _props3.actions,
          onCanPlay = _props3.onCanPlay;


      actions.handleCanPlay(this.getProperties());

      if (onCanPlay) {
        onCanPlay.apply(undefined, arguments);
      }
    }

    // A handler for events that
    // signal that waiting has ended

  }, {
    key: 'handleCanPlayThrough',
    value: function handleCanPlayThrough() {
      var _props4 = this.props,
          actions = _props4.actions,
          onCanPlayThrough = _props4.onCanPlayThrough;

      actions.handleCanPlayThrough(this.getProperties());

      if (onCanPlayThrough) {
        onCanPlayThrough.apply(undefined, arguments);
      }
    }

    // A handler for events that
    // signal that waiting has ended

  }, {
    key: 'handlePlaying',
    value: function handlePlaying() {
      var _props5 = this.props,
          actions = _props5.actions,
          onPlaying = _props5.onPlaying;

      actions.handlePlaying(this.getProperties());

      if (onPlaying) {
        onPlaying.apply(undefined, arguments);
      }
    }

    // Fired whenever the media has been started

  }, {
    key: 'handlePlay',
    value: function handlePlay() {
      var _props6 = this.props,
          actions = _props6.actions,
          onPlay = _props6.onPlay;

      actions.handlePlay(this.getProperties());

      if (onPlay) {
        onPlay.apply(undefined, arguments);
      }
    }

    // Fired whenever the media has been paused

  }, {
    key: 'handlePause',
    value: function handlePause() {
      var _props7 = this.props,
          actions = _props7.actions,
          onPause = _props7.onPause;

      actions.handlePause(this.getProperties());

      if (onPause) {
        onPause.apply(undefined, arguments);
      }
    }

    // Fired when the duration of
    // the media resource is first known or changed

  }, {
    key: 'handleDurationChange',
    value: function handleDurationChange() {
      var _props8 = this.props,
          actions = _props8.actions,
          onDurationChange = _props8.onDurationChange;

      actions.handleDurationChange(this.getProperties());

      if (onDurationChange) {
        onDurationChange.apply(undefined, arguments);
      }
    }

    // Fired while the user agent
    // is downloading media data

  }, {
    key: 'handleProgress',
    value: function handleProgress() {
      var _props9 = this.props,
          actions = _props9.actions,
          onProgress = _props9.onProgress;

      if (this.video) {
        actions.handleProgressChange(this.getProperties());
      }

      if (onProgress) {
        onProgress.apply(undefined, arguments);
      }
    }

    // Fired when the end of the media resource
    // is reached (currentTime == duration)

  }, {
    key: 'handleEnded',
    value: function handleEnded() {
      var _props10 = this.props,
          loop = _props10.loop,
          player = _props10.player,
          actions = _props10.actions,
          onEnded = _props10.onEnded;

      if (loop) {
        this.seek(0);
        this.play();
      } else if (!player.paused) {
        this.pause();
      }
      actions.handleEnd(this.getProperties());

      if (onEnded) {
        onEnded.apply(undefined, arguments);
      }
    }

    // Fired whenever the media begins waiting

  }, {
    key: 'handleWaiting',
    value: function handleWaiting() {
      var _props11 = this.props,
          actions = _props11.actions,
          onWaiting = _props11.onWaiting;

      actions.handleWaiting(this.getProperties());

      if (onWaiting) {
        onWaiting.apply(undefined, arguments);
      }
    }

    // Fired whenever the player
    // is jumping to a new time

  }, {
    key: 'handleSeeking',
    value: function handleSeeking() {
      var _props12 = this.props,
          actions = _props12.actions,
          onSeeking = _props12.onSeeking;

      actions.handleSeeking(this.getProperties());

      if (onSeeking) {
        onSeeking.apply(undefined, arguments);
      }
    }

    // Fired when the player has
    // finished jumping to a new time

  }, {
    key: 'handleSeeked',
    value: function handleSeeked() {
      var _props13 = this.props,
          actions = _props13.actions,
          onSeeked = _props13.onSeeked;

      actions.handleSeeked(this.getProperties());

      if (onSeeked) {
        onSeeked.apply(undefined, arguments);
      }
    }

    // Handle Fullscreen Change

  }, {
    key: 'handleFullscreenChange',
    value: function handleFullscreenChange() {}

    // Fires when the browser is
    // intentionally not getting media data

  }, {
    key: 'handleSuspend',
    value: function handleSuspend() {
      var _props14 = this.props,
          actions = _props14.actions,
          onSuspend = _props14.onSuspend;

      actions.handleSuspend(this.getProperties());
      if (onSuspend) {
        onSuspend.apply(undefined, arguments);
      }
    }

    // Fires when the loading of an audio/video is aborted

  }, {
    key: 'handleAbort',
    value: function handleAbort() {
      var _props15 = this.props,
          actions = _props15.actions,
          onAbort = _props15.onAbort;

      actions.handleAbort(this.getProperties());
      if (onAbort) {
        onAbort.apply(undefined, arguments);
      }
    }

    // Fires when the current playlist is empty

  }, {
    key: 'handleEmptied',
    value: function handleEmptied() {
      var _props16 = this.props,
          actions = _props16.actions,
          onEmptied = _props16.onEmptied;

      actions.handleEmptied(this.getProperties());
      if (onEmptied) {
        onEmptied.apply(undefined, arguments);
      }
    }

    // Fires when the browser is trying to
    // get media data, but data is not available

  }, {
    key: 'handleStalled',
    value: function handleStalled() {
      var _props17 = this.props,
          actions = _props17.actions,
          onStalled = _props17.onStalled;

      actions.handleStalled(this.getProperties());

      if (onStalled) {
        onStalled.apply(undefined, arguments);
      }
    }

    // Fires when the browser has loaded
    // meta data for the audio/video

  }, {
    key: 'handleLoadedMetaData',
    value: function handleLoadedMetaData() {
      var _props18 = this.props,
          actions = _props18.actions,
          onLoadedMetadata = _props18.onLoadedMetadata,
          startTime = _props18.startTime;


      if (startTime && startTime > 0) {
        this.video.currentTime = startTime;
      }

      actions.handleLoadedMetaData(this.getProperties());

      if (onLoadedMetadata) {
        onLoadedMetadata.apply(undefined, arguments);
      }
    }

    // Fires when the browser has loaded
    // the current frame of the audio/video

  }, {
    key: 'handleLoadedData',
    value: function handleLoadedData() {
      var _props19 = this.props,
          actions = _props19.actions,
          onLoadedData = _props19.onLoadedData;

      actions.handleLoadedData(this.getProperties());

      if (onLoadedData) {
        onLoadedData.apply(undefined, arguments);
      }
    }

    // Fires when the current
    // playback position has changed

  }, {
    key: 'handleTimeUpdate',
    value: function handleTimeUpdate() {
      var _props20 = this.props,
          actions = _props20.actions,
          onTimeUpdate = _props20.onTimeUpdate;

      actions.handleTimeUpdate(this.getProperties());

      if (onTimeUpdate) {
        onTimeUpdate.apply(undefined, arguments);
      }
    }

    /**
     * Fires when the playing speed of the audio/video is changed
     */

  }, {
    key: 'handleRateChange',
    value: function handleRateChange() {
      var _props21 = this.props,
          actions = _props21.actions,
          onRateChange = _props21.onRateChange;

      actions.handleRateChange(this.getProperties());

      if (onRateChange) {
        onRateChange.apply(undefined, arguments);
      }
    }

    // Fires when the volume has been changed

  }, {
    key: 'handleVolumeChange',
    value: function handleVolumeChange() {
      var _props22 = this.props,
          actions = _props22.actions,
          onVolumeChange = _props22.onVolumeChange;

      actions.handleVolumeChange(this.getProperties());

      if (onVolumeChange) {
        onVolumeChange.apply(undefined, arguments);
      }
    }

    // Fires when an error occurred
    // during the loading of an audio/video

  }, {
    key: 'handleError',
    value: function handleError() {
      var _props23 = this.props,
          actions = _props23.actions,
          onError = _props23.onError;

      actions.handleError(this.getProperties());
      if (onError) {
        onError.apply(undefined, arguments);
      }
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      var _props24 = this.props,
          actions = _props24.actions,
          onResize = _props24.onResize;

      actions.handleResize(this.getProperties());
      if (onResize) {
        onResize.apply(undefined, arguments);
      }
    }
  }, {
    key: 'handleKeypress',
    value: function handleKeypress() {}
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this3 = this;

      var props = _extends({}, this.props, {
        video: this.video
      });

      // to make sure the children can get video property
      if (!this.video) {
        return null;
      }

      // only keep <source />, <track />, <MyComponent isVideoChild /> elements
      return _react2.default.Children.toArray(this.props.children).filter(_utils.isVideoChild).map(function (c) {
        var cprops = void 0;
        if (typeof c.type === 'string') {
          // add onError to <source />
          if (c.type === 'source') {
            cprops = _extends({}, c.props);
            var preOnError = cprops.onError;
            cprops.onError = function () {
              if (preOnError) {
                preOnError.apply(undefined, arguments);
              }
              _this3.handleError.apply(_this3, arguments);
            };
          }
        } else {
          cprops = props;
        }
        return _react2.default.cloneElement(c, cprops);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props25 = this.props,
          loop = _props25.loop,
          poster = _props25.poster,
          preload = _props25.preload,
          src = _props25.src,
          autoPlay = _props25.autoPlay,
          playsInline = _props25.playsInline,
          muted = _props25.muted,
          crossOrigin = _props25.crossOrigin,
          videoId = _props25.videoId;


      return _react2.default.createElement(
        'video',
        {
          className: (0, _classnames2.default)('video-react-video', this.props.className),
          id: videoId,
          crossOrigin: crossOrigin,
          ref: function ref(c) {
            _this4.video = c;
          },
          muted: muted,
          preload: preload,
          loop: loop,
          playsInline: playsInline,
          autoPlay: autoPlay,
          poster: poster,
          src: src,
          onLoadStart: this.handleLoadStart,
          onWaiting: this.handleWaiting,
          onCanPlay: this.handleCanPlay,
          onCanPlayThrough: this.handleCanPlayThrough,
          onPlaying: this.handlePlaying,
          onEnded: this.handleEnded,
          onSeeking: this.handleSeeking,
          onSeeked: this.handleSeeked,
          onPlay: this.handlePlay,
          onPause: this.handlePause,
          onProgress: this.handleProgress,
          onDurationChange: this.handleDurationChange,
          onError: this.handleError,
          onSuspend: this.handleSuspend,
          onAbort: this.handleAbort,
          onEmptied: this.handleEmptied,
          onStalled: this.handleStalled,
          onLoadedMetadata: this.handleLoadedMetaData,
          onLoadedData: this.handleLoadedData,
          onTimeUpdate: this.handleTimeUpdate,
          onRateChange: this.handleRateChange,
          onVolumeChange: this.handleVolumeChange
        },
        this.renderChildren()
      );
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this.video.playbackRate;
    }

    // set playback rate
    // speed of video
    ,
    set: function set(rate) {
      this.video.playbackRate = rate;
    }
  }, {
    key: 'muted',
    get: function get() {
      return this.video.muted;
    },
    set: function set(val) {
      this.video.muted = val;
    }
  }, {
    key: 'volume',
    get: function get() {
      return this.video.volume;
    },
    set: function set(val) {
      if (val > 1) {
        val = 1;
      }
      if (val < 0) {
        val = 0;
      }
      this.video.volume = val;
    }

    // video width

  }, {
    key: 'videoWidth',
    get: function get() {
      return this.video.videoWidth;
    }

    // video height

  }, {
    key: 'videoHeight',
    get: function get() {
      return this.video.videoHeight;
    }
  }]);

  return Video;
}(_react.Component);

exports.default = Video;


Video.propTypes = propTypes;
Video.defaultProps = defaultProps;
Video.displayName = 'Video';