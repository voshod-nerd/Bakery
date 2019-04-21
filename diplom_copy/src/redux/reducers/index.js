import { LOGIN_USER, LOGOUT_USER, ADD_GOODS, DELETE_GOODS, REDUCE_GOODS_COUNT, DELETE_ALL_GOODS } from "../contstants/action-types";
const initialState = {
  user: null,
  isAuthenticated: false,
  shoplist: []
};
function rootReducer(state = initialState, action) {
  console.log('This is reducer');
  console.log(state);
  if (action.type === LOGIN_USER) {
    return Object.assign({}, state, {
      ...state,
      user: action.payload,
      isAuthenticated: true
    });
  }
  if (action.type === LOGOUT_USER) {
    return Object.assign({}, state, {
      ...state,
      user: null,
      isAuthenticated: false
    });
  }
  if (action.type === ADD_GOODS) {
    console.log("action.payload", action.payload);
    let prevShoplist = state.shoplist;
    let newState;
    console.log('state.shop.list', state.shoplist);
    let arIds = state.shoplist.map(v => { return v.id });
    console.log('arIds', arIds);
    if (arIds.includes(action.payload.id)) {
      newState = prevShoplist.map(value => {
        if (value.id === action.payload.id) {

          value.count = value.count + 1;
          return value;
        } else return value;
      })
    }
    else {
      action.payload.count = 1;
      newState = [...prevShoplist, action.payload]
      console.log("not element in array");
    }
    console.log('newState', newState);
    return {
      ...state,
      shoplist: newState

    };
  }

  if (action.type === DELETE_GOODS) {
    const newState = state.shoplist.filter(val => val.uuid !== action.payload.uuid);
    return {
      ...state,
      shoplist: newState

    };
  }

  if (action.type === REDUCE_GOODS_COUNT) {
    let prevState = state.shoplist;
    prevState = prevState.map(value => {
      if (value.id === action.payload.id) {

        value.count = value.count - 1;
        return value;
      } else return value;
    });

    let newState = prevState.filter(value => value.count > 0);
    return {
      ...state,
      shoplist: newState
    };
  }

  if (action.type === DELETE_ALL_GOODS) {
    console.log("DELETE_ALL_GOODS");
    return {
      ...state,
      shoplist: []
    };
  }



  return state;
}
export default rootReducer;