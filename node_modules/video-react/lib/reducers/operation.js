'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.operation = operation;

var _player = require('../actions/player');

var initialState = {
  count: 0,
  operation: {
    action: '',
    source: ''
  }
};

function operation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _player.OPERATE:
      return _extends({}, state, {
        count: state.count + 1,
        operation: _extends({}, state.operation, action.operation)
      });
    default:
      return state;
  }
}

exports.default = operation;