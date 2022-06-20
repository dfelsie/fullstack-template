import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features//account/initial";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
