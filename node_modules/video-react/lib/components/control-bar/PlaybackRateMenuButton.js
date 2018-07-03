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

var _MenuButton = require('../menu/MenuButton');

var _MenuButton2 = _interopRequireDefault(_MenuButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  player: _propTypes2.default.object,
  actions: _propTypes2.default.object,
  rates: _propTypes2.default.array,
  className: _propTypes2.default.string
};

var defaultProps = {
  rates: [2, 1.5, 1.25, 1, 0.5, 0.25]
};

var PlaybackRateMenuButton = function (_Component) {
  _inherits(PlaybackRateMenuButton, _Component);

  function PlaybackRateMenuButton(props, context) {
    _classCallCheck(this, PlaybackRateMenuButton);

    var _this = _possibleConstructorReturn(this, (PlaybackRateMenuButton.__proto__ || Object.getPrototypeOf(PlaybackRateMenuButton)).call(this, props, context));

    _this.handleSelectItem = _this.handleSelectItem.bind(_this);
    return _this;
  }

  _createClass(PlaybackRateMenuButton, [{
    key: 'handleSelectItem',
    value: function handleSelectItem(index) {
      var _props = this.props,
          rates = _props.rates,
          actions = _props.actions;

      if (index >= 0 && index < rates.length) {
        actions.changeRate(rates[index]);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          rates = _props2.rates,
          player = _props2.player;

      var items = rates.map(function (rate) {
        return {
          label: rate + 'x',
          value: rate
        };
      });
      var selectedIndex = rates.indexOf(player.playbackRate) || 0;

      return _react2.default.createElement(
        _MenuButton2.default,
        {
          className: (0, _classnames2.default)('video-react-playback-rate', this.props.className),
          onSelectItem: this.handleSelectItem,
          items: items,
          selectedIndex: selectedIndex
        },
        _react2.default.createElement(
          'span',
          { className: 'video-react-control-text' },
          'Playback Rate'
        ),
        _react2.default.createElement(
          'div',
          { className: 'video-react-playback-rate-value' },
          player.playbackRate.toFixed(2),
          'x'
        )
      );
    }
  }]);

  return PlaybackRateMenuButton;
}(_react.Component);

PlaybackRateMenuButton.propTypes = propTypes;
PlaybackRateMenuButton.defaultProps = defaultProps;
PlaybackRateMenuButton.displayName = 'PlaybackRateMenuButton';
exports.default = PlaybackRateMenuButton;