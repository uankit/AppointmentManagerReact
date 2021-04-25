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
    };
    this.deleteAppointment = this.deleteAppointment.bind(this)
  }

  deleteAppointment(id){
    let newAppointment = this.state.appointments
    newAppointment = without(newAppointment,id)
    this.setState({
      appointments:newAppointment
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
   
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointment />
                <SearchAppointment />
                <ListAppointment
                  appointment={this.state.appointments}
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
