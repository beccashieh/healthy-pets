import React, { Component } from 'react';
import Modal from 'react-modal';
import API from "../../../utils/API";
import axios from 'axios';
import { FaPlusSquare } from "react-icons/fa";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40rem',
    height: '40rem'
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(12, 6, 102, 0.6)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

class PetModal extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
        petName: "",
        petBirthday: '',
        petColor: "",
        petBreed: "",
        petSex: "",
        petSpecies: '',
        petWeight: 0,
        petRabiesTag: 0,
        petMicroChip: 0,
        uid: '',
        currentPetId: 0,
        userId: 0,
    };
  }

  componentDidMount = () => {
    const url = window.location.pathname;
    const pathnameArr = url.split("/");
    const userId = pathnameArr[pathnameArr.length - 1];
    this.setState({userId: userId});
  };


  handleSubmit(event) {
    event.preventDefault();
    this.updateDb(this.state.userId);
    this.closeModal();
    // this.props.modalOpen(false);
  }

  updateDb = (uid) => {
    let petObj = {
      petName: this.state.petName,
      petBirthday: this.state.petBirthday,
      petSpecies: this.state.petSpecies,
      petColor: this.state.petColor,
      petBreed: this.state.petBreed,
      petSex: this.state.petSex,
      petWeight: this.state.petWeight,
      petRabiesTag: this.state.petRabiesTag,
      petMicroChip: this.state.petMicroChip,
      uid: uid
    }

    axios.post(`/api/pets`, petObj)
    .then(res => {
      console.log(res);
      this.props.getPetInfo(uid)
      console.log("pet updated")
    })
    .catch(err => console.log(err));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "rgb(8, 5, 145)";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div>
        {/* <button className="edit" onClick={this.openModal}>
          Edit
        </button> */}
        <FaPlusSquare onClick={this.openModal}/>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Pet Modal"
        >
          <h2
            className="text-center"
            ref={subtitle => (this.subtitle = subtitle)}
          >
            Pet Information
          </h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={this.state.petName}
                id="petName"
                onChange={this.handleChange}
                placeholder={this.props.petName}
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                value={this.state.petBirthday}
                id="petBirthday"
                onChange={this.handleChange}
                placeholder="00/00/0000"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={this.state.petSpecies}
                id="petSpecies"
                onChange={this.handleChange}
                placeholder={this.props.petSpecies}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={this.state.petColor}
                id="petColor"
                onChange={this.handleChange}
                placeholder={this.props.petColor}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={this.state.petBreed}
                id="petBreed"
                onChange={this.handleChange}
                placeholder={this.props.petBreed}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={this.state.petSex}
                id="petSex"
                onChange={this.handleChange}
                placeholder={this.props.petSex}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={this.state.petWeight}
                id="petWeight"
                onChange={this.handleChange}
                placeholder={this.props.petWeight}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={this.state.petRabiesTag}
                id="petRabiesTag"
                onChange={this.handleChange}
                placeholder={this.props.petRabiesTag}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={this.state.petMicroChip}
                id="petMicroChip"
                onChange={this.handleChange}
                placeholder={this.props.petMicroChip}
              />
            </div>
            <input
              type="submit"
              value="Submit"
              color="primary"
              className="btn btn-primary"
            />
            <button className="btn btn-danger" onClick={this.closeModal}>
              Close
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default PetModal;