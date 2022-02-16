import axios from "axios";

import { userAction } from "./user-slice";

const baseUrl = `http://localhost:4000`;

export const createUser = (userDetails) => {
  return async (dispatch) => {
    const fetchPost = async () => {
      const response = await axios.post(`${baseUrl}/redminers/`, userDetails);

      if (response.status === 201) {
        return "User Created Successfully!";
      } else if (response.data.code === 422) {
        response.data.message = "Invalid input";
      }
      throw new Error(response.data.message || "Something went wrong!");
    };

    try {
      const data = await fetchPost();
      return data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
};

export const listUsers = () => {
  return async (dispatch) => {
    const fetchUsers = async () => {
      const response = await axios.get(`${baseUrl}/redminers/`);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else if (response.data.code === 422) {
        response.data.message = "Invalid Users or input";
      }
      throw new Error(response.data.message || "Something went wrong!");
    };

    try {
      const data = await fetchUsers();
      dispatch(userAction.listAllUsers(data));
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
};

export const updateUser = (_id, newData) => {
  return async (dispatch) => {
    const updatePost = async () => {
      const response = await axios.put(`${baseUrl}/redminers/${_id}/`, newData);
      if (response.status === 200) {
        return "Post Updated Successfully!";
      } else if (response.data.code === 422) {
        response.data.message = "Invalid Users or input";
      }
      throw new Error(response.data.message || "Something went wrong!");
    };

    try {
      const data = await updatePost();
      return data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
};
