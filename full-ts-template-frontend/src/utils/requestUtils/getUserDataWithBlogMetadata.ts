import axios from "../axios";

export default async function getUserDataWithBlogsMetadata(
  userName: string | null
) {
  if (!userName) {
    return null;
  }
  const response = axios
    .get(
      `http://localhost:8000/api/v1/data/userdatawithblogmetadata/${userName}`
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
  return response;
}
