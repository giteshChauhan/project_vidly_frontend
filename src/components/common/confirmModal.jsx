const ConfirmModal = ({
  title,
  body,
  confirmText,
  confirmStyle,
  isOpen,
  onCloseModal,
  onConfirm,
}) => {
  return (
    <div style={isOpen ? null : { display: "none" }} className="modalContainer">
      <div className="modal-dialog modal-sm myModal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {title}
            </h5>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginRight: "5px" }}
              onClick={() => onCloseModal()}
            >
              Cancel
            </button>
            <button
              type="button"
              className={confirmStyle}
              onClick={() => {
                onConfirm();
                onCloseModal();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
