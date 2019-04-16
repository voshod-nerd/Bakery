import store from "./store/index";
import { loginUser } from "./actions/index";
window.store = store;
window.loginUser = loginUser;