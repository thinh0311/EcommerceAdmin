import React from "react";
import Modal from "react-modal";

const ModalComponent = () => {
  return (
    <div className="App">
      <Modal isOpen={true}>
        <h2>Title</h2>
        <p>Body</p>
      </Modal>
    </div>
  );
};

export default ModalComponent;
