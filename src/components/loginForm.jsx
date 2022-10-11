import { HashLoader } from "react-spinners";
import Joi from "joi-browser";

import SmallFooter from "./smallFooter";
import Form from "./common/form";

import auth from "./../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    isHash: false,
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
    document.title = "VIDLY | Login";
  }

  doSubmit = async () => {
    try {
      this.setState({ isHash: true });
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
      this.setState({ isHash: false });
    }
  };

  render() {
    const { isHash } = this.state;

    return (
      <>
        {isHash && (
          <div
            style={{
              backgroundColor: " rgb(24 24 24 / 68%)",
              height: "50%",
              width: "87%",
              position: "absolute",
            }}
          >
            <HashLoader
              color="#6e00ff"
              style={{
                display: "absolute",
                position: "none",
              }}
            />
          </div>
        )}
        <div className="myBox" style={{ marginBottom: "5rem" }}>
          <h1
            style={{
              marginBottom: "2rem",
              alignSelf: "center",
              fontSize: "36px",
            }}
          >
            Login
          </h1>
          <form onSubmit={this.handleSubmit}>
            <fieldset disabled={isHash}>
              {this.renderInput("username", "Username", "text", true)}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login", {
                marginTop: "25px",
                background: "#6e00ff",
                width: "100%",
              })}
            </fieldset>
          </form>
        </div>
        <SmallFooter />
      </>
    );
  }
}

export default LoginForm;
