import { useState } from "react";

import CopyRight from "./common/copyright";
import Feedback from "./feedback";
import Privacy from "./privacy";
import Terms from "./terms";

const SmallFooter = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleTermsExit = () => {
    setIsTermsOpen(false);
  };
  const handlePrivacyExit = () => {
    setIsPrivacyOpen(false);
  };
  const handleFeedbackExit = () => {
    setIsFeedbackOpen(false);
  };

  return (
    <div
      className="myModalFlex"
      style={{
        justifyContent: "center",
        borderTop: "1px solid #6e00ff",
        borderRadius: "10px",
        padding: "2rem 0 ",
      }}
    >
      <div
        className="a-design"
        style={{ marginRight: "15px" }}
        onClick={() => setIsTermsOpen(true)}
      >
        Terms
      </div>
      <div
        className="a-design"
        style={{ marginRight: "15px" }}
        onClick={() => setIsPrivacyOpen(true)}
      >
        Privacy
      </div>
      <div
        className="a-design"
        style={{ marginRight: "30px" }}
        onClick={() => setIsFeedbackOpen(true)}
      >
        Feedback
      </div>
      <CopyRight showVersion={false} />
      {isTermsOpen && <Terms toOpen={isTermsOpen} onExit={handleTermsExit} />}
      {isPrivacyOpen && (
        <Privacy toOpen={isPrivacyOpen} onExit={handlePrivacyExit} />
      )}
      {isFeedbackOpen && (
        <Feedback toOpen={isFeedbackOpen} onExit={handleFeedbackExit} />
      )}
    </div>
  );
};

export default SmallFooter;
