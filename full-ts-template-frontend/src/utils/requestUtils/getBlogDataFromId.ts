import axios from "../axios";

export default async function getBlogDataFromId(blogId: string) {
  const response = axios
    .get(`http://localhost:8000/api/v1/data/blogdata/?blogId=${blogId}`)
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
  return response;
}
