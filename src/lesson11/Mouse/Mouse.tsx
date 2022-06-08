import React from "react";

type MouseState = {
  x: number;
  y: number;
};

// Компонент ради ДЗ - подписка и отписка от события
class Mouse extends React.Component<any, MouseState> {
  constructor(props: any) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver(event: MouseEvent) {
    this.setState({ x: event.screenX, y: event.screenY });
  }

  componentDidMount() {
    window.addEventListener("mouseover", this.onMouseOver);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseover", this.onMouseOver);
  }

  shouldComponentUpdate(nextProps: any, nextState: Readonly<MouseState>) {
    //Логика чисто ради ДЗ
    return nextState.x !== this.state.x || nextState.y !== this.state.y;
  }

  render() {
    return (
      <span>
        x: <b data-testid="mouse-x">{this.state.x}</b> y:{" "}
        <b data-testid="mouse-y">{this.state.y}</b>
      </span>
    );
  }
}

export default Mouse;
