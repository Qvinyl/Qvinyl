'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PopupButton;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClickableComponent = require('../ClickableComponent');

var _ClickableComponent2 = _interopRequireDefault(_ClickableComponent);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  inline: _propTypes2.default.bool,
  onClick: _propTypes2.default.func.isRequired,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  className: _propTypes2.default.string
};

var defaultProps = {
  inline: true
};

function PopupButton(props) {
  var inline = props.inline,
      className = props.className;

  var ps = _extends({}, props);
  delete ps.children;
  delete ps.inline;
  delete ps.className;
  return _react2.default.createElement(
    _ClickableComponent2.default,
    _extends({
      className: (0, _classnames2.default)(className, {
        'video-react-menu-button-inline': !!inline,
        'video-react-menu-button-popup': !inline
      }, 'video-react-control video-react-button video-react-menu-button')
    }, ps),
    _react2.default.createElement(_Popup2.default, props)
  );
}

PopupButton.propTypes = propTypes;
PopupButton.defaultProps = defaultProps;
PopupButton.displayName = 'PopupButton';