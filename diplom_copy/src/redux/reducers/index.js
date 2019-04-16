import { LOGIN_USER, LOGOUT_USER, ADD_GOODS } from "../contstants/action-types";
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
      user: action.payload,
      isAuthenticated: true
    });
  }
  if (action.type === LOGOUT_USER) {
    return Object.assign({}, state, {
      user: null,
      isAuthenticated: false
    });
  }
  if (action.type === ADD_GOODS) {   
  return {
    ...state,    
    shoplist: [...state.shoplist, action.payload]
    
};

}

return state;
}
export default rootReducer;