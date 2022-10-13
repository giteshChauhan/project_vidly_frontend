import { useEffect, useCallback, useState } from "react";
import moment from "moment/moment";

import SmallFooter from "./smallFooter";

import { getFeedback } from "../services/feedbackServices";
import { getHistory } from "../services/historyService";
import auth from "../services/authService";
import { getOS } from "../utils/os";
import { getIP } from "../utils/ip";

const Profile = ({ watchLaterSize }) => {
  const { name, email, country, date, ip } = auth.getCurrentUser();
  const [historySize, setHistorySize] = useState();
  const [currentIP, setCurrentIP] = useState();
  const [feedbacks, setFeedbacks] = useState([]);

  const instPanel = (l, r) => {
    return (
      <div>
        <span className="myTitle">{l}</span>
        {"  : "}
        <span style={{ color: "#e2dada" }}>{r}</span>
      </div>
    );
  };

  const setIP = useCallback(async () => {
    const { ip: currentIP } = await getIP();
    setCurrentIP(currentIP);
  }, [setCurrentIP]);

  const handleHistorySize = useCallback(async () => {
    const { data } = await getHistory();
    setHistorySize(data.length);
  }, [setHistorySize]);

  const handleFeedbacks = useCallback(async () => {
    const { data } = await getFeedback();
    setFeedbacks(data);
  }, [setFeedbacks]);

  useEffect(() => {
    handleHistorySize();
    handleFeedbacks();
    setIP();
  }, []);

  return (
    <>
      <div style={{ marginTop: "-30px" }}>
        <div style={{ marginBottom: "15px" }}>
          <div className="myModalFlex">
            <h4>User Details</h4>
            <div className="divider" />
            <span className="myTitle">{country.toUpperCase()}</span>
          </div>
          <div style={{ fontSize: "18px" }}>
            {instPanel("Email", email)}
            {instPanel("Username", name)}
          </div>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <h4>Account Details</h4>
          <div style={{ fontSize: "18px" }}>
            {instPanel("OS", getOS())}
            {instPanel("CurrentIP", currentIP)}
            {instPanel("RegisteredIP", ip)}
            {instPanel(
              "Registered On",
              moment(date).format("MMMM Do YYYY, h:mm:ss a")
            )}
          </div>
        </div>
        <div style={{ marginBottom: "7rem" }}>
          <h4>Activity Details</h4>
          <div style={{ fontSize: "18px" }}>
            {instPanel("Movies In WatchLater", watchLaterSize)}
            {instPanel("Movies Watched", historySize)}
            {instPanel("Feedbacks", feedbacks.length)}
            <div></div>
          </div>
          {feedbacks.length ? (
            feedbacks.map(({ feedback, addedOn, _id }) => {
              return (
                <div key={_id} style={{ marginTop: "5px", marginLeft: "5%" }}>
                  <span style={{ fontSize: "1.1rem", color: "#a1aebb" }}>
                    {"->" + moment(addedOn).format("MMMM Do YYYY")}
                  </span>
                  <span style={{ color: "#e2dada" }}>
                    {"    :  " + feedback}
                  </span>
                </div>
              );
            })
          ) : (
            <div
              className="myModal"
              style={{
                textAlign: "center",
                color: "#e2dada",
                marginTop: "10px",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>
                <span style={{ color: "white", fontSize: "1.5rem" }}>
                  Feedbacks :{" "}
                </span>
                Currently no feedback sent. Send feedbacks using feedback tag
                below 🤗
              </span>
            </div>
          )}
        </div>
      </div>
      <SmallFooter />
    </>
  );
};

export default Profile;
