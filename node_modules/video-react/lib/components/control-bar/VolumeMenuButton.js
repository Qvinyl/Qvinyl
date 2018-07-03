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

var _PopupButton = require('../popup/PopupButton');

var _PopupButton2 = _interopRequireDefault(_PopupButton);

var _VolumeBar = require('../volume-control/VolumeBar');

var _VolumeBar2 = _interopRequireDefault(_VolumeBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  player: _propTypes2.default.object,
  actions: _propTypes2.default.object,
  vertical: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  alwaysShowVolume: _propTypes2.default.bool
};

var defaultProps = {
  vertical: false
};

var VolumeMenuButton = function (_Component) {
  _inherits(VolumeMenuButton, _Component);

  function VolumeMenuButton(props, context) {
    _classCallCheck(this, VolumeMenuButton);

    var _this = _possibleConstructorReturn(this, (VolumeMenuButton.__proto__ || Object.getPrototypeOf(VolumeMenuButton)).call(this, props, context));

    _this.state = {
      active: false
    };

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    return _this;
  }

  _createClass(VolumeMenuButton, [{
    key: 'handleClick',
    value: function handleClick() {
      var _props = this.props,
          player = _props.player,
          actions = _props.actions;

      actions.mute(!player.muted);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.setState({
        active: true
      });
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.setState({
        active: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          vertical = _props2.vertical,
          player = _props2.player,
          className = _props2.className;

      var inline = !vertical;
      var level = this.volumeLevel;
      return _react2.default.createElement(
        _PopupButton2.default,
        {
          className: (0, _classnames2.default)(className, {
            'video-react-volume-menu-button-vertical': vertical,
            'video-react-volume-menu-button-horizontal': !vertical,
            'video-react-vol-muted': player.muted,
            'video-react-vol-0': level === 0 && !player.muted,
            'video-react-vol-1': level === 1,
            'video-react-vol-2': level === 2,
            'video-react-vol-3': level === 3,
            'video-react-slider-active': this.props.alwaysShowVolume || this.state.active,
            'video-react-lock-showing': this.props.alwaysShowVolume || this.state.active
          }, 'video-react-volume-menu-button'),
          onClick: this.handleClick,
          inline: inline
        },
        _react2.default.createElement(_VolumeBar2.default, _extends({
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }, this.props))
      );
    }
  }, {
    key: 'volumeLevel',
    get: function get() {
      var _props$player = this.props.player,
          volume = _props$player.volume,
          muted = _props$player.muted;

      var level = 3;
      if (volume === 0 || muted) {
        level = 0;
      } else if (volume < 0.33) {
        level = 1;
      } else if (volume < 0.67) {
        level = 2;
      }
      return level;
    }
  }]);

  return VolumeMenuButton;
}(_react.Component);

VolumeMenuButton.propTypes = propTypes;
VolumeMenuButton.defaultProps = defaultProps;
VolumeMenuButton.displayName = 'VolumeMenuButton';
exports.default = VolumeMenuButton;