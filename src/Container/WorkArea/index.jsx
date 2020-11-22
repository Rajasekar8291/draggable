import React, { PureComponent } from "react";
import Comp from "../../Components/Components";

const components = [
  { icon: "fa fa-i-cursor ", type: "TextArea" },
  { icon: "fa fa-font", type: "Heading" },
  { icon: "fa fa-square", type: "Button" },
];

const initialState = {
  isDragging: false,
  originalX: 0,
  originalY: 0,
  translateX: 0,
  translateY: 0,
  lastTranslateX: 0,
  lastTranslateY: 0,
};

export class WorkArea extends PureComponent {
  state = {
    data: [],
  };

  componentDidMount() {
    let data = localStorage.getItem("data");
    if (data) {
      this.setState({ data: JSON.parse(data) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("data", JSON.stringify(this.state.data));
  }

  dragOver = (e) => {
    e.preventDefault();
  };

  dragStart = (e) => {
    e.dataTransfer.setData("id", e.target.id);
  };

  drop = async (e) => {
    let { data } = this.state;
    await this.setState({ data: [] });
    let id = e.dataTransfer.getData("id");
    data.push({ type: id, state: initialState });
    await this.setState({ data: data });
    await this.setState({ data: data });
  };

  change = async (id, state) => {
    let { data } = this.state;
    await this.setState({ data: [], type: false });
    data[id].state = state;
    console.log(data);
    await this.setState({ data: data });
  };

  onClear = () => {
    this.setState({ data: [] });
  };

  render() {
    return (
      <div className={"comps"}>
        <div className={"comp"}>
          {components.map((item, i) => (
            <div
              key={i}
              id={item.type}
              className={"comp-item"}
              draggable={true}
              onDragStart={this.dragStart}
            >
              <i className={item.icon}></i>
              <div className={"comp-txt"}>{item.type}</div>
            </div>
          ))}
        </div>
        <div className={"outerArea"}>
          <div className={"work"}>
            * Changes will be autosaved{" "}
            <button className={"btn"} onClick={this.onClear}>
              <i className="fa fa-trash icon"></i>Clear
            </button>
          </div>
          <div
            className={"innerArea"}
            id={"data-box"}
            onDrop={this.drop}
            onDragOver={this.dragOver}
          >
            {this.state.data.map((item, i) => (
              <Comp
                state={item.state}
                type={item.type}
                id={i}
                key={i}
                onChange={this.change}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default WorkArea;
