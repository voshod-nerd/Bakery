import store from "./store/index";
import { loginUser,logOutUser,addGoods } from "./actions/index";
window.store = store;
window.loginUser = loginUser;
window.logOutUser = logOutUser;
window.addGoods=addGoods;