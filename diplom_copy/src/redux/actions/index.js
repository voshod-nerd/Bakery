import { LOGIN_USER,LOGOUT_USER,ADD_GOODS } from "../contstants/action-types";
export function loginUser(payload) {
  console.log("Hello LOGIN_USER");
  console.log(payload);
  console.log("Hello LOGIN_USER");
  return { type: LOGIN_USER, payload };
}
export function logOutUser(payload) {
  console.log("Hello LOGOUT_USER");
  console.log(payload);
  console.log("Hello LOGOUT");
  return { type: LOGOUT_USER, payload };
}
export function addGoods(payload) {
  console.log("Hello ADD_GOODS");
  console.log(payload);
  console.log("Hello ADD_GOODS");
  return { type: ADD_GOODS, payload };
}
