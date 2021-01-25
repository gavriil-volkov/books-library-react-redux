import * as TYPES from '../types/types'

function booksReducer(books = [], action) {
  switch (action.type) {

    case TYPES.ADD_NEW_BOOK:
      return [action.payload, ...books]

    case TYPES.DELETE_BOOK:
      return books.filter(element => element.id !== action.payload)

    case TYPES.EDIT_BOOK:
      return books.map((book) => {
        if (book.id === action.payload.id) {
          return {
            ...book,
            title: action.payload.title,
            author: action.payload.author,
            numberOfPages: action.payload.numberOfPages,
            publishingHouse: action.payload.publishingHouse,
            year: action.payload.year
          }
        }
        return book
      })

    case TYPES.SORT_BY_YEAR:
      return books.slice().sort((a, b) => a.year > b.year ? 1 : -1)

    case TYPES.SORT_BY_ASC:
      return books.slice().sort((a, b) => a.title > b.title ? 1 : -1)

    default:
      return books
  }
}

export default booksReducer
