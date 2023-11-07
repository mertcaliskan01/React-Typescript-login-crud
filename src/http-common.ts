import axios from "axios";

export default axios.create({
  baseURL: "http://www.developermert.site/nestapi",
  headers: {
    "Content-type": "application/json"
  }
});