import React, {Component} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

const verticalBaseStyle = {
  userSelect: 'none',
  minWidth: '2px',
  maxWidth: '2px',
};

const horizontalBaseStyle = {
  userSelect: 'none',
  minHeight: '2px',
  maxHeight: '2px',
};

class Separator extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['vertical', 'horizontal']),
  }

  static defaultProps = {
    style: {},
    type: 'vertical',
  }

  constructor(props) {
    super(props);

    const baseStyle = props.type === 'vertical'
      ? verticalBaseStyle
      : horizontalBaseStyle;

    const styleByType = {
      cursor: props.type === 'vertical' ? 'col-resize' : 'row-resize',
    };
    this.state = {
      styleByType,
      style: Object.assign({}, baseStyle, styleByType, props.style),
      active: false,
    };
  }

  activate() {
    this.setState({active: true});
  }

  inactivate() {
    this.setState({active: false});
  }

  isActive() {
    return this.state.active;
  }

  isVertical() {
    return this.props.type === 'vertical';
  }

  setPosition() {
    const {left, top} = this.element.getBoundingClientRect();
    this.setState({
      x: Math.round(left),
      y: Math.round(top),
    });
  }

  resetPosition() {
    this.setState({
      x: undefined,
      y: undefined,
    });
  }

  setWidth(element, diff) {
    element.style.minWidth = diff + 'px';
    element.style.maxWidth = diff + 'px';
  }

  setHeight(element, diff) {
    element.style.minHeight = diff + 'px';
    element.style.maxHeight = diff + 'px';
  }

  handleMouseDown = () => {
    this.setPosition();
    this.activate();
  }

  handleMouseUp = () => {
    this.resetPosition();
    this.inactivate();
  }

  handleMouseMove = (() => {
    const proc = throttle((ev) => {
      const prevElement = this.element.previousElementSibling;

      if (this.isVertical()) {
        const {pageX} = ev;
        const diff = this.state.x - Math.round(pageX);

        if (diff > 0 /* move left */) {
          this.setWidth(prevElement, prevElement.clientWidth - diff);
        } else /* move right */ {
          this.setWidth(prevElement, prevElement.clientWidth - diff);
        }
      } else {
        const {pageY} = ev;
        const diff = this.state.y - Math.round(pageY);

        if (diff > 0 /* move top */) {
          this.setHeight(prevElement, prevElement.clientHeight - diff);
        } else /* move down */ {
          this.setHeight(prevElement, prevElement.clientHeight - diff);
        }
      }

      this.setPosition();
    }, 75);

    return ev => {
      ev.persist();
      proc(ev);
    };
  })()


  shouldComponentUpdate(_, nextState) {
    return this.state.active !== nextState.active;
  }

  componentDidMount() {
    if (this.element.previousElementSibling === null) {
      throw new Error('<Separator/> can not be the first element');
    }
  }

  render() {
    const {style, ...otherProps} = this.props;

    return (
      <div
        ref={div => {
          this.element = div;
        }}
        className="Separator"
        style={this.state.style}
        {...otherProps}
        onMouseDown={this.handleMouseDown}
      >
        <div
          style={{
            ...this.state.styleByType,
            display: this.isActive() ? 'block' : 'none',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            left: '0',
            top: '0',
          }}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        />
      </div>
    );
  }
}

export default Separator;
