import { useState } from "react";

const InfoModal = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div style={isOpen ? null : { display: "none" }} className="modalContainer">
      <div className="modal-dialog modal-lg myModal">
        <div className="modal-content">
          <div className="myModalFlex">
            <div className="divider"></div>
            <button
              type="button"
              className="myCloseBtn m-2"
              onClick={() => {
                onClose();
              }}
            >
              X
            </button>
          </div>
          <div className="my-modal-body" style={{ paddingTop: "7%" }}>
            {data}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
