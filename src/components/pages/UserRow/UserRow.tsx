import React, { Component } from "react";
import { User } from "../UserList/model";
interface UserProps {
  user: User
}

class UserRow extends Component<UserProps> {
  render() {
    const { name, email, gender, status } = this.props.user;

    return (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{gender}</td>
        <td>{status}</td>
      </tr>
    );
  }
}

export default UserRow;
