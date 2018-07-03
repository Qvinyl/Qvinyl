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

function MouseTimeDisplay(_ref) {
  var duration = _ref.duration,
      mouseTime = _ref.mouseTime,
      className = _ref.className,
      text = _ref.text;

  if (!mouseTime.time) {
    return null;
  }

  var time = text || (0, _utils.formatTime)(mouseTime.time, duration);

  return _react2.default.createElement('div', {
    className: (0, _classnames2.default)('video-react-mouse-display', className),
    style: {
      left: mouseTime.position + 'px'
    },
    'data-current-time': time
  });
}

MouseTimeDisplay.propTypes = {
  duration: _propTypes2.default.number,
  mouseTime: _propTypes2.default.object,
  className: _propTypes2.default.string
};
MouseTimeDisplay.displayName = 'MouseTimeDisplay';

exports.default = MouseTimeDisplay;