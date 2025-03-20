import React from "react";
import { User } from "../UserList/model";
import "./action-modal.scss";

interface Props {
  onClose: () => void;
  handleEditModal: (user: User | null) => void;
  user: User | null;
}

class ActionModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleEditClick = () => {
    this.props.handleEditModal(this.props.user);
    this.props.onClose();
  };

  render() {
    return (
      <div className="action-modal-wrapper">
        <div className="action-modal">
          <ul>
            <li onClick={this.handleEditClick}>Edit</li>
            <li onClick={this.props.onClose}>Delete</li>
            <li onClick={this.props.onClose}>Action3</li>
            <li onClick={this.props.onClose}>Action4</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ActionModal;
