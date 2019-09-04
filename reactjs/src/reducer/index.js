import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import productsReducer from "./productsReducer";
import selectedProductReducer from "./selectedProductReducer";
import workcentersReducer from "./workcentersReducer";
import selectedWorkcenterReducer from "./selectedWorkcenterReducer";
import coursesReducer from "./coursesReducer";
import selectedCourseReducer from "./selectedCourseReducer";
import authorReducer from "./authorReducer";
import apiReducer from "./apiReducer";

export default combineReducers({
  workcentersReducer,
  selectedWorkcenterReducer,
  productsReducer,
  selectedProductReducer,
  coursesReducer,
  selectedCourseReducer,
  authorReducer,
  apiReducer,
  form: formReducer
});
