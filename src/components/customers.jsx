// Customers
import { useEffect } from "react";

const Customers = () => {
  useEffect(() => {
    document.title = "VIDLY | Customers";
  }, []);

  return <h1>Customers</h1>;
};

export default Customers;
