'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operationReducer = exports.playerReducer = undefined;

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  return {
    player: (0, _player2.default)(state.player, action),
    operation: (0, _operation2.default)(state.operation, action)
  };
};

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _operation = require('./operation');

var _operation2 = _interopRequireDefault(_operation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playerReducer = exports.playerReducer = _player2.default;
var operationReducer = exports.operationReducer = _operation2.default;