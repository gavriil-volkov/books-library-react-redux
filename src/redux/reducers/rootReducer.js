import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import colorsReducer from "./colorsReducer";
import sortReducer from "./sortReducer";

const rootReducer = combineReducers({
  colors: colorsReducer,
  books: booksReducer,
  typeOfSort: sortReducer
})

export default rootReducer
