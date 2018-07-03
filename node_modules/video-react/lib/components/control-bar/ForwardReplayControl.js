'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  actions: _propTypes2.default.object,
  className: _propTypes2.default.string,
  seconds: _propTypes2.default.oneOf([5, 10, 30])
};

var defaultProps = {
  seconds: 10
};

exports.default = function (mode) {
  var ForwardReplayControl = function (_Component) {
    _inherits(ForwardReplayControl, _Component);

    function ForwardReplayControl(props, context) {
      _classCallCheck(this, ForwardReplayControl);

      var _this = _possibleConstructorReturn(this, (ForwardReplayControl.__proto__ || Object.getPrototypeOf(ForwardReplayControl)).call(this, props, context));

      _this.handleClick = _this.handleClick.bind(_this);
      return _this;
    }

    _createClass(ForwardReplayControl, [{
      key: 'handleClick',
      value: function handleClick() {
        var _props = this.props,
            actions = _props.actions,
            seconds = _props.seconds;
        // Depends mode to implement different actions

        if (mode === 'forward') {
          actions.forward(seconds);
        } else {
          actions.replay(seconds);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props2 = this.props,
            seconds = _props2.seconds,
            className = _props2.className;

        var classNames = ['video-react-control', 'video-react-button', 'video-react-icon'];
        classNames.push('video-react-icon-' + mode + '-' + seconds, 'video-react-' + mode + '-control');
        if (this.props.className) {
          classNames.push(this.props.className);
        }
        return _react2.default.createElement(
          'button',
          {
            ref: function ref(c) {
              _this2.button = c;
            },
            className: classNames.join(' '),
            type: 'button',
            onClick: this.handleClick
          },
          _react2.default.createElement(
            'span',
            { className: 'video-react-control-text' },
            mode + ' ' + seconds + ' seconds'
          )
        );
      }
    }]);

    return ForwardReplayControl;
  }(_react.Component);

  ForwardReplayControl.propTypes = propTypes;
  ForwardReplayControl.defaultProps = defaultProps;
  return ForwardReplayControl;
};