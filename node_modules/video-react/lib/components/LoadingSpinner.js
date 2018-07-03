'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoadingSpinner;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _player = require('../actions/player');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  player: _propTypes2.default.object,
  className: _propTypes2.default.string
};

function LoadingSpinner(_ref) {
  var player = _ref.player,
      className = _ref.className;

  if (player.error) {
    return null;
  }
  return _react2.default.createElement('div', {
    className: (0, _classnames2.default)('video-react-loading-spinner', className)
  });
}

LoadingSpinner.propTypes = propTypes;
LoadingSpinner.displayName = 'LoadingSpinner';