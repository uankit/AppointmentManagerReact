import { without } from "lodash";
import { Component } from "react";
import "../css/App.css";
import AddAppointment from "./AddAppointment";
import ListAppointment from "./ListAppointment";
import SearchAppointment from "./SearchAppointment";

class App extends Component {
  constructor() {
    super();
    this.state = {
      appointments: [],
      formDisplay: false,
      orderBy: "petName",
      orderDir: "asc",
      queryText: "",
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
  }

  deleteAppointment(id) {
    let newAppointment = this.state.appointments;
    newAppointment = without(newAppointment, id);
    this.setState({
      appointments: newAppointment,
    });
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay,
    });
  }

  addAppointment(apt) {
    let tempApt = this.state.appointments;
    tempApt.unshift(apt);
    this.setState({
      appointments: tempApt,
    });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir,
    });
  }

  searchApts(query){
    this.setState({
      queryText:query
    })
  }

  componentDidMount() {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        const appointment = data.map((item) => item);
        this.setState({
          appointments: appointment,
        });
      });
  }
  render() {
    let order;
    let filteredAppointment = this.state.appointments;
    this.state.orderDir === "asc" ? (order = 1) : (order = -1);
    filteredAppointment = filteredAppointment
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter((eachItem) => {
        return (
          eachItem["petName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["ownerName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["aptNotes"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointment
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment}
                />
                <SearchAppointment
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchApts = {this.searchApts}
                />
                <ListAppointment
                  appointment={filteredAppointment}
                  deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
