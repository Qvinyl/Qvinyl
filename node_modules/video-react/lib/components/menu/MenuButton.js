'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('./MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _ClickableComponent = require('../ClickableComponent');

var _ClickableComponent2 = _interopRequireDefault(_ClickableComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  inline: _propTypes2.default.bool,
  items: _propTypes2.default.array,
  className: _propTypes2.default.string,
  onSelectItem: _propTypes2.default.func,
  children: _propTypes2.default.any,
  selectedIndex: _propTypes2.default.number
};

var MenuButton = function (_Component) {
  _inherits(MenuButton, _Component);

  function MenuButton(props, context) {
    _classCallCheck(this, MenuButton);

    var _this = _possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).call(this, props, context));

    _this.state = {
      active: false,
      activateIndex: props.selectedIndex || 0
    };

    _this.commitSelection = _this.commitSelection.bind(_this);
    _this.activateMenuItem = _this.activateMenuItem.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.renderMenu = _this.renderMenu.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleUpArrow = _this.handleUpArrow.bind(_this);
    _this.handleDownArrow = _this.handleDownArrow.bind(_this);
    _this.handleEscape = _this.handleEscape.bind(_this);
    _this.handleReturn = _this.handleReturn.bind(_this);
    _this.handleTab = _this.handleTab.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.handleSelectItem = _this.handleSelectItem.bind(_this);
    _this.handleIndexChange = _this.handleIndexChange.bind(_this);
    return _this;
  }

  // componentDidUpdate(prevProps) {
  // }

  _createClass(MenuButton, [{
    key: 'commitSelection',
    value: function commitSelection(index) {
      this.setState({
        activateIndex: index,
        active: false
      });
      this.handleIndexChange(index);
    }
  }, {
    key: 'activateMenuItem',
    value: function activateMenuItem(index) {
      this.setState({
        activateIndex: index
      });
      this.handleIndexChange(index);
    }
  }, {
    key: 'handleIndexChange',
    value: function handleIndexChange(index) {
      var onSelectItem = this.props.onSelectItem;

      onSelectItem(index);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.setState({
        active: !this.state.active
      });
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.setState({
        active: false
      });
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'handleUpArrow',
    value: function handleUpArrow(e) {
      var items = this.props.items;

      if (this.state.active) {
        e.preventDefault();
        var newIndex = this.state.activateIndex - 1;
        if (newIndex < 0) {
          newIndex = items.length ? items.length - 1 : 0;
        }
        this.activateMenuItem(newIndex);
      }
    }
  }, {
    key: 'handleDownArrow',
    value: function handleDownArrow(e) {
      var items = this.props.items;

      if (this.state.active) {
        e.preventDefault();
        var newIndex = this.state.activateIndex + 1;
        if (newIndex >= items.length) {
          newIndex = 0;
        }
        this.activateMenuItem(newIndex);
      }
    }
  }, {
    key: 'handleTab',
    value: function handleTab(e) {
      if (this.state.active) {
        e.preventDefault();
        this.commitSelection(this.state.activateIndex);
      }
    }
  }, {
    key: 'handleReturn',
    value: function handleReturn(e) {
      e.preventDefault();
      if (this.state.active) {
        this.commitSelection(this.state.activateIndex);
      } else {
        this.setState({
          active: true
        });
      }
    }
  }, {
    key: 'handleEscape',
    value: function handleEscape() {
      this.setState({
        active: false,
        activateIndex: 0
      });
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {
      // Escape (27) key
      if (event.which === 27) {
        this.handleEscape(event);
      } else if (event.which === 9) {
        // Tab (9) key
        this.handleTab(event);
      } else if (event.which === 13) {
        // Enter (13) key
        this.handleReturn(event);
      } else if (event.which === 38) {
        // Up (38) key
        this.handleUpArrow(event);
      } else if (event.which === 40) {
        // Down (40) key press
        this.handleDownArrow(event);
      }
    }
  }, {
    key: 'handleSelectItem',
    value: function handleSelectItem(i) {
      this.commitSelection(i);
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this2 = this;

      if (!this.state.active) {
        return null;
      }

      var items = this.props.items;

      return _react2.default.createElement(
        _Menu2.default,
        null,
        items.map(function (item, i) {
          return _react2.default.createElement(_MenuItem2.default, {
            item: item,
            index: i,
            onSelectItem: _this2.handleSelectItem,
            activateIndex: _this2.state.activateIndex,
            key: 'item-' + i++
          });
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          inline = _props.inline,
          className = _props.className;


      return _react2.default.createElement(
        _ClickableComponent2.default,
        {
          className: (0, _classnames2.default)(className, {
            'video-react-menu-button-inline': !!inline,
            'video-react-menu-button-popup': !inline,
            'video-react-menu-button-active': this.state.active
          }, 'video-react-control video-react-button video-react-menu-button'),
          role: 'presentation',
          tabIndex: '0',
          ref: function ref(c) {
            _this3.menuButton = c;
          },
          onClick: this.handleClick,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        },
        this.props.children,
        this.renderMenu()
      );
    }
  }]);

  return MenuButton;
}(_react.Component);

exports.default = MenuButton;


MenuButton.propTypes = propTypes;
MenuButton.displayName = 'MenuButton';