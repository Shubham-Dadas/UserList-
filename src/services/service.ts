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

export const addUser = async (
  name: string,
  email: string,
  gender: string,
  status: string
) => {
  try {
    const res = await axios.post(
      API_URL,
      { name, gender, email, status },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return res.status;
  } catch (error: any) {
    return error.response.status;
  }
};
