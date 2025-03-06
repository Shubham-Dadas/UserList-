import React, { Component } from "react";
import { addUser } from "../../../services/service";
import "./add-user.scss";

interface Props {
  onClose: () => void;
  handleUserAdd: () => void;
  handleNotification: (msg: string, type: string) => void;
}

interface State {
  name: string;
  email: string;
  gender: string;
  status: string;
}

class AddUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      gender: "male",
      status: "active",
    };
  }

  closeButton = () => {
    this.props.handleNotification("", "");
    this.props.onClose();
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      State,
      keyof State
    >);
  };

  handleSubmit = async (e: React.FormEvent) => {
    let status: number;
    e.preventDefault();

    try {
      status = await addUser(
        this.state.name,
        this.state.email,
        this.state.gender,
        this.state.status
      );

      if (status === 201) {
        this.props.handleNotification("User added successfully", "success");
        this.props.handleUserAdd();
        this.props.onClose();
      } else if (status === 422) {
        this.props.handleNotification("Email already exists", "error");
      }
    } catch (error) {
      this.props.handleNotification("Failed to add user", "error");
    }
  };

  render() {
    return (
      <>
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              Add New User
              <button className="close-btn" onClick={this.closeButton}>
                ✖
              </button>
            </div>

            <form onSubmit={this.handleSubmit} className="modal-body">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Gender:</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={this.state.gender === "male"}
                      onChange={this.handleChange}
                    />
                    Male
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={this.state.gender === "female"}
                      onChange={this.handleChange}
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Status:</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={this.state.status === "active"}
                      onChange={this.handleChange}
                    />
                    Active
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={this.state.status === "inactive"}
                      onChange={this.handleChange}
                    />
                    Inactive
                  </label>
                </div>
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={this.closeButton}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default AddUser;
