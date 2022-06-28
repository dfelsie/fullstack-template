import axios from "../axios";

export default async function getUserDataWithBlogsMetadata(
  userName?: string,
  page?: number,
  limit?: number
) {
  if (!userName) {
    return null;
  }
  const pageQuery = page ? page : 1;
  const limitQuery = limit ? limit : 10;
  const response = axios
    .get(
      `http://localhost:8000/api/v1/data/userdatawithblogmetadata/${userName}?page=${pageQuery}&limit=${limitQuery}`
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
  return response;
}
