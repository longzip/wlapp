import * as ActionType from "./ActionType";

import fetchClient from "../api/fetchClient";
import { ApiCallBeginAction, ApiCallErrorAction } from "./ApiAction";

export const loginUsersResponse = user => ({
  type: ActionType.LOGIN_USER_RESPONSE,
  user
});

export function loginUserAction(user) {
  return dispatch => {
    dispatch(ApiCallBeginAction());

    return fetchClient
      .post("login", user)
      .then(response => {
        if (response.data.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("user", JSON.stringify(response.data.result));
          localStorage.setItem("token", response.data.token);
          dispatch(loginUsersResponse(response.data.result));
        } else {
          throw "Khong xac dinh duoc token!";
        }
      })
      .catch(error => {
        throw error;
      });
  };
}
export const logoutUserResponse = () => ({
  type: ActionType.LOGOUT_USER_RESPONSE
});

export function logoutUserAction() {
  return dispatch => {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // location.replace("/");
    dispatch(logoutUserResponse());
  };
}
