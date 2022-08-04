// Input

const Input = ({ name, label, value, autoFocusValue, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus={autoFocusValue}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
