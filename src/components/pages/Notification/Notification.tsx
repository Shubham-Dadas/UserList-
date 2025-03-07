import React from "react";
import "./notification.scss";

interface ToastProps {
  message: string;
  type: string;
}

const Notification: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div className={`toast-container ${type}`}>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
