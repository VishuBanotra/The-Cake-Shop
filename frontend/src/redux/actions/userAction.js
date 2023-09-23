import axios from "axios";
import { server } from "../store";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const { data } = await axios.get(`${server}/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch({
      type: "loadUserSucess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.post(
      `${server}/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", data.token);

    dispatch({
      type: "loginRequestSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "loginRequestFail",
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    localStorage.removeItem("token");

    dispatch({
      type: "logoutSucess",
      payload: "Logged out Successfully",
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: "Logout Failed",
    });
  }
};


