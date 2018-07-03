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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  actions: _propTypes2.default.object,
  player: _propTypes2.default.object,
  className: _propTypes2.default.string
};

var FullscreenToggle = function (_Component) {
  _inherits(FullscreenToggle, _Component);

  function FullscreenToggle(props, context) {
    _classCallCheck(this, FullscreenToggle);

    var _this = _possibleConstructorReturn(this, (FullscreenToggle.__proto__ || Object.getPrototypeOf(FullscreenToggle)).call(this, props, context));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(FullscreenToggle, [{
    key: 'handleClick',
    value: function handleClick() {
      var _props = this.props,
          player = _props.player,
          actions = _props.actions;

      actions.toggleFullscreen(player);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          player = _props2.player,
          className = _props2.className;

      return _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)(className, {
            'video-react-icon-fullscreen-exit': player.isFullscreen,
            'video-react-icon-fullscreen': !player.isFullscreen
          }, 'video-react-fullscreen-control video-react-control video-react-button video-react-icon'),
          ref: function ref(c) {
            _this2.button = c;
          },
          type: 'button',
          tabIndex: '0',
          onClick: this.handleClick
        },
        _react2.default.createElement(
          'span',
          { className: 'video-react-control-text' },
          'Non-Fullscreen'
        )
      );
    }
  }]);

  return FullscreenToggle;
}(_react.Component);

exports.default = FullscreenToggle;


FullscreenToggle.propTypes = propTypes;
FullscreenToggle.displayName = 'FullscreenToggle';