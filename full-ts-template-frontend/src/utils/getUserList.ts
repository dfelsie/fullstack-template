import axios from "./axios";

const logout = async () => {
  return await axios
    .get("http://localhost:8000/api/v1/data/userlist")
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default logout;
