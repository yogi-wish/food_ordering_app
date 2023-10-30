import { createStore } from "redux";
import rootReducer from "./redux/Reducers/Main";

const store = createStore(rootReducer);

export default store;
