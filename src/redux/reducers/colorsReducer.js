import * as TYPES from '../types/types'

function colorsReducer( colors = [], action) {
  switch (action.type) {

    case TYPES.CHANGE_BUTTON_COLOR_BY_TITLE:
      return [{
        byTitle: action.payload.byTitle,
        byDate: action.payload.byDate,
      }]

      case TYPES.CHANGE_BUTTON_COLOR_BY_YEAR:
      return [{
        byTitle: action.payload.byTitle,
        byDate: action.payload.byDate,
      }]

    default:
      return colors
  }
}

export default colorsReducer
