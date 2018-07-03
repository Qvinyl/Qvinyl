'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dom = require('../utils/dom');

var Dom = _interopRequireWildcard(_dom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  className: _propTypes2.default.string,
  onMouseDown: _propTypes2.default.func,
  onMouseMove: _propTypes2.default.func,
  stepForward: _propTypes2.default.func,
  stepBack: _propTypes2.default.func,
  sliderActive: _propTypes2.default.func,
  sliderInactive: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  getPercent: _propTypes2.default.func,
  vertical: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  label: _propTypes2.default.string,
  valuenow: _propTypes2.default.string,
  valuetext: _propTypes2.default.string
};

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props, context) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props, context));

    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.stepForward = _this.stepForward.bind(_this);
    _this.stepBack = _this.stepBack.bind(_this);
    _this.calculateDistance = _this.calculateDistance.bind(_this);
    _this.getProgress = _this.getProgress.bind(_this);
    _this.renderChildren = _this.renderChildren.bind(_this);

    _this.state = {
      active: false
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'getProgress',
    value: function getProgress() {
      var getPercent = this.props.getPercent;

      if (!getPercent) {
        return 0;
      }
      var progress = getPercent();

      // Protect against no duration and other division issues
      if (typeof progress !== 'number' || progress < 0 || progress === Infinity) {
        progress = 0;
      }
      return progress;
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(event) {
      var onMouseDown = this.props.onMouseDown;
      // event.preventDefault();
      // event.stopPropagation();

      document.addEventListener('mousemove', this.handleMouseMove, true);
      document.addEventListener('mouseup', this.handleMouseUp, true);
      document.addEventListener('touchmove', this.handleMouseMove, true);
      document.addEventListener('touchend', this.handleMouseUp, true);

      this.setState({
        active: true,
        distance: 0
      });

      if (this.props.sliderActive) {
        this.props.sliderActive(event);
      }

      this.handleMouseMove(event);

      if (onMouseDown) {
        onMouseDown(event);
      }
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      var onMouseMove = this.props.onMouseMove;


      if (onMouseMove) {
        onMouseMove(event);
      }
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      var onMouseUp = this.props.onMouseUp;


      document.removeEventListener('mousemove', this.handleMouseMove, true);
      document.removeEventListener('mouseup', this.handleMouseUp, true);
      document.removeEventListener('touchmove', this.handleMouseMove, true);
      document.removeEventListener('touchend', this.handleMouseUp, true);

      this.setState({
        active: false
      });

      if (this.props.sliderInactive) {
        this.props.sliderInactive(event);
      }

      if (onMouseUp) {
        onMouseUp(event);
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      document.addEventListener('keydown', this.handleKeyPress, true);
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      document.removeEventListener('keydown', this.handleKeyPress, true);
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      // event.stopPropagation();
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {
      if (event.which === 37 || event.which === 40) {
        // Left and Down Arrows
        event.preventDefault();
        event.stopPropagation();
        this.stepBack();
      } else if (event.which === 38 || event.which === 39) {
        // Up and Right Arrows
        event.preventDefault();
        event.stopPropagation();
        this.stepForward();
      }
    }
  }, {
    key: 'stepForward',
    value: function stepForward() {
      if (this.props.stepForward) {
        this.props.stepForward();
      }
    }
  }, {
    key: 'stepBack',
    value: function stepBack() {
      if (this.props.stepBack) {
        this.props.stepBack();
      }
    }
  }, {
    key: 'calculateDistance',
    value: function calculateDistance(event) {
      var node = (0, _reactDom.findDOMNode)(this);
      var position = Dom.getPointerPosition(node, event);
      if (this.props.vertical) {
        return position.y;
      }
      return position.x;
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var progress = this.getProgress();
      var percentage = (progress * 100).toFixed(2) + '%';
      return _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.cloneElement(child, { progress: progress, percentage: percentage });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          vertical = _props.vertical,
          label = _props.label,
          valuenow = _props.valuenow,
          valuetext = _props.valuetext;


      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(this.props.className, {
            'video-react-slider-vertical': vertical,
            'video-react-slider-horizontal': !vertical,
            'video-react-sliding': this.state.active
          }, 'video-react-slider'),
          tabIndex: '0',
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleMouseDown,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onClick: this.handleClick,
          'aria-label': label || '',
          'aria-valuenow': valuenow || '',
          'aria-valuetext': valuetext || '',
          'aria-valuemin': 0,
          'aria-valuemax': 100
        },
        this.renderChildren()
      );
    }
  }]);

  return Slider;
}(_react.Component);

exports.default = Slider;


Slider.propTypes = propTypes;
Slider.displayName = 'Slider';