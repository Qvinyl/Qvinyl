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

function DurationDisplay(_ref) {
  var duration = _ref.player.duration,
      className = _ref.className;

  var formattedTime = (0, _utils.formatTime)(duration);
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(className, 'video-react-duration video-react-time-control video-react-control')
    },
    _react2.default.createElement(
      'div',
      {
        className: 'video-react-duration-display',
        'aria-live': 'off'
      },
      _react2.default.createElement(
        'span',
        { className: 'video-react-control-text' },
        'Duration Time '
      ),
      formattedTime
    )
  );
}

DurationDisplay.propTypes = propTypes;
DurationDisplay.displayName = 'DurationDisplay';

exports.default = DurationDisplay;