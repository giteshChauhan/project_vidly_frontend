import axios from "axios";

export const getIP = async () => {
  try {
    const { data: ip } = await axios.get("https://api.ipify.org/?format=json");
    return ip;
  } catch (ex) {
    return null;
  }
};
