import InfoModal from "./common/infoModal";

const Privacy = ({ toOpen, onExit }) => {
  const privacy = (
    <div>
      <ul>
        <li>
          Users any information as stated in terms forum are NOT shared with any
          individual or group. Everything remains silent to us.
        </li>
        <li>
          Emails are used to send movies suggestions only and user can
          unsubscribe this service at any point of time.
        </li>
        <li>
          Watchlater and history are NOT recorded if users are not signed.
        </li>
        <li>
          Also searches are NOT documented. It remains private to the user.
        </li>
      </ul>
    </div>
  );
  return (
    <InfoModal
      data={privacy}
      onExit={onExit}
      toOpen={toOpen}
      headerText={"Privacy"}
    />
  );
};

export default Privacy;
