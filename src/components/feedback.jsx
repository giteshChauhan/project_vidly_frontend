import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import Joi from "joi-browser";
import axios from "axios";

import InfoModal from "./common/infoModal";
import Form from "./common/form";

import { sendFeedback } from "../services/feedbackServices";
import auth from "../services/authService";

import { getIP } from "./../utils/ip";

class Feedback extends Form {
  state = {
    data: {
      email: "",
      message: "",
    },
    errors: {},
    isForm: false,
    isInput: false,
    isHash: null,
    inputClass: null,
    user: undefined,
    ip: "",
  };

  schema = {
    email: Joi.string().required().email().label("email"),
    message: Joi.string().required().min(64).max(10000).label("message"),
  };

  submitFeedback = async (email, message, ip) => {
    try {
      await sendFeedback({
        email,
        feedback: message,
        ip,
      });
      toast.success("Sent 🥰");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors, isForm: false });
      }
      toast.error("Try again later 🙂");
    }
  };

  doSubmit = async () => {
    this.setState({ isHash: true, isForm: true });
    const { user, data, ip } = this.state;
    const { email, message } = data;
    if (user) this.submitFeedback(email, message, ip);

    if (user === undefined)
      try {
        const { data: userMetaInfo } = await axios.get(
          `/.netlify/functions/validateEmail?ip=${ip}&email=${email}`
        );

        if (userMetaInfo.status === "valid") {
          this.setState({ inputClass: "is-valid" });
          this.submitFeedback(email, message, ip);
        } else {
          this.setState({ inputClass: "is-invalid", isForm: false });
          toast.error("Invalid email");
        }
      } catch (ex) {
        toast.error("Try again later 🙂");
      }
    this.setState({ isHash: false });
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    const { ip } = await getIP();
    if (user) {
      const data = {
        email: user.email,
      };
      this.setState({ user, data, isInput: true, inputClass: "is-valid" });
    }
    this.setState({ ip });
  }

  render() {
    const { isForm, isInput, isHash, inputClass } = this.state;

    const feedback = (
      <div>
        {isHash && (
          <div
            style={{
              backgroundColor: " rgb(24 24 24 / 68%)",
              height: "90%",
              width: "100%",
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
        <h6>Thank you for your time. Please give genuine feedbacks.</h6>
        <form
          onSubmit={this.handleSubmit}
          style={{ margin: "0 4px", marginTop: "20px" }}
        >
          <fieldset disabled={isForm}>
            {this.renderInput(
              "email",
              "Email",
              "email",
              true,
              isInput,
              inputClass
            )}
            {this.renderTextarea("message", "Message", 5)}
            {this.renderButton("Send", {
              marginTop: "8px",
              width: "100%",
              background: "#6e00ff",
            })}
          </fieldset>
        </form>
      </div>
    );

    return (
      <InfoModal
        data={feedback}
        onExit={this.props.onExit}
        toOpen={this.props.toOpen}
        headerText={"Feedback"}
      />
    );
  }
}

export default Feedback;
