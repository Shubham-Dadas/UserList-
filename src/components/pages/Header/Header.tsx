import React, { Component } from "react";
import "./header.scss";

interface props {
  toggleAddUserModal: () => void;
}

class Header extends Component<props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div className="search-container">
          <span className="search-icon"></span>
          <input type="text" placeholder="Search" />
        </div>

        <button
          className="add-user-btn"
          onClick={this.props.toggleAddUserModal}
        >
          Add User
        </button>
      </div>
    );
  }
}

export default Header;
