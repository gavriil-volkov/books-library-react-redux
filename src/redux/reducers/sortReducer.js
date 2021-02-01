import { TYPE_OF_SORT } from "../types/types";

function sortReducer(state = '', action) {
  switch (action.type) {
    case TYPE_OF_SORT:
      return action.payload
  
    default:
      return state
  }
}

export default sortReducer
