import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label, style = { marginTop: "12px", background: "#6e00ff" }) {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary"
        style={style}
      >
        {label}
      </button>
    );
  }

  renderInput(
    name,
    label,
    type = "text",
    autoFocus = false,
    disabled = false,
    className = null
  ) {
    const { data, errors } = this.state;
    let classN = "form-control";
    if (className) {
      classN = classN + " " + className;
    }

    return (
      <Input
        autoFocus={autoFocus}
        autoComplete="off"
        disabled={disabled}
        className={classN}
        type={type}
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderTextarea(name, label, rows = 1) {
    const { data, errors } = this.state;

    return (
      <Textarea
        rows={rows}
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
