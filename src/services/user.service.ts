import axios from "axios";
import {
  CREATE_USER,
  LOGIN_USER,
} from "../environment";
import { TokenService } from "../core/services/token.service";

const API_URL = import.meta.env.VITE_API_URL || "";
const tokenService = new TokenService();

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
) => {
  try {
    const response = await axios.post(
      LOGIN_USER(API_URL),
      { username, password },
    );

    if(response?.data?.data?.access_token) {
      tokenService.saveToken(response?.data?.data?.access_token)
    }

    return response.data;
  } catch (error) {
    throw new Error("Error while log in");
  }
};

export const logoutUser = async () => {
  try {
    tokenService.deleteToken()
    return true;
  } catch (error) {
    throw new Error("Error while log out");
  }
};