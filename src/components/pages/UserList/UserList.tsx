import React, { Component } from "react";
import { getUsers } from "../../../services/service";
import UserRow from "../UserRow/UserRow";
import "./users-list.css";

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

interface State {
  users: User[];
  loading: boolean;
}

class UsersList extends Component<{}, State> {
  state: { users: any[]; loading: boolean };
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const users = await getUsers();
    this.setState({ users, loading: false });
  }

  render() {
    const { users, loading } = this.state;

    if (loading) {
      return <p>Loading users...</p>;
    }

    return (
      <div className="user-list-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UsersList;
