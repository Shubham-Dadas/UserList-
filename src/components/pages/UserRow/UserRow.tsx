import React from "react";
import { User } from "../UserList/model";
import ActionModal from "../ActionModal/ActionModal";

interface Props {
  user: User;
  toggleActionModal: (user: User | null) => void;
  isOpen: boolean;
  handleEditModal: (user: User | null) => void;
}

class UserRow extends React.Component<Props> {
  handleActionClick = () => {
    this.props.toggleActionModal(this.props.isOpen ? null : this.props.user);
  };

  render() {
    const { user, isOpen, handleEditModal } = this.props;

    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.gender}</td>
        <td>{user.status}</td>
        <td className="action-cell">
          <div className="action-container">
            <button onClick={this.handleActionClick}>⋮</button>
            {isOpen && (
              <ActionModal
                user={user}
                onClose={() => this.props.toggleActionModal(null)}
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
