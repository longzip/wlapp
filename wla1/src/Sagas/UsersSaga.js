import { put, call } from "redux-saga/effects";
import LoginsActions from "../Stores/LoginedUser/Actions";
import { usersService } from "../Services/UsersServices";

export function* login({ username, password, remember }) {
  try {
    yield put(LoginsActions.loginLoading());
    const user = yield call(usersService.login, { username, password });
    if (user) {
      yield put(LoginsActions.loginSuccess(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
    } else {
      yield put(
        LoginsActions.loginFailure("Tên đăng nhập hoặc mật khẩu không đúng.")
      );
    }
  } catch {
    yield put(
      LoginsActions.loginFailure("Tên đăng nhập hoặc mật khẩu không đúng.")
    );
  }
}
