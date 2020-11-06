"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _leaflet = _interopRequireDefault(require("leaflet"));

var _reactLeaflet = require("react-leaflet");

var _reactContenteditable = _interopRequireDefault(require("react-contenteditable"));

var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));

require("./EditablePopup.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefix = 'leaflet-popup-button';

var EditablePopup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditablePopup, _React$Component);

  function EditablePopup(props) {
    var _this;

    _classCallCheck(this, EditablePopup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditablePopup).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "parsedChildren", _this.props.children.$$typeof ? _server["default"].renderToStaticMarkup(_this.props.children) : _this.props.children);

    _defineProperty(_assertThisInitialized(_this), "state", {
      editScreenOpen: false,
      inputValue: _this.parsedChildren,
      content: _this.parsedChildren,
      nametag: _this.props.nametag
    });

    _defineProperty(_assertThisInitialized(_this), "openEditScreen", function () {
      _this.setState({
        editScreenOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeEditScreen", function () {
      _this.setState({
        editScreenOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleEdits", function (e) {
      _this.setState({
        inputValue: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveEdits", function () {
      if (_this.props.saveContentCallback) {
        _this.props.saveContentCallback(_this.state.inputValue);
      }

      _this.setState({
        content: _this.state.inputValue
      });

      _this.closeEditScreen();
    });

    _defineProperty(_assertThisInitialized(_this), "cancelEdits", function () {
      _this.setState({
        inputValue: _this.state.content
      });

      _this.closeEditScreen();
    });

    _defineProperty(_assertThisInitialized(_this), "removeSource", function () {
      if (_this.props.removalCallback) {
        _this.props.removalCallback();
      } else {
        if (_this.props.v2) {
          _this.thePopup.leafletElement._source.remove();
        } else {
          _this.thePopup._source.remove();
        }
      }
    });

    var sourceTypes = ['Layer', 'Circle', 'CircleMarker', 'Marker', 'Polyline', 'Polygon', 'ImageOverlay', 'VideoOverlay', 'SVGOverlay', 'Rectangle', 'LayerGroup', 'FeatureGroup', 'GeoJSON'];
    sourceTypes.forEach(function (type) {
      _leaflet["default"][type].include({
        nametag: type.toLowerCase()
      });
    });
    return _this;
  }

  _createClass(EditablePopup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.open) {
        setTimeout(function () {
          if (_this2.props.v2) {
            _this2.thePopup.leafletElement._source.openPopup();
          } else {
            _this2.thePopup._source.openPopup();
          }
        }, 1);
      }

      if (this.props.v2) {
        this.setState({
          nametag: this.props.nametag || this.thePopup.leafletElement._source.nametag
        });
      } else {
        this.setState({
          nametag: this.props.nametag || this.thePopup._source.nametag
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var Buttons;

      if (this.props.removable && !this.props.editable) {
        Buttons =
        /*#__PURE__*/
        _react["default"].createElement("div", {
          className: "leaflet-popup-useraction-buttons"
        },
        /*#__PURE__*/
        _react["default"].createElement("button", {
          className: "".concat(prefix, " remove"),
          onClick: this.removeSource
        }, "Remove this ", this.state.nametag));
      } else if (!this.props.removable && this.props.editable) {
        Buttons =
        /*#__PURE__*/
        _react["default"].createElement("div", {
          className: "leaflet-popup-useraction-buttons"
        },
        /*#__PURE__*/
        _react["default"].createElement("button", {
          className: "".concat(prefix, " edit"),
          onClick: this.openEditScreen
        }, "Edit"));
      } else if (this.props.removable && this.props.editable) {
        Buttons =
        /*#__PURE__*/
        _react["default"].createElement("div", {
          className: "leaflet-popup-useraction-buttons"
        },
        /*#__PURE__*/
        _react["default"].createElement("button", {
          className: "".concat(prefix, " remove"),
          onClick: this.removeSource
        }, "Remove this ", this.state.nametag),
        /*#__PURE__*/
        _react["default"].createElement("button", {
          onClick: this.openEditScreen,
          className: "".concat(prefix, " edit")
        }, "Edit"));
      }

      var contentScreen =
      /*#__PURE__*/
      _react["default"].createElement(_react["default"].Fragment, null, (0, _htmlReactParser["default"])(this.state.content), Buttons);

      var editScreen =
      /*#__PURE__*/
      _react["default"].createElement(_react["default"].Fragment, null,
      /*#__PURE__*/
      _react["default"].createElement(_reactContenteditable["default"], {
        className: "leaflet-popup-input",
        html: this.state.inputValue,
        ref: "editableDiv",
        onChange: this.handleEdits
      }),
      /*#__PURE__*/
      _react["default"].createElement("div", {
        className: "leaflet-popup-useraction-buttons"
      },
      /*#__PURE__*/
      _react["default"].createElement("button", {
        className: "".concat(prefix, " cancel"),
        onClick: this.cancelEdits
      }, "Cancel"),
      /*#__PURE__*/
      _react["default"].createElement("button", {
        className: "".concat(prefix, " save"),
        onClick: this.saveEdits
      }, "Save")));

      return (
        /*#__PURE__*/
        _react["default"].createElement(_reactLeaflet.Popup, _extends({}, this.props, {
          open: this.state.open,
          ref: function ref(thePopup) {
            return _this3.thePopup = thePopup;
          },
          minWidth: "160"
        }), this.state.editScreenOpen ? editScreen : contentScreen)
      );
    }
  }]);

  return EditablePopup;
}(_react["default"].Component);

var _default = EditablePopup;
exports["default"] = _default;