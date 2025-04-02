import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; // Example reducer
import authReducer from "./reducer/auth";
//import vendorsReducer from './slices/vendorsSlice';
import vendorsReducer from './reducer/vendors';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth :authReducer,
    vendors: vendorsReducer
  },
});
