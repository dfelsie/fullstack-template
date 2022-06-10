import axios from "../axios";

export default async function addBlogPost(
  blogContent: string,
  blogTitle: string
) {
  return axios
    .post("http://localhost:8000/api/v1/data/addblog", {
      content: blogContent,
      title: blogTitle,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
