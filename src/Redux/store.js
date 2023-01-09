import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./Reducer";
const store = configureStore({
  reducer: {
    weatherSlice,
  },
});
export default store;
