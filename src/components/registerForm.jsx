import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import axios from "axios";

import SmallFooter from "./smallFooter";
import Form from "./common/form";

import { register } from "./../services/userService";
import auth from "./../services/authService";

import { getOS } from "./../utils/os";
import { getIP } from "../utils/ip";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
    ip: "",
    os: "",
    isHash: false,
    inputClass: "",
  };

  schema = {
    username: Joi.string().required().label("Username").email(),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  async componentDidMount() {
    document.title = "VIDLY | Register";
    const { ip } = await getIP();
    const os = getOS();
    this.setState({ ip, os });
  }

  doSubmit = async () => {
    try {
      const { data, ip, os } = this.state;
      const { username, name, password } = data;
      this.setState({ isHash: true });
      const { data: userMetaInfo } = await axios.get(
        `/.netlify/functions/validateEmail?ip=${ip}&email=${username}`
      );
      if (userMetaInfo.status === "valid") {
        try {
          const response = await register({
            email: username,
            password,
            name,
            ip,
            os,
            userMetaInfo,
          });
          this.setState({ inputClass: "is-valid" });
          auth.loginWithJwt(response.headers["x-auth-token"]);
          window.location = "/";
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.username = ex.response.data;
            this.setState({ errors, isHash: false });
          }
        }
      } else {
        this.setState({ inputClass: "is-invalid", isHash: false });
        toast.dark("❗❗ Invalid email");
      }
    } catch (ex) {
      toast.dark("❗❗ Try again later.");
      this.setState({ isHash: false });
    }
  };

  render() {
    const { isHash, inputClass } = this.state;

    return (
      <>
        {isHash && (
          <div
            style={{
              backgroundColor: " rgb(24 24 24 / 68%)",
              height: "70%",
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
        <div className="myBox">
          <h1
            style={{
              marginBottom: "2rem",
              alignSelf: "center",
              fontSize: "36px",
            }}
          >
            Register
          </h1>
          <form onSubmit={this.handleSubmit}>
            <fieldset disabled={isHash}>
              {this.renderInput(
                "username",
                "Username",
                "text",
                false,
                false,
                inputClass
              )}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              <div className="form-check" style={{ marginTop: "10px" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckCheckedDisabled"
                  style={{ backgroundColor: "#6e00ff", border: "none" }}
                  checked
                  disabled
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckCheckedDisabled"
                >
                  Accepted Terms & Privacy
                </label>
              </div>
              {this.renderButton("Register", {
                marginTop: "15px",
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

export default RegisterForm;
