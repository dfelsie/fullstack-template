import { useQuery } from "react-query";
import axios from "../axios";

const isLoggedIn = async () => {
  const data = await axios
    .get("http://localhost:8000/api/v1/auth/isloggedin", {})

    .catch((e) => {
      console.log(e);
    });
  return data;
};
export default isLoggedIn;
