import { Component } from "react";
import InfoModal from "./common/infoModal";

class Feedback extends Component {
  render() {
    const feedback = (
      <div>
        <h6>
          We appreciate you and your time given to us. Please give genuine
          feedbacks.
        </h6>
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
