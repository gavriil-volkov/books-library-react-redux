import { CHANGE_SORT_TYPE } from "../types/types";

function sortReducer(state = '', action) {
  switch (action.type) {
    case CHANGE_SORT_TYPE:
      return action.payload
  
    default:
      return state
  }
}

export default sortReducer
