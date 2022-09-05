const CopyRight = ({ showVersion = true }) => {
  const date = new Date().getFullYear();

  return (
    <ul className="list-unstyled small text-muted">
      {showVersion && (
        <li className="mb-3" style={{ color: "white" }}>
          Currently <i>Beta</i> Version
        </li>
      )}
      <li className="mb-2" style={{ color: "white" }}>
        &copy;{" "}
        <a
          href="https://www.linkedin.com/in/giteshchauhan20/"
          target="_blank"
          rel="noopener noreferrer"
          className="a-design myFont"
        >
          giteshChauhan
        </a>
        {date}
      </li>
    </ul>
  );
};

export default CopyRight;
