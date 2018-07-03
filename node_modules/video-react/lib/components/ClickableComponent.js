'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  tagName: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  className: _propTypes2.default.string
};

var defaultProps = {
  tagName: 'div'
};

var ClickableComponent = function (_Component) {
  _inherits(ClickableComponent, _Component);

  function ClickableComponent(props, context) {
    _classCallCheck(this, ClickableComponent);

    var _this = _possibleConstructorReturn(this, (ClickableComponent.__proto__ || Object.getPrototypeOf(ClickableComponent)).call(this, props, context));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleKeypress = _this.handleKeypress.bind(_this);
    return _this;
  }

  _createClass(ClickableComponent, [{
    key: 'handleKeypress',
    value: function handleKeypress(event) {
      // Support Space (32) or Enter (13) key operation to fire a click event
      if (event.which === 32 || event.which === 13) {
        event.preventDefault();
        this.handleClick(event);
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      var onClick = this.props.onClick;

      onClick(event);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      document.addEventListener('keydown', this.handleKeypress);
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      document.removeEventListener('keydown', this.handleKeypress);
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var Tag = this.props.tagName;
      var props = _extends({}, this.props);
      delete props.tagName;
      delete props.className;
      return _react2.default.createElement(Tag, _extends({
        className: (0, _classnames2.default)(this.props.className),
        role: 'button',
        tabIndex: '0',
        onClick: this.handleClick,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }, props));
    }
  }]);

  return ClickableComponent;
}(_react.Component);

exports.default = ClickableComponent;


ClickableComponent.propTypes = propTypes;
ClickableComponent.defaultProps = defaultProps;
ClickableComponent.displayName = 'ClickableComponent';