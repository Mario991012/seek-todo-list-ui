import axios from "axios";
import {
  CREATE_USER,
  LOGIN_USER,
} from "../environment";

const API_URL = process.env.REACT_APP_API_URL || "";

export const createUser = async (
  username: string,
  password: string,
) => {
  try {
    const response = await axios.post(
      CREATE_USER(API_URL),
      { username, password },
    );

    return response.data;
  } catch (error) {
    throw new Error("Error while creating user");
  }
};

export const loginUser = async (
  username: string,
  password: string,
  token: string
) => {
  try {
    const response = await axios.post(
      LOGIN_USER(API_URL),
      { username, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error while log in");
  }
};