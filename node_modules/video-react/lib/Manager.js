'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redux = require('redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _player = require('./actions/player');

var playerActions = _interopRequireWildcard(_player);

var _video = require('./actions/video');

var videoActions = _interopRequireWildcard(_video);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
  function Manager(store) {
    _classCallCheck(this, Manager);

    this.store = store || (0, _redux.createStore)(_reducers2.default);

    this.video = null;
    this.rootElement = null;
  }

  _createClass(Manager, [{
    key: 'getActions',
    value: function getActions() {
      var manager = this;
      var dispatch = this.store.dispatch;

      var actions = _extends({}, playerActions, videoActions);

      function bindActionCreator(actionCreator) {
        return function bindAction() {
          // eslint-disable-next-line prefer-rest-params
          var action = actionCreator.apply(manager, arguments);
          if (typeof action !== 'undefined') {
            dispatch(action);
          }
        };
      }

      return Object.keys(actions).filter(function (key) {
        return typeof actions[key] === 'function';
      }).reduce(function (boundActions, key) {
        boundActions[key] = bindActionCreator(actions[key]);
        return boundActions;
      }, {});
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.store.getState();
    }

    // subscribe state change

  }, {
    key: 'subscribeToStateChange',
    value: function subscribeToStateChange(listener, getState) {
      if (!getState) {
        getState = this.getState.bind(this);
      }

      var prevState = getState();

      var handleChange = function handleChange() {
        var state = getState();
        if (state === prevState) {
          return;
        }
        var prevStateCopy = prevState;
        prevState = state;
        listener(state, prevStateCopy);
      };

      return this.store.subscribe(handleChange);
    }

    // subscribe to operation state change

  }, {
    key: 'subscribeToOperationStateChange',
    value: function subscribeToOperationStateChange(listener) {
      var _this = this;

      return this.subscribeToStateChange(listener, function () {
        return _this.getState().operation;
      });
    }

    // subscribe to player state change

  }, {
    key: 'subscribeToPlayerStateChange',
    value: function subscribeToPlayerStateChange(listener) {
      var _this2 = this;

      return this.subscribeToStateChange(listener, function () {
        return _this2.getState().player;
      });
    }
  }]);

  return Manager;
}();

exports.default = Manager;