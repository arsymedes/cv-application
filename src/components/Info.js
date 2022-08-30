import { Input } from "./Input";
import { Component } from "react";
import uniqid from "uniqid";

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: [...this.props.forms.points],
    };
    
    this.deletePoint = this.deletePoint.bind(this)
  }

  deletePoint(event, category=null, id) {
    const newList = [...this.state.points].filter((el) => el.id !== id);
    this.setState({ points: newList });
    this.props.handleChange(event, "infos", newList);
  }

  iterator() {
    return this.props.forms.points.map((element, index) => (
      <div className="flex gap-4 items-center" key={element.id}>
        <Input
          name="points"
          category="infos"
          value={element.value}
          handleChange={(event, category, value = null) => {
            const newList = [...this.state.points];
            newList[index].value = event.target.value;
            this.setState({ points: newList });
            this.props.handleChange(event, category, newList);
          }}
        />
        <button
          name="points"
          type="button"
          className="btn btn-ghost"
          onClick={(event, category) =>
            this.deletePoint(event, category, element.id)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    ));
  }

  render() {
    const category = "infos";
    return (
      <div className={`box-border shadow-lg w-11/12 px-16 py-12 flex flex-col`}>
        <h2 className="font-bold text-3xl mb-6">Additional Information</h2>
        <form action="" className="">
          {this.iterator()}
        </form>
        <span className="label-text">
          Example: "Technical Skills: HTML, CSS, JavaScript, React, SQL"
        </span>
        <button
          name="points"
          className={`btn btn-ghost font-bold mt-6 modal-button`}
          onClick={(event) => {
            const newList = [...this.state.points, { id: uniqid(), value: "" }];
            this.setState({ points: newList });
            this.props.handleChange(event, category, newList);
          }}
        >
          Add Information
        </button>
      </div>
    );
  }
}

export default Info;
