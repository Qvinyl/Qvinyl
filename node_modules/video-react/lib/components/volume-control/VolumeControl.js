'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VolumeControl;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _VolumeBar = require('./VolumeBar');

var _VolumeBar2 = _interopRequireDefault(_VolumeBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string
};

function VolumeControl(_ref) {
  var className = _ref.className;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(className, 'video-react-volume-control video-react-control')
    },
    _react2.default.createElement(_VolumeBar2.default, this.props)
  );
}

VolumeControl.propTypes = propTypes;
VolumeControl.displayName = 'VolumeControl';