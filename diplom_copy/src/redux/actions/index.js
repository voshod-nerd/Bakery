import { LOGIN_USER,LOGOUT_USER,ADD_GOODS,DELETE_GOODS,REDUCE_GOODS_COUNT,DELETE_ALL_GOODS } from "../contstants/action-types";
export function loginUser(payload) {
  return { type: LOGIN_USER, payload };
}
export function logOutUser(payload) {

  return { type: LOGOUT_USER, payload };
}
export function addGoods(payload) {
 
  return { type: ADD_GOODS, payload };
}
export function deleteGoodsFromShopList(payload) {

  return { type: DELETE_GOODS, payload };
}

export function reduceCountGoodsFromShopList(payload) { 
  return { type: REDUCE_GOODS_COUNT, payload };
}

export function deleteAllGoods(payload) { 
  return { type: DELETE_ALL_GOODS, payload };
}



