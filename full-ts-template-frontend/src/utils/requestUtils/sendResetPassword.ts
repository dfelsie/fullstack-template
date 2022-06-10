import axios from "../axios";

export default async function sendResetPassword(
  token: string,
  newPassword: string
) {
  axios
    .post("http://localhost:8000/api/v1/auth/changepassword", {
      token: token,
      newPassword: newPassword,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
