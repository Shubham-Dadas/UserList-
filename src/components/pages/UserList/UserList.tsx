import React, { Component } from "react";

import { getUsers } from "../../../services/service";

import UserRow from "../UserRow/UserRow";
import Pagination from "../Pagination/Pagination";

import "./users-list.scss";

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
  currentPage: number;
  limit: number;
  totalUsers: number;
}

class UsersList extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      currentPage: 0,
      limit: 10,
      totalUsers: 2000,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    const { currentPage, limit } = this.state;
    this.setState({ loading: true });

    getUsers(currentPage + 1, limit)
      .then((response) => {
        this.setState({ users: response.data, totalUsers: parseInt(response.headers["x-pagination-total"] || "0"), loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.error("Error fetching users:", err);
      })
  }

  handlePageClick = (data: { selected: number }) => {
    this.setState({ currentPage: data.selected }, () => {
      this.fetchUsers();
    });
  };

  render() {
    const { users, loading, limit, totalUsers, currentPage } = this.state;
    const pageCount = Math.ceil(totalUsers / limit);

    return (
      <div className="user-list-container">
        {loading ? (
          <div className="loading">
            <p>Loading users...</p>
          </div>
        ) : (
          <div>
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
            <Pagination
              handlePageClick={this.handlePageClick}
              pageCount={pageCount}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    );
  }
}

export default UsersList;
