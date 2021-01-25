import * as TYPES from '../types/types'

export function addNewBook({ title, author, numberOfPages, publishingHouse, year, img }) {
  return {
    type: TYPES.ADD_NEW_BOOK,
    payload: {
      title,
      author,
      numberOfPages,
      publishingHouse,
      year,
      img,
      id: Date.now().toString()
    }
  }
}

export function editBook(title, author, numberOfPages, publishingHouse, year, id) {
  return {
    type: TYPES.EDIT_BOOK,
    payload: {
      title,
      author,
      numberOfPages,
      publishingHouse,
      year,
      id
    }
  }
}

export function deleteBook(id) {
  return {
    type: TYPES.DELETE_BOOK,
    payload: id
  }
}

export function sortByYear() {
  return {
    type: TYPES.SORT_BY_YEAR,
  }
}

export function sortByAsc() {
  return {
    type: TYPES.SORT_BY_ASC,
  }
}
