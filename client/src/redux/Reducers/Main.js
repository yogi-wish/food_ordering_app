import { combineReducers } from "redux";
import CartReducer from "./Reducer";
import { GetDataReducer } from "./GetdataReducer";


const rootReducer = combineReducers({
  CartReducer: CartReducer,
  GetDataReducer:GetDataReducer
});

export default rootReducer;
