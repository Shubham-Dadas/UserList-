import axios from "axios";
import { accessToken } from "../constants";

const API_URL = "https://gorest.co.in/public/v2/users";

export const getUsers = async (pageNo: number, noOfData: number) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { page: pageNo, per_page: noOfData },
    });

    const totalUsers = parseInt(response.headers["x-pagination-total"] || response.headers["x-total-count"] || "2000");

    return { data: response.data, totalUsers };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { data: [], totalUsers: 0 }; 
  }
};
