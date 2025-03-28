import axios from "axios";
import {
  CREATE_TASK,
  FETCH_TASKS,
  UPDATE_TASK,
} from "../environment";
import { TASK_STATUS } from "../common/enums/task";

const API_URL = import.meta.env.VITE_API_URL || "";

export const fetchTasks = async (token: string) => {
  try {
    const response = await axios.get(FETCH_TASKS(API_URL), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Error while fetching tasks");
  }
};

export const createTask = async (
  title: string,
  description: string,
  token: string
) => {
  try {
    const response = await axios.post(
      CREATE_TASK(API_URL),
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error while creating task");
  }
};

export const updateTask = async (
  id: string,
  title: string,
  description: string,
  status: TASK_STATUS,
  token: string
) => {
  try {
    const response = await axios.put(
      UPDATE_TASK(API_URL, id),
      { title, description, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error while updating task");
  }
};