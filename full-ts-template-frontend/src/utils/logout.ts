import axios from "./axios";

const logout = async () => {
  return await axios
    .get("http://localhost:8000/api/v1/auth/logout")
    .then((res) => {
      //window.location.reload();
      return;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default logout;
