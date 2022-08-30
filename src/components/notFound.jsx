import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "VIDLY | OOPS";
  }, []);
  return (
    <>
      <h1 style={{ color: "crimson" }}>OOPS ERROR : 404</h1>
      <h2 style={{ color: "gray" }}>Page not found</h2>
    </>
  );
};

export default NotFound;
