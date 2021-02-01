import * as TYPES from '../types/types'

function booksReducer( books = [], action) {
  switch (action.type) {

    case TYPES.ADD_NEW_BOOK:
      return [action.payload, ...books]

    case TYPES.DELETE_BOOK:
      return books.filter(element => element.id !== action.payload)

    case TYPES.DELETE_IMG:
      return books.map((book) => {
        if (book.img === action.payload.img) {
          return {
            ...book,
            img: '',
          }
        }
        return book
      })

    case TYPES.CHANGE_IMG:
      return books.map((book) => {
        if (book.id === action.payload.id) {
          return {
            ...book,
            img: action.payload.img,
          }
        }
        return book
      })

    case TYPES.EDIT_BOOK:
      return books.map((book) => {
        if (book.id === action.payload.id) {
          return {
            ...book,
            title: action.payload.title,
            authors: [{
              authorName: action.payload.authorName,
              authorSurname: action.payload.authorSurname
            }],
            numberOfPages: action.payload.numberOfPages,
            publishingHouse: action.payload.publishingHouse,
            publicationYear: action.payload.publicationYear,
            releaseDate: action.payload.releaseDate,
            isbn: action.payload.isbn,
          }
        }
        return book
      })

    case TYPES.SORT_BY_YEAR:
      return action.payload

    case TYPES.SORT_BY_TITLE:
      return action.payload

    default:
      return books
  }
}

export default booksReducer
