import React, { Component } from "react";
import { editUser, addUser } from "../../../services/service";
import "./user-form-modal.scss";
import {
  User,
  Gender,
  Status,
  MessageType,
  ModalState,
  ActionType,
} from "../../../Model/model";

interface Props {
  modalState: ModalState;
  onCloseModal: () => void;
  handleUserAddOrEdit: () => void;
  handleNotification: (msg: string, type: string) => void;
}

interface State {
  user: User;
}

class UserForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        id: props.modalState.user?.id,
        name: props.modalState.user?.name || "",
        email: props.modalState.user?.email || "",
        gender: props.modalState.user?.gender || Gender.male,
        status: props.modalState.user?.status || Status.active,
      },
    };
  }

  handleEditModalSubmit = async (e: React.FormEvent) => {
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
        }
        this.props.handleNotification(message, MessageType.success);
        this.props.handleUserAddOrEdit();
        this.props.onCloseModal();
      })
      .catch((error) => {
        this.props.handleNotification(
          "Failed to update user",
          MessageType.error
        );
      });
  };

  handleAddUserModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    addUser(this.state.user)
      .then((res) => {
        const errorData = res.response?.data[0];
        const message = errorData
          ? `${errorData.field} ${errorData.message}`
          : "User added successfully";
        if (errorData) {
          this.props.handleNotification(message, MessageType.error);
          return;
        }
        this.props.handleNotification(message, MessageType.success);
        this.props.handleUserAddOrEdit();
        this.props.onCloseModal();
      })
      .catch((error) => {
        this.props.handleNotification("Failed to add user", MessageType.error);
      });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.modalState.type === ActionType.add
      ? this.handleAddUserModalSubmit(e)
      : this.handleEditModalSubmit(e);
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
                {this.props.modalState.type === ActionType.add ? (
                  <>Add User Form</>
                ) : (
                  <>Edit User Form</>
                )}
                <button className="close-btn" onClick={this.props.onCloseModal}>
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
                    onClick={this.props.onCloseModal}
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

export default UserForm;
