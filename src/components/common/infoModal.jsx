import { useState } from "react";

const InfoModal = ({ data, toOpen, onExit, headerText }) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div
      style={isOpen || toOpen ? null : { display: "none" }}
      className="modalContainer"
    >
      <div className="modal-dialog modal-lg myModal">
        <div className="modal-content">
          <div className="myModalFlex" style={{ alignItems: "center" }}>
            <h4 className="myTitle">{headerText}</h4>
            <div className="divider"></div>
            <button
              type="button"
              className="myCloseBtnMinimal m-2"
              onClick={() => {
                if (toOpen) onExit();
                else onClose();
              }}
            >
              X
            </button>
          </div>
          <div className="my-modal-body">{data}</div>
        </div>
      </div>
    </div>
  );
};

InfoModal.defaultProps = {
  toOpen: false,
  headerText: null,
};

export default InfoModal;
