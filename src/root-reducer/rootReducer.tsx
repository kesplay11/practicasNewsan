// import { calendarReducer } from './calendarReducer';
// import { uiReducer } from "./uiReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { AndonPlacasSlice } from "../andon-placas/reducers/AndonPlacas.slice";


// import { authenticationSlice } from "./AuthenticationSlice";

export const rootReducer = combineReducers({
  andonPlacas: AndonPlacasSlice.reducer
})
