// Rentals
import { useEffect } from "react";

const Rentals = () => {
  useEffect(() => {
    document.title = "VIDLY | Rentals";
  }, []);

  return <h1>Rentals</h1>;
};

export default Rentals;
