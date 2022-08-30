import { Component } from "react";
import { Input, Select } from "./Input";
import uniqid from "uniqid";

class Experience extends Component {
  modalPopup() {
    return (
      <div className="modal">
        <form action="" className="modal-box max-w-none w-11/12 px-16 py-12">
          <AddSection
            form={this.props.form}
            handleChange={this.props.handleChange}
            category="experience"
            isDeletable={false}
            num={this.props.forms.length + 1}
          />
          <div className="modal-action">
            <label
              htmlFor="experience-modal"
              onClick={() => this.props.addRecord("Experience")}
              className="btn btn-secondary"
            >
              Add
            </label>
            <label htmlFor="experience-modal" className="btn btn-ghost">
              Cancel
            </label>
          </div>
        </form>
      </div>
    );
  }

  iterator() {
    const newList = this.props.forms.map((element, index) => (
      <AddSection
        form={element}
        category="experiences"
        handleChange={this.props.handleListChange}
        key={element.id}
        id={element.id}
        isDeletable={true}
        deleteListChange={this.props.deleteListChange}
        num={index + 1}
        isDisabled={this.props.isDisabled}
      />
    ));
    return newList;
  }

  render() {
    return (
      <div className={`box-border shadow-lg w-11/12 px-16 py-12 flex flex-col`}>
        <h2 className="font-bold text-3xl mb-6">Experience</h2>
        <form action="" className="">
          {this.iterator()}
        </form>
        <label
          htmlFor="experience-modal"
          className={`btn btn-ghost font-bold mt-6 modal-button ${
            this.props.isDisabled ? "hidden" : ""
          }`}
        >
          Add Experience
        </label>
        <input type="checkbox" id="experience-modal" className="modal-toggle" />
        {this.modalPopup()}
      </div>
    );
  }
}

class AddSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: [...this.props.form.points],
    };
  }

  deleteButton(cond) {
    if (cond) {
      return (
        <button
          type="button"
          className={`btn btn-outline btn-error btn-square ${
            this.props.isDisabled ? "hidden" : ""
          }`}
          onClick={() => {
            this.props.deleteListChange("experiences", this.props.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
      );
    }
  }

  deletePoint(event, id) {
    const newList = [...this.state.points].filter((el) => el.id !== id);
    this.setState({ points: newList });
    this.props.handleChange(event, this.props.category, newList, this.props.id);
  }

  pointsRender() {
    return this.props.form.points.map((element, index) => (
      <div key={element.id} className="flex gap-4 items-center">
        <Input
          id={this.props.id}
          name="points"
          value={element.value}
          category={this.props.category}
          handleChange={(event, category, value = null, id) => {
            const newList = [...this.state.points];
            newList[index].value = event.target.value;
            this.setState({ points: newList });
            this.props.handleChange(event, category, newList, id);
          }}
        />
        <button
          name="points"
          type="button"
          className="btn btn-ghost"
          onClick={(event) => this.deletePoint(event, element.id)}
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
    const category = this.props.category;
    return (
      <div>
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold my-2">
            Experience {this.props.num}
          </h3>
          {this.deleteButton(this.props.isDeletable)}
        </div>
        <fieldset
          className="grid grid-cols-2 gap-x-16"
          disabled={this.props.isDisabled}
        >
          <Input
            id={this.props.id}
            title="Title"
            required="Required"
            name="title"
            value={this.props.form.title}
            category={category}
            handleChange={this.props.handleChange}
          />
          <Input
            id={this.props.id}
            title="Company Name"
            required="Required"
            name="companyName"
            value={this.props.form.companyName}
            category={category}
            handleChange={this.props.handleChange}
          />
          <Input
            id={this.props.id}
            title="Location"
            name="location"
            desc="Includes City Name and Country of Residence. Example: Jakarta, Indonesia"
            value={this.props.form.location}
            category={category}
            handleChange={this.props.handleChange}
          />
          <Select
            id={this.props.id}
            title="Employment Type"
            options={[
              "Select an Option",
              "Full Time",
              "Part Time",
              "Self Employed",
              "Freelance",
              "Contract",
              "Internship",
              "Apprenticeship",
            ]}
            name="employmentType"
            value={this.props.form.employmentType}
            category={category}
            handleChange={this.props.handleChange}
          />
          <Input
            id={this.props.id}
            title="Start Year"
            desc="Example: 2022"
            name="startYear"
            value={this.props.form.startYear}
            category={category}
            handleChange={this.props.handleChange}
          />
          <Input
            id={this.props.id}
            title="End Year (or expected)"
            desc="Example: 2026"
            name="endYear"
            value={this.props.form.endYear}
            category={category}
            handleChange={this.props.handleChange}
          />
        </fieldset>
        <fieldset>
          <h4 className="mt-4">Experience Descriptions</h4>
          {this.pointsRender()}
          <button
            type="button"
            name="points"
            className="btn btn-secondary btn-sm mt-4"
            onClick={(event) => {
              const newList = [
                ...this.state.points,
                { id: uniqid(), value: "" },
              ];
              this.setState({ points: newList });
              this.props.handleChange(event, category, newList, this.props.id);
            }}
          >
            Add Point
          </button>
        </fieldset>
      </div>
    );
  }
}

export default Experience;
