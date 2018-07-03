'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  player: _propTypes2.default.object,
  className: _propTypes2.default.string
};

function RemainingTimeDisplay(_ref) {
  var _ref$player = _ref.player,
      currentTime = _ref$player.currentTime,
      duration = _ref$player.duration,
      className = _ref.className;

  var remainingTime = duration - currentTime;
  var formattedTime = (0, _utils.formatTime)(remainingTime);
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)('video-react-remaining-time video-react-time-control video-react-control', className)
    },
    _react2.default.createElement(
      'div',
      {
        className: 'video-react-remaining-time-display',
        'aria-live': 'off'
      },
      _react2.default.createElement(
        'span',
        { className: 'video-react-control-text' },
        'Remaining Time '
      ),
      '-',
      formattedTime
    )
  );
}

RemainingTimeDisplay.propTypes = propTypes;
RemainingTimeDisplay.displayName = 'RemainingTimeDisplay';

exports.default = RemainingTimeDisplay;