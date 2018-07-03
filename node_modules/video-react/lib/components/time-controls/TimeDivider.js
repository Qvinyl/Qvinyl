'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeDivider;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  separator: _propTypes2.default.string,
  className: _propTypes2.default.string
};

function TimeDivider(_ref) {
  var separator = _ref.separator,
      className = _ref.className;

  var separatorText = separator || '/';
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)('video-react-time-control video-react-time-divider', className),
      dir: 'ltr'
    },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        null,
        separatorText
      )
    )
  );
}

TimeDivider.propTypes = propTypes;
TimeDivider.displayName = 'TimeDivider';