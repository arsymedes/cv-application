import { Component } from "react";
import uniqid from "uniqid";

class Input extends Component {
  render() {
    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{this.props.title}</span>
          <span className="label-text-alt">{this.props.required}</span>
        </label>
        <input
          type="text"
          name={this.props.name}
          value={this.props.value}
          placeholder="Type here"
          onChange={(e) => {
            this.props.handleChange(e, this.props.category, e.target.value , this.props.id);
          }}
          className="input input-bordered w-full h-9 input-primary font-semibold"
        />
        <label className="label">
          <span className="label-text-alt">{this.props.desc}</span>
        </label>
      </div>
    );
  }
}

class Radio extends Component {
  iterator(list) {
    const newList = list.map((element) => (
      <div className="form-control" key={uniqid()}>
        <label className="label cursor-pointer gap-2">
          <input
            type="radio"
            value={element}
            name={this.props.name}
            checked={this.props.value === element}
            className="radio checked:bg-primary"
            onChange={(e) => {
              this.props.handleChange(e, this.props.category, e.target.value, this.props.id);
            }}
          />
          <span className="label-text">{element}</span>
        </label>
      </div>
    ));
    return newList;
  }

  render() {
    return (
      <fieldset className="flex gap-4">
        <legend className="text-sm mb-2">{this.props.title}</legend>
        {this.iterator(this.props.options)}
      </fieldset>
    );
  }
}

class Select extends Component {
  iterator(list) {
    const newList = list.map((element) => (
      <option key={uniqid()} value={element}>
        {element}
      </option>
    ));
    newList[0] = (
      <option key={uniqid()} value={list[0]} disabled>
        {list[0]}
      </option>
    );
    return newList;
  }

  render() {
    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{this.props.title}</span>
          <span className="label-text-alt">{this.props.required}</span>
        </label>
        <select
          value={this.props.value}
          onChange={(e) => {
            this.props.handleChange(e, this.props.category, e.target.value, this.props.id);
          }}
          name={this.props.name}
          className="select min-h-6 h-9 select-primary w-full"
        >
          {this.iterator(this.props.options)}
        </select>
        <label className="label">
          <span className="label-text-alt">{this.props.desc}</span>
        </label>
      </div>
    );
  }
}

export { Input, Radio, Select };
