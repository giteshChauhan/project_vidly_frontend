import InfoModal from "./common/infoModal";

const Terms = ({ toOpen, onExit }) => {
  const terms = (
    <div>
      <ul>
        <li>
          Ensure that email entered is valid so suggetion of movies reaches you
          everytime.
        </li>
        <li>
          Username entered could be anything min 3 char long and less than 14
          chars.
        </li>
        <li>
          User account having invalid email or inappropriate username entered
          would be deleted forever.
        </li>
        <li>
          Information of user shared with us includes:
          <ul>
            <li>User email</li>
            <li>Hashed user password</li>
            <li>Username</li>
            <li>OS Details</li>
            <li>IP Address</li>
            <li>Movies/Trailers history</li>
            <li>Movies/Trailers in watchlater</li>
          </ul>
        </li>
        <li>
          This app/project upholds content only for entertainment purposes.
        </li>
        <li>
          We are not responsible for any social sensitive or intimate scenes in
          any movies/trailers hurting the feelings of any member of society,
          gender, race or age.
        </li>
      </ul>
    </div>
  );
  return (
    <InfoModal
      data={terms}
      onExit={onExit}
      toOpen={toOpen}
      headerText={"Terms & Conditions"}
    />
  );
};

export default Terms;
