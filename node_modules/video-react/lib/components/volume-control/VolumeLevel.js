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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  percentage: _propTypes2.default.string,
  vertical: _propTypes2.default.bool,
  className: _propTypes2.default.string
};

var defaultProps = {
  percentage: '100%',
  vertical: false
};

function VolumeLevel(_ref) {
  var percentage = _ref.percentage,
      vertical = _ref.vertical,
      className = _ref.className;

  var style = {};
  if (vertical) {
    style.height = percentage;
  } else {
    style.width = percentage;
  }

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(className, 'video-react-volume-level'),
      style: style
    },
    _react2.default.createElement('span', { className: 'video-react-control-text' })
  );
}

VolumeLevel.propTypes = propTypes;
VolumeLevel.defaultProps = defaultProps;
VolumeLevel.displayName = 'VolumeLevel';
exports.default = VolumeLevel;