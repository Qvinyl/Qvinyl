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

var _Slider = require('../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _VolumeLevel = require('./VolumeLevel');

var _VolumeLevel2 = _interopRequireDefault(_VolumeLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  actions: _propTypes2.default.object,
  player: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
};

var VolumeBar = function (_Component) {
  _inherits(VolumeBar, _Component);

  function VolumeBar(props, context) {
    _classCallCheck(this, VolumeBar);

    var _this = _possibleConstructorReturn(this, (VolumeBar.__proto__ || Object.getPrototypeOf(VolumeBar)).call(this, props, context));

    _this.state = {
      percentage: '0%'
    };

    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handlePercentageChange = _this.handlePercentageChange.bind(_this);
    _this.checkMuted = _this.checkMuted.bind(_this);
    _this.getPercent = _this.getPercent.bind(_this);
    _this.stepForward = _this.stepForward.bind(_this);
    _this.stepBack = _this.stepBack.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(VolumeBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'getPercent',
    value: function getPercent() {
      var player = this.props.player;

      if (player.muted) {
        return 0;
      }
      return player.volume;
    }
  }, {
    key: 'checkMuted',
    value: function checkMuted() {
      var _props = this.props,
          player = _props.player,
          actions = _props.actions;

      if (player.muted) {
        actions.mute(false);
      }
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      var actions = this.props.actions;

      this.checkMuted();
      var distance = this.slider.calculateDistance(event);
      actions.changeVolume(distance);
    }
  }, {
    key: 'stepForward',
    value: function stepForward() {
      var _props2 = this.props,
          player = _props2.player,
          actions = _props2.actions;

      this.checkMuted();
      actions.changeVolume(player.volume + 0.1);
    }
  }, {
    key: 'stepBack',
    value: function stepBack() {
      var _props3 = this.props,
          player = _props3.player,
          actions = _props3.actions;

      this.checkMuted();
      actions.changeVolume(player.volume - 0.1);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: 'handlePercentageChange',
    value: function handlePercentageChange(percentage) {
      if (percentage !== this.state.percentage) {
        this.setState({
          percentage: percentage
        });
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          player = _props4.player,
          className = _props4.className;


      var volume = (player.volume * 100).toFixed(2);
      return _react2.default.createElement(
        _Slider2.default,
        _extends({
          ref: function ref(c) {
            _this2.slider = c;
          },
          label: 'volume level',
          valuenow: volume,
          valuetext: volume + '%',
          onMouseMove: this.handleMouseMove,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onClick: this.handleClick,
          sliderActive: this.handleFocus,
          sliderInactive: this.handleBlur,
          getPercent: this.getPercent,
          onPercentageChange: this.handlePercentageChange,
          stepForward: this.stepForward,
          stepBack: this.stepBack
        }, this.props, {
          className: (0, _classnames2.default)(className, 'video-react-volume-bar video-react-slider-bar')
        }),
        _react2.default.createElement(_VolumeLevel2.default, this.props)
      );
    }
  }]);

  return VolumeBar;
}(_react.Component);

VolumeBar.propTypes = propTypes;
VolumeBar.displayName = 'VolumeBar';

exports.default = VolumeBar;