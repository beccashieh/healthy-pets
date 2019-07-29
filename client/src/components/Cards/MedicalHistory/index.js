import React, {Component} from "react";
import "./style.css";
import MedicalModal from "../../Modals/MedicalModal";
import Axios from "axios";

class Medical extends Component {

  componentWillMount = uid => {
    Axios.get(`/api/pets/${uid}`).then(res => {
      console.log(res);
    });
  };

  updatedModal = () => {
    console.log('update state')
    this.props.getUserInfo(this.props.uid);
  };

  render () {
    return (
      <div className="card">
        <div className="card-body text-center">
          <h3 className="card-title"><strong>Medical History</strong></h3>
          <MedicalModal modalUpdate={this.updatedModal}/>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Medications: </strong>{this.props.medications}</li>
          <li className="list-group-item"><strong>Vaccines: </strong>{this.props.vaccines}</li>
          <li className="list-group-item"><strong>Allergies: </strong>{this.props.allergies}</li>
          <li className="list-group-item"><strong>Food: </strong>{this.props.food}</li>
          <li className="list-group-item"><strong>Procedures: </strong>{this.props.procedures}</li>
        </ul>
      </div>
    );
  }
}

export default Medical;