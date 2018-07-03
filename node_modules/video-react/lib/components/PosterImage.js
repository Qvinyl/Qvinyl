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
  poster: _propTypes2.default.string,
  player: _propTypes2.default.object,
  actions: _propTypes2.default.object,
  className: _propTypes2.default.string
};

function PosterImage(_ref) {
  var poster = _ref.poster,
      player = _ref.player,
      actions = _ref.actions,
      className = _ref.className;

  if (!poster || player.hasStarted) {
    return null;
  }

  return _react2.default.createElement('div', {
    className: (0, _classnames2.default)('video-react-poster', className),
    style: {
      backgroundImage: 'url("' + poster + '")'
    },
    onClick: function onClick() {
      if (player.paused) {
        actions.play();
      }
    }
  });
}

PosterImage.propTypes = propTypes;
PosterImage.displayName = 'PosterImage';

exports.default = PosterImage;