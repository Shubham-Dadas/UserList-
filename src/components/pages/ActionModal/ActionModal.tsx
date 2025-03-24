import React from "react";
import { ActionType, User } from "../../../Model/model";
import "./action-modal.scss";

interface Props {
  onCloseActionModal: () => void;
  handleEditModal: (user: User | null) => void;
  user: User | null;
}

class ActionModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  
  handleEditClick = () => {
    this.props.handleEditModal(this.props.user);
    this.props.onCloseActionModal();
  };
  
  render() {
    return (
      <div className="action-modal-wrapper">
        <div className="action-modal">
          <ul>
            <li onClick={this.handleEditClick}>Edit</li>
            <li onClick={this.props.onCloseActionModal}>Delete</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ActionModal;
