import axios from "axios";
import { accessToken } from "../constants";

const API_URL = "https://gorest.co.in/public/v2/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
