'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PlaybackRateMenuButton = require('./PlaybackRateMenuButton');

var _PlaybackRateMenuButton2 = _interopRequireDefault(_PlaybackRateMenuButton);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlaybackRate = function (_Component) {
  _inherits(PlaybackRate, _Component);

  function PlaybackRate(props, context) {
    _classCallCheck(this, PlaybackRate);

    var _this = _possibleConstructorReturn(this, (PlaybackRate.__proto__ || Object.getPrototypeOf(PlaybackRate)).call(this, props, context));

    (0, _utils.deprecatedWarning)('PlaybackRate', 'PlaybackRateMenuButton');
    return _this;
  }

  _createClass(PlaybackRate, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_PlaybackRateMenuButton2.default, this.props);
    }
  }]);

  return PlaybackRate;
}(_react.Component);

exports.default = PlaybackRate;


PlaybackRate.displayName = 'PlaybackRate';