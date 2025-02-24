import axios from "axios";
import { accessToken } from "../constants";

const API_URL = "https://gorest.co.in/public/v2/users";

export const getUsers = (pageNo: number, noOfData: number) => {
  const url = `${API_URL}?page=${pageNo}&per_page=${noOfData}`;

  return axios({
    url,
    headers: { Authorization: `Bearer ${accessToken}` },
    method: 'get'
  });
};
