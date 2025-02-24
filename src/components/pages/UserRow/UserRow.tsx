import React, { Component } from "react";

interface UserProps {
  user: {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
  };
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
