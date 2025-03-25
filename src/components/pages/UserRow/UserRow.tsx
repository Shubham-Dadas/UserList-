import React from "react";
import { User } from "../../../Model/model";
import ActionModal from "../ActionModal/ActionModal";
import "./user-row.scss";

interface Props {
  user: User;
  toggleActionModal: (user: User | null) => void;
  selectedUser: User | null;
  handleEditModal: (user: User | null) => void;
}

class UserRow extends React.Component<Props> {
  handleActionClick = () => {
    this.props.toggleActionModal(
      this.props.selectedUser === this.props.user ? null : this.props.user
    );
  };

  render() {
    const { user, selectedUser, handleEditModal } = this.props;

    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.gender}</td>
        <td>{user.status}</td>
        <td className="action-cell">
          <div className="action-container">
            <button onClick={this.handleActionClick}>⋮</button>
            {selectedUser === user && (
              <ActionModal
                user={user}
                onCloseActionModal={() => this.props.toggleActionModal(null)}
                handleEditModal={handleEditModal}
              />
            )}
          </div>
        </td>
      </tr>
    );
  }
}

export default UserRow;
