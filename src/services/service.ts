import axios from "axios";
import { accessToken } from "../constants";
import { User } from "../Model/model";

const API_URL = "https://gorest.co.in/public/v2/users";

export const getUsers = (pageNo: number, pageSize: number) => {
  const url = `${API_URL}?page=${pageNo}&per_page=${pageSize}`;

  return axios({
    url,
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "get",
  });
};

export const addUser = async (user: User) => {
  try {
    const res = await axios.post(
      API_URL,
      {
        name: user.name,
        gender: user.gender,
        email: user.email,
        status: user.status,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res;
  } catch (error: any) {
    return error;
  }
};

export const editUser = async (user: User) => {
  try {
    const res = await axios.put(`${API_URL}/${user.id}`, user, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res;
  } catch (error: any) {
    return error;
  }
};
