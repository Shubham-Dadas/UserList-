import React, { Component } from "react";
import { editUser } from "../../../services/service";
import "./edit-user.scss";
import { User, Gender, Status, MessageType } from "../UserList/model";

interface Props {
  user: User;
  onClose: () => void;
  handleUserEdit: () => void;
  handleNotification: (msg: string, type: string) => void;
}

interface State {
  user: User;
}

class EditUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: { ...this.props.user },
    };
  }

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    editUser(this.state.user)
      .then((res) => {
        const errorData = res.response?.data[0];
        const message = errorData
          ? `${errorData.field} ${errorData.message}`
          : "User updated successfully";
        if (errorData) {
          this.props.handleNotification(message, MessageType.error);
          return;
        } else {
          this.props.handleNotification(message, MessageType.success);
          this.props.handleUserEdit();
          this.props.onClose();
        }
      })
      .catch((error) => {
        this.props.handleNotification(
          "Failed to update user",
          MessageType.error
        );
      });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value },
    }));
  };

  render() {
    return (
      <>
        <div className="edit-user-form">
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                Edit User Form
                <button className="close-btn" onClick={this.props.onClose}>
                  ✖
                </button>
              </div>

              <form className="modal-body" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={this.state.user.name}
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
                    value={this.state.user.email}
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
                        checked={this.state.user.gender === Gender.male}
                        onChange={this.handleChange}
                      />
                      Male
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={this.state.user.gender === Gender.female}
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
                        checked={this.state.user.status === Status.active}
                        onChange={this.handleChange}
                      />
                      Active
                    </label>
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={this.state.user.status === Status.inactive}
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
                    onClick={this.props.onClose}
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
        </div>
      </>
    );
  }
}

export default EditUser;
