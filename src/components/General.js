import { Component } from "react";
import { Input } from "./Input";

class General extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDisabled: this.props.isDisabled
    }
  }
  render() {
    const category = "general";
    return (
      <div className={`box-border shadow-lg w-11/12 px-10 sm:px-16 py-12 ${this.props.isDisabled ? "opacity-80": ""}`}>
        <h2 className="font-bold text-3xl mb-6">General</h2>
        <form action="">
          <fieldset className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-x-16" disabled={this.props.isDisabled}>
            <Input
              title="Full Name on ID"
              name="fullName"
              required="Required"
              value={this.props.form.fullName}
              category={category}
              handleChange={this.props.handleChange}
            />
            <Input
              title="Email Address"
              required="Required"
              name="email"
              value={this.props.form.email}
              category={category}
              handleChange={this.props.handleChange}
            />
            <Input
              title="Phone Number"
              required="Required"
              name="phoneNumber"
              value={this.props.form.phoneNumber}
              category={category}
              handleChange={this.props.handleChange}
            />
            <Input
              title="Current Address"
              required="Required"
              desc="Includes City Name and Country of Residence. Example: Jakarta, Indonesia"
              name="address"
              value={this.props.form.address}
              category={category}
              handleChange={this.props.handleChange}
            />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default General;
