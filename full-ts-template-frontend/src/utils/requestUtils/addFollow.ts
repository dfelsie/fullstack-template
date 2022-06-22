import axios from "../axios";

export default async function addFollow(toFollowUserName: string) {
  return axios
    .post("http://localhost:8000/api/v1/data/addfollow", {
      toFollowUserName,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
