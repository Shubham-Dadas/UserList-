import axios from "axios";
import { accessToken } from "../constants";

const API_URL = "https://gorest.co.in/public/v2/users";

export const getUsers = (pageNo: number, pageSize: number) => {
  const url = `${API_URL}?page=${pageNo}&per_page=${pageSize}`;

  return axios({
    url,
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "get",
  });
};
