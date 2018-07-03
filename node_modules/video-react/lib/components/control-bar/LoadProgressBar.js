'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoadProgressBar;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  duration: _propTypes2.default.number,
  buffered: _propTypes2.default.object,
  className: _propTypes2.default.string
};

// Shows load progress
function LoadProgressBar(_ref) {
  var buffered = _ref.buffered,
      duration = _ref.duration,
      className = _ref.className;

  if (!buffered || !buffered.length) {
    return null;
  }
  var bufferedEnd = buffered.end(buffered.length - 1);
  var style = {};

  if (bufferedEnd > duration) {
    bufferedEnd = duration;
  }

  // get the percent width of a time compared to the total end
  function percentify(time, end) {
    var percent = time / end || 0; // no NaN
    return (percent >= 1 ? 1 : percent) * 100 + '%';
  }

  // the width of the progress bar
  style.width = percentify(bufferedEnd, duration);

  var parts = [];

  // add child elements to represent the individual buffered time ranges
  for (var i = 0; i < buffered.length; i++) {
    var start = buffered.start(i);
    var end = buffered.end(i);
    // set the percent based on the width of the progress bar (bufferedEnd)
    var part = _react2.default.createElement('div', {
      style: {
        left: percentify(start, bufferedEnd),
        width: percentify(end - start, bufferedEnd)
      },
      key: 'part-' + i
    });
    parts.push(part);
  }

  if (parts.length === 0) {
    parts = null;
  }

  return _react2.default.createElement(
    'div',
    {
      style: style,
      className: (0, _classnames2.default)('video-react-load-progress', className)
    },
    _react2.default.createElement(
      'span',
      { className: 'video-react-control-text' },
      _react2.default.createElement(
        'span',
        null,
        'Loaded'
      ),
      ': 0%'
    ),
    parts
  );
}

LoadProgressBar.propTypes = propTypes;
LoadProgressBar.displayName = 'LoadProgressBar';