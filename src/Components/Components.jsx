import React from "react";

export default class Draggable extends React.Component {
  state = {
    isDragging: false,

    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0,
  };

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;

    if (!isDragging) {
      return;
    }

    this.setState((prevState) => ({
      translateX: clientX - prevState.originalX + prevState.lastTranslateX,
      translateY: clientY - prevState.originalY + prevState.lastTranslateY,
    }));
  };

  componentDidMount() {
    this.setState((state, props) => ({
      ...state,
      ...props.state,
    }));
  }

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    this.setState({
      originalX: 0,
      originalY: 0,
      lastTranslateX: this.state.translateX,
      lastTranslateY: this.state.translateY,
      isDragging: false,
    });
    this.props.onChange(this.props.id, {
      ...this.props.state,
      originalX: 0,
      originalY: 0,
      lastTranslateX: this.state.translateX,
      lastTranslateY: this.state.translateY,
      translateX: this.state.translateX,
      translateY: this.state.translateY,
      isDragging: false,
    });
  };

  render() {
    const { type } = this.props;
    const { translateX, translateY, isDragging } = this.state;
    const styles = !isDragging
      ? { cursor: "grab" }
      : { opacity: 0.8, cursor: "grabbing" };

    if (type === "TextArea") {
      return (
        <textarea
          onMouseDown={this.handleMouseDown}
          style={{
            ...styles,
            transform: `translate(${translateX}px, ${translateY}px)`,
          }}
        ></textarea>
      );
    }

    if (type === "Heading") {
      return (
        <h1
          onMouseDown={this.handleMouseDown}
          className={"heading"}
          style={{
            ...styles,
            transform: `translate(${translateX}px, ${translateY}px)`,
          }}
        >
          Heading
        </h1>
      );
    }

    if (type === "Button") {
      return (
        <button
          onMouseDown={this.handleMouseDown}
          className={"btn-1"}
          style={{
            ...styles,
            transform: `translate(${translateX}px, ${translateY}px)`,
          }}
        >
          Button
        </button>
      );
    }
  }
}
