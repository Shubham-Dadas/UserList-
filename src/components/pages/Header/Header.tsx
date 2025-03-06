import React, { Component } from "react";
import "./header.scss";
import AddUser from "../Add-User-Form/AddUser";
import Notification from "../Notification/Notification";

interface State {
  isModalOpen: boolean;
  message: string;
  messageType: string;
}

interface headerProps {
  handleUserAdd: () => void;
}

class Header extends Component<headerProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      message: "",
      messageType: "",
    };
  }

  handleNotification = (msg: string, type: string) => {
    this.setState({ message: msg, messageType: type });

    setTimeout(() => {
      this.setState({ message: "", messageType: "" });
    }, 1000);
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    return (
      <div className="header">
        {this.state.message.length > 0 && (
          <Notification
            message={this.state.message}
            type={this.state.messageType}
          />
        )}
        <div className="search-container">
          <span className="search-icon"></span>
          <input type="text" placeholder="Search" />
        </div>

        <button className="add-user-btn" onClick={this.toggleModal}>
          Add User
        </button>

        {this.state.isModalOpen && (
          <AddUser
            onClose={this.toggleModal}
            handleUserAdd={this.props.handleUserAdd}
            handleNotification={this.handleNotification}
          />
        )}
      </div>
    );
  }
}

export default Header;
