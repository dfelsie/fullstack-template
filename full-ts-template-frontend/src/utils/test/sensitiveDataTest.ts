import axios from "../axios";

const sensitiveDataTest = async () => {
  return await axios
    .get("http://localhost:8000/api/v1/data/sensitive")
    .catch((e) => {
      console.log(e);
    });
};

export default sensitiveDataTest;
