import axios from "../axios";

const getUserList = async (page?: number, limit?: number) => {
  const pageQuery = page ? page : 1;
  const limitQuery = limit ? limit : 10;
  return await axios
    .get(
      `http://localhost:8000/api/v1/data/userlist?page=${pageQuery}&limit=${limitQuery}`
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default getUserList;
