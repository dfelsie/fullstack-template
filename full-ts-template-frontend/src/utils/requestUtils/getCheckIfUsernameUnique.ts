import axios from "../axios";

export default async function getCheckIfUsernameUnique(username: string) {
  const response = axios
    .get(
      `http://localhost:8000/api/v1/data/checkifnameunique?username=${username}`
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
  return response;
}
