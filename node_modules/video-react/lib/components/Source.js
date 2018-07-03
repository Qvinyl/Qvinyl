'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Source;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  src: _propTypes2.default.string.isRequired,
  media: _propTypes2.default.string,
  type: _propTypes2.default.string
};

function Source(props) {
  var src = props.src,
      media = props.media,
      type = props.type;


  return _react2.default.createElement('source', {
    src: src,
    media: media,
    type: type
  });
}

Source.propTypes = propTypes;
Source.displayName = 'Source';