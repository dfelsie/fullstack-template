import axios from "./axios";

export default async function sendResetPasswordRequest(email: string) {
  axios
    .post("http://localhost:8000/api/v1/auth/requestpasswordchange", {
      email: email,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
