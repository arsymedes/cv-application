import { Component } from "react";
import uniqid from "uniqid";
import ReactToPrint from "react-to-print";
import "./App.css";
import General from "./components/General";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Info from "./components/Info";
import Review from "./components/Review";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      tabs: [
        "General",
        "Education",
        "Experience",
        "Additional Information",
        "Review",
      ],
      general: {
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
      },
      educations: [],
      education: {
        id: uniqid(),
        schoolName: "",
        fieldOfStudy: "",
        degree: "",
        grade: "",
        startYear: "",
        endYear: "",
      },
      experiences: [],
      experience: {
        id: uniqid(),
        title: "",
        companyName: "",
        location: "",
        employmentType: "Select an Option",
        startYear: "",
        endYear: "",
        points: [],
      },
      infos: {
        points: [],
      },
    };

    this.example = {
      general: {
        fullName: "Ahmad Arsy",
        phoneNumber: "081269251234",
        email: "arsymedes@gmail.com",
        address: "Jakarta, Indonesia",
      },
      educations: [
        {
          id: uniqid(),
          schoolName: "University of Indonesia",
          fieldOfStudy: "Physics",
          degree: "Bachelor's",
          grade: "3.69",
          startYear: "2020",
          endYear: "2024",
        },
        {
          id: uniqid(),
          schoolName: "SMA Negeri 1 Palembang",
          fieldOfStudy: "Science",
          degree: "High School",
          startYear: "2017",
          endYear: "2020",
        },
      ],
      experiences: [
        {
          id: uniqid(),
          title: "Junior Web Developer",
          companyName: "Google",
          location: "Seattle, US",
          employmentType: "Full Time",
          startYear: "2022",
          endYear: "Current",
          points: [
            {
              id: uniqid(),
              value:
                "Generated a total of 1 Billion Dollars in Revenue with 100% server UpTime using Microtransaction and Cryptocurrency",
            },
            {
              id: uniqid(),
              value: "Made the best react app in the world",
            },
            {
              id: uniqid(),
              value:
                "Generated a total of 1 morbillion dollars of revenue from the hit App, Morbin Time",
            },
          ],
        },
        {
          id: uniqid(),
          title: "Question Writer",
          companyName: "Gredu",
          location: "Jakarta, Indonesia",
          employmentType: "Contract",
          startYear: "2021",
          endYear: "2021",
          points: [
            {
              id: uniqid(),
              value:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in ex faucibus, sollicitudin lectus vel, porta orci. Donec a feugiat tortor.",
            },
            {
              id: uniqid(),
              value: "Made 10 Questions in 10 Minutes, the highest in the team",
            },
            {
              id: uniqid(),
              value:
                "Teached students all around the world the importance of Quadratic Formula",
            },
          ],
        },
        {
          id: uniqid(),
          title: "IOS Developer",
          companyName: "Apple Developer Academy",
          location: "Tangerang, Banten",
          employmentType: "Full Time",
          startYear: "2017",
          endYear: "2020",
          points: [
            {
              id: uniqid(),
              value:
                "Made a fun little app that tells you how o make a great CV from scracth, available on IOS",
            },
            {
              id: uniqid(),
              value:
                "Fixed a critical bug in production that could've resulted in a catastrophic 1 Trillion Zimbabwe Dollars loss",
            },
            {
              id: uniqid(),
              value:
                "Aliquam erat volutpat. Donec quis odio eu sem feugiat congue id in arcu. Duis nisi ex, volutpat sed dolor a, aliquam blandit felis.",
            },
          ],
        },
      ],
      infos: {
        points: [
          {
            id: uniqid(),
            value:
              "Technical Skills: HTML, CSS, JavaScript, React, SQL, Python, MongoDB, ExpressJS",
          },
          {
            id: uniqid(),
            value:
              "Languages: Indonesian (Native Proficiency), English (Professional Proficiency)",
          },
          {
            id: uniqid(),
            value:
              "Awards: Gold Medal in ONMIPA Physics Olympiad, Honorable Mention in IdPHO Physics Olympiad in Russia",
          },
        ],
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.deleteListChange = this.deleteListChange.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.setExample = this.setExample.bind(this);
  }

  handleChange(event, category, value) {
    const target = event.target;
    const name = target.name;

    this.setState((prevState) => ({
      [category]: {
        ...prevState[category],
        [name]: value,
      },
    }));
  }

  handleListChange(event, category, value, id) {
    const target = event.target;
    const name = target.name;

    let list = [...this.state[category]];
    let index = list.findIndex((el) => el.id === id);
    list[index] = {
      ...list[index],
      [name]: value,
    };
    this.setState({ [category]: list });
  }

  deleteListChange(category, id) {
    let list = this.state[category].filter((el) => el.id !== id);
    this.setState({ [category]: list });
  }

  addRecord(type) {
    if (type === "Education") {
      this.setState((state) => ({
        education: {
          id: uniqid(),
          schoolName: "",
          fieldOfStudy: "",
          degree: "",
          grade: "",
          startYear: "",
          endYear: "",
        },
        educations: [...state.educations, state.education],
      }));
    } else if (type === "Experience") {
      this.setState((state) => ({
        experience: {
          id: uniqid(),
          title: "",
          companyName: "",
          location: "",
          employmentType: "",
          points: [],
          startYear: "",
          endYear: "",
        },
        experiences: [...state.experiences, state.experience],
      }));
    }
  }

  next() {
    this.setState((prevState) => ({ tab: prevState.tab + 1 }));
  }

  back() {
    if (this.state.tab > 0) {
      this.setState((prevState) => ({ tab: prevState.tab - 1 }));
    }
  }

  steps() {
    const { tab, tabs } = this.state;
    const newList = [];
    for (let i = 0; i < tabs.length; i += 1) {
      let classes = "step";
      if (i <= tab) classes += " step-primary";
      newList.push(
        <li key={uniqid()} className={classes}>
          {tabs[i]}
        </li>
      );
    }
    return <ul className="steps grid-cols-[minmax(150px,_1fr)]">{newList}</ul>;
  }

  mainContent() {
    if (this.state.tab === 0)
      return (
        <General handleChange={this.handleChange} form={this.state.general} />
      );
    if (this.state.tab === 1)
      return (
        <Education
          handleChange={this.handleChange}
          handleListChange={this.handleListChange}
          deleteListChange={this.deleteListChange}
          addRecord={this.addRecord}
          form={this.state.education}
          forms={this.state.educations}
        />
      );
    if (this.state.tab === 2)
      return (
        <Experience
          handleChange={this.handleChange}
          handleListChange={this.handleListChange}
          deleteListChange={this.deleteListChange}
          addRecord={this.addRecord}
          form={this.state.experience}
          forms={this.state.experiences}
        />
      );
    if (this.state.tab === 3)
      return <Info handleChange={this.handleChange} forms={this.state.infos} />;
    if (this.state.tab === 4)
      return (
        <Review state={this.state} ref={(el) => (this.componentRef = el)} />
      );
  }

  setExample() {
    if (this.state.tab === 0) this.setState({ general: this.example.general });
    if (this.state.tab === 1)
      this.setState({ educations: this.example.educations });
    if (this.state.tab === 2)
      this.setState({ experiences: this.example.experiences });
    if (this.state.tab === 3) this.setState({ infos: this.example.infos });
  }

  render() {
    return (
      <div className="flex flex-col items-center py-8">
        <h1 className="text-7xl font-bold mb-12">CV Application</h1>
        {this.steps()}
        {this.mainContent()}
        <div className="mt-4 w-full justify-between px-20 flex">
          {this.state.tab !== 4 ? (
            <button
              className="btn btn-secondary self-start"
              onClick={this.setExample}
            >
              Set Example
            </button>
          ) : (
            ""
          )}
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={this.back}>
              Back
            </button>
            {this.state.tab !== 4 ? (
              <button className="btn btn-primary" onClick={this.next}>
                Save and Continue
              </button>
            ) : (
              <ReactToPrint
                trigger={() => {
                  return (
                    <button className="btn btn-secondary">Print Pdf</button>
                  );
                }}
                content={() => this.componentRef}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
