import { configureStore } from "@reduxjs/toolkit";
import universitiesReducer from "../features/universities/store/universities.slice";
const store = configureStore({
  reducer: {
    universities: universitiesReducer,
  },
});
export default store;
