'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./index.less");
var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PropTypes = require('prop-types');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _triggerM = require('r-trigger');

var _triggerM2 = _interopRequireDefault(_triggerM);

var _util = require('m-base/js/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * balloon
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 弹出框
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <Balloon content="我是内容~~">点我~</Balloon>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @props {string} content
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @props {string} placement 'bottomLeft'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @props {func} onVisibleChange
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * 计算浮层的位置
 * @param origin 目标坐标/大小
 * @param box   浮层大小
 * @param placement   坐标相对信息
 * @returns {object} {top: xxx, left: xxx}
 */
var calcPos = function calcPos(origin, box, placement) {
    var top = origin.top,
        left = origin.left;

    // 计算top值
    switch (placement) {
        case 'top':
        case 'topLeft':
        case 'topRight':
            top -= box.height;
            break;

        case 'bottom':
        case 'bottomLeft':
        case 'bottomRight':
            top += origin.height;
            break;

        case 'leftBottom':
        case 'rightBottom':
            top += origin.height - box.height;
            break;

        case 'left':
        case 'right':
            top += (origin.height - box.height) / 2;
            break;
        default:
            break;
    }

    // 计算left值
    switch (placement) {
        case 'left':
        case 'leftTop':
        case 'leftBottom':
            left -= box.width;
            break;

        case 'right':
        case 'rightTop':
        case 'rightBottom':
            left += origin.width;
            break;

        case 'topRight':
        case 'bottomRight':
            left += origin.width - box.width;
            break;

        case 'top':
        case 'bottom':
            left += (origin.width - box.width) / 2;
            break;
        default:
            break;
    }

    return { left: left, top: top };
};

var PREFIX = 'balloon';

var Balloon = function (_React$Component) {
    _inherits(Balloon, _React$Component);

    function Balloon(props) {
        _classCallCheck(this, Balloon);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Balloon).call(this, props));

        _this.state = {
            visible: false
        };

        _this.popupId = _util2.default.createComponentId();

        // bind function scope
        _this.renderPopContent = _this.renderPopContent.bind(_this);
        _this.position = _this.position.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleOuterClick = _this.handleOuterClick.bind(_this);
        return _this;
    }

    _createClass(Balloon, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this2 = this;

            // 只有当状态改变时才渲染popup节点
            var flag = this.state.visible !== prevState.visible || this.props.visible !== prevProps.visible;
            flag && this.renderPopContent();
            if (!this.popup_container) return;
            var popupNode = this.popup_container.childNodes[0];
            popupNode.style.opacity = 0;
            setTimeout(function () {
                _this2.position(popupNode);
            });

            // 如果通过父容器改变了visible,会导致与state中的不一致,则同步变量的值
            if ('visible' in this.props && this.props.visible !== this.state.visible) {
                this.state.visible = this.props.visible;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            try {
                this.popup_container.removeChild(document.getElementById(this.popupId));
            } catch (e) {
                console.warn('Maybe something wrong about this?', e);
            }
        }
    }, {
        key: 'position',
        value: function position(popupNode) {
            var visible = 'visible' in this.props ? this.props.visible : this.state.visible;
            if (!visible) return;

            // 获取元素的位置
            // 将当前元素将到此位置
            var handler = _reactDom2.default.findDOMNode(this.refs.handlerRef);
            var origin = {
                left: handler.offsetLeft, top: handler.offsetTop - document.querySelector('.m-base-window').scrollTop,
                width: handler.offsetWidth, height: handler.offsetHeight
            };
            var box = {
                width: popupNode.offsetWidth,
                height: popupNode.offsetHeight
            };

            var pos = calcPos(origin, box, this.props.placement);
            popupNode.style.left = pos.left + 'px';
            popupNode.style.top = pos.top + 'px';
            popupNode.style.opacity = 1;
        }
    }, {
        key: 'renderPopContent',
        value: function renderPopContent() {

            var visible = 'visible' in this.props ? this.props.visible : this.state.visible;

            if (!this.popup_container) {
                this.popup_container = document.createElement('div');
                document.body.appendChild(this.popup_container);
            }

            var _props2 = this.props;
            var className = _props2.className;
            var content = _props2.content;
            var placement = _props2.placement;

            var others = _objectWithoutProperties(_props2, ['className', 'content', 'placement']);

            var _props = {};

            _props.className = (0, _classnames2.default)(className, PREFIX + '-container', PREFIX + '-placement-' + placement, {
                'show': visible
            });
            _props.children = content;
            _props.id = this.popupId;

            _reactDom2.default.render(_react2.default.createElement('div', _props), this.popup_container);
        }
    }, {
        key: 'handleOuterClick',
        value: function handleOuterClick(target) {
            //const popupNode = this.popup_container.childNodes[0];
            var visible = 'visible' in this.props ? this.props.visible : this.state.visible;
            if (!visible) return;
            if (this.popup_container && !this.popup_container.contains(target)) {
                this.setState({ visible: false });
                if (typeof this.props.onVisibleChange === 'function') {
                    this.props.onVisibleChange(false);
                }
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            var visible = this.state.visible;
            this.setState({ visible: !visible });

            if (typeof this.props.onVisibleChange === 'function') {
                this.props.onVisibleChange(!visible);
            }
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                _triggerM2.default,
                { bindOuterClick: true, onOuterClick: this.handleOuterClick, ref: 'handlerRef', onClick: this.handleClick },
                this.props.children
            );
        }
    }]);

    return Balloon;
}(_react2.default.Component);

Balloon.propTypes = {

    // balloon的内容,可以是一个字符串,也可以是任意的html内容
    content: _PropTypes2.default.oneOfType([_PropTypes2.object, _PropTypes2.string]).isRequired,

    // balloon的展示位置
    placement: _PropTypes2.default.oneOf(['top', 'bottom', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'rightTop', 'leftBottom', 'rightBottom']),
    // 提供让调用容器直接改变显隐的属性
    visible: _PropTypes2.default.bool,
    onVisibleChange: _PropTypes2.default.func
};

Balloon.defaultProps = {
    placement: 'bottomLeft'
};

exports.default = Balloon;
module.exports = exports['default'];
