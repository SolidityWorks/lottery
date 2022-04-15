import React from "react";

function Alert({ open, children }) {
  const [isMessageOpen, setIsmessageOpen] = React.useState(open);
  const closeMessage = () => {
    setIsmessageOpen(false);
  };
  return (
    <div className={`alert__message${isMessageOpen ? " active" : ""}`}>
      {children}
      <button onClick={closeMessage} className="alert__message-btn"></button>
    </div>
  );
}

export default Alert;
