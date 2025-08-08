import axios from "axios";
import { api, API_BASE_URL } from "../../config/Api";
import {
  FIND_USER_BY_ID_FAILURE,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./ActionType";

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("login user", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
    console.log("Signup User", data);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message });
  }
};

export const getUserProfile = (jwt) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`);

    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FIND_USER_BY_ID_FAILURE, payload: error.message });
  }
};

export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, reqData);
    console.log("update user", data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`);
    console.log("followed user", data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};

// Action to handle user login/registration via Google
export const googleLogin = (userData) => async (dispatch) => {
  try {
    // We send the user data from Google to our backend.
    // The backend will check if a user with this email already exists.
    // If yes, it logs them in. If no, it creates a new account.
    const { data } = await api.post(`/auth/google`, userData);

    console.log("Logged in with Google: ", data);

    // The backend should return a JWT token upon successful login/registration.
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    } else {
      // This case might handle registration if your backend sends a different response
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("catch error - google login", error);
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("jwt");

  dispatch({ type: LOGOUT, payload: null });
};

export const searchUser = (query) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/search?query=${query}`);
    console.log("search user:", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("catch error - search user", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error.message });
  }
};
