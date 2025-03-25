import React, { Component } from "react";
import { getUsers } from "../../../services/service";
import { User, ModalState, ActionType } from "../../../Model/model";
import UserRow from "../UserRow/UserRow";
import Pagination from "../Pagination/Pagination";
import Header from "../Header/Header";
import Notification from "../Notification/Notification";
import "./users-list.scss";
import UserForm from "../UserFormModal/UserFormModal";

interface State {
  users: User[];
  loading: boolean;
  currentPage: number;
  limit: number;
  totalUsers: number;
  error: boolean;
  selectedUser: User | null;
  message: string;
  messageType: string;
  modalState: ModalState;
}

class UsersList extends Component<{}, State> {
  private box: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.box = React.createRef();
    this.state = {
      users: [],
      loading: true,
      currentPage: 0,
      limit: 10,
      totalUsers: 0,
      error: false,
      selectedUser: null,
      message: "",
      messageType: "",
      modalState: { type: null, user: null },
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
    this.fetchUsers();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  handleOutsideClick = (event: MouseEvent) => {
    if (this.box.current === null) return;
    if (!this.box.current.contains(event.target as Node)) {
      this.toggleActionModal(null);
    }
  };

  handleNotification = (msg: string, type: string) => {
    this.setState({ message: msg, messageType: type });

    setTimeout(() => {
      this.setState({ message: "", messageType: "" });
    }, 1000);
  };

  fetchUsers = () => {
    const { currentPage, limit } = this.state;
    this.setState({ loading: true, error: false, users: [] });

    getUsers(currentPage + 1, limit)
      .then((response) => {
        this.setState({
          users: response.data,
          totalUsers: parseInt(response.headers["x-pagination-total"] || "0"),
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  };

  handlePageClick = (data: { selected: number }) => {
    this.setState({ currentPage: data.selected }, this.fetchUsers);
  };

  handleModalOpen = (type: ActionType, user: User | null = null) => {
    this.setState({ modalState: { type, user } });
  };

  handleModalClose = () => {
    this.setState({ modalState: { type: null, user: null } });
  };

  handleUserAddOrEdit = () => {
    this.setState({
      currentPage: 0,
    });
    this.fetchUsers();
    this.handleModalClose();
  };

  toggleActionModal = (user: User | null) => {
    this.setState({ selectedUser: user });
  };

  render() {
    const {
      users,
      loading,
      limit,
      totalUsers,
      currentPage,
      error,
      message,
      messageType,
      modalState,
    } = this.state;
    const pageCount = Math.ceil(totalUsers / limit);

    return (
      <div className="user-list-container" ref={this.box}>
        <Header
          toggleAddUserModal={() => this.handleModalOpen(ActionType.add)}
        />

        {message.length > 0 && (
          <Notification message={message} type={messageType} />
        )}
        {[ActionType.add, ActionType.edit].includes(modalState.type)  && (
          <UserForm
            modalState={modalState}
            onCloseModal={this.handleModalClose}
            handleUserAddOrEdit={this.handleUserAddOrEdit}
            handleNotification={this.handleNotification}
          />
        )}

        {loading ? (
          <div className="loading">
            <p>Loading users...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>Error in loading users</p>
          </div>
        ) : users.length === 0 ? (
          <div className="empty">
            <p>No user found</p>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    toggleActionModal={this.toggleActionModal}
                    selectedUser={this.state.selectedUser}
                    handleEditModal={(user) =>
                      this.handleModalOpen(ActionType.edit, user)
                    }
                  />
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
