import axios from "./axios";

export default async function getUserDataWithBlogs(userName: string) {
  const response = axios
    .post(`http://localhost:8000/api/v1/data/userdatawithblogs`, {
      userName: userName,
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
  return response;
}
