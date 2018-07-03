'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Slider = require('../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _PlayProgressBar = require('./PlayProgressBar');

var _PlayProgressBar2 = _interopRequireDefault(_PlayProgressBar);

var _LoadProgressBar = require('./LoadProgressBar');

var _LoadProgressBar2 = _interopRequireDefault(_LoadProgressBar);

var _MouseTimeDisplay = require('./MouseTimeDisplay');

var _MouseTimeDisplay2 = _interopRequireDefault(_MouseTimeDisplay);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  player: _propTypes2.default.object,
  mouseTime: _propTypes2.default.object,
  actions: _propTypes2.default.object,
  className: _propTypes2.default.string
};

var SeekBar = function (_Component) {
  _inherits(SeekBar, _Component);

  function SeekBar(props, context) {
    _classCallCheck(this, SeekBar);

    var _this = _possibleConstructorReturn(this, (SeekBar.__proto__ || Object.getPrototypeOf(SeekBar)).call(this, props, context));

    _this.getPercent = _this.getPercent.bind(_this);
    _this.getNewTime = _this.getNewTime.bind(_this);
    _this.stepForward = _this.stepForward.bind(_this);
    _this.stepBack = _this.stepBack.bind(_this);

    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    return _this;
  }

  _createClass(SeekBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}

    /**
     * Get percentage of video played
     *
     * @return {Number} Percentage played
     * @method getPercent
     */

  }, {
    key: 'getPercent',
    value: function getPercent() {
      var _props$player = this.props.player,
          currentTime = _props$player.currentTime,
          seekingTime = _props$player.seekingTime,
          duration = _props$player.duration;

      var time = seekingTime || currentTime;
      var percent = time / duration;
      return percent >= 1 ? 1 : percent;
    }
  }, {
    key: 'getNewTime',
    value: function getNewTime(event) {
      var duration = this.props.player.duration;

      var distance = this.slider.calculateDistance(event);
      var newTime = distance * duration;

      // Don't let video end while scrubbing.
      return newTime === duration ? newTime - 0.1 : newTime;
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {}
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      var actions = this.props.actions;

      var newTime = this.getNewTime(event);
      // Set new time (tell video to seek to new time)
      actions.seek(newTime);
      actions.handleEndSeeking(newTime);
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      var actions = this.props.actions;

      var newTime = this.getNewTime(event);
      actions.handleSeekingTime(newTime);
    }
  }, {
    key: 'stepForward',
    value: function stepForward() {
      var actions = this.props.actions;

      actions.forward(5);
    }
  }, {
    key: 'stepBack',
    value: function stepBack() {
      var actions = this.props.actions;

      actions.replay(5);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$player2 = _props.player,
          currentTime = _props$player2.currentTime,
          seekingTime = _props$player2.seekingTime,
          duration = _props$player2.duration,
          buffered = _props$player2.buffered,
          mouseTime = _props.mouseTime;

      var time = seekingTime || currentTime;

      return _react2.default.createElement(
        _Slider2.default,
        {
          ref: function ref(input) {
            _this2.slider = input;
          },
          label: 'video progress bar',
          className: (0, _classnames2.default)('video-react-progress-holder', this.props.className),
          valuenow: (this.getPercent() * 100).toFixed(2),
          valuetext: (0, _utils.formatTime)(time, duration),
          onMouseDown: this.handleMouseDown,
          onMouseMove: this.handleMouseMove,
          onMouseUp: this.handleMouseUp,
          getPercent: this.getPercent,
          stepForward: this.stepForward,
          stepBack: this.stepBack
        },
        _react2.default.createElement(_LoadProgressBar2.default, {
          buffered: buffered,
          currentTime: time,
          duration: duration
        }),
        _react2.default.createElement(_MouseTimeDisplay2.default, {
          duration: duration,
          mouseTime: mouseTime
        }),
        _react2.default.createElement(_PlayProgressBar2.default, {
          currentTime: time,
          duration: duration
        })
      );
    }
  }]);

  return SeekBar;
}(_react.Component);

exports.default = SeekBar;


SeekBar.propTypes = propTypes;
SeekBar.displayName = 'SeekBar';