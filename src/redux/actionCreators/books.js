import * as TYPES from '../types/types'

export function addNewBook({ title, authorName, authorSurname, numberOfPages, publishingHouse, publicationYear, releaseDate, isbn, img }) {
  return {
    type: TYPES.ADD_NEW_BOOK,
    payload: {
      title,
      authors:
        [{
          authorName,
          authorSurname,
        }],
      numberOfPages,
      publishingHouse,
      publicationYear,
      releaseDate,
      isbn,
      img,
      id: Date.now().toString()
    }
  }
}

export function editBook(title, authorName, authorSurname, numberOfPages, publishingHouse, publicationYear, releaseDate, isbn, id) {
  return {
    type: TYPES.EDIT_BOOK,
    payload: {
      title,
      authorName,
      authorSurname,
      numberOfPages,
      publishingHouse,
      publicationYear,
      releaseDate,
      isbn,
      id,
    }
  }
}

export function deleteBook(id) {
  return {
    type: TYPES.DELETE_BOOK,
    payload: id
  }
}

export function deleteImg(img) {
  return {
    type: TYPES.DELETE_IMG,
    payload: { img }
  }
}

export function changeBookImg(img, id) {
  return {
    type: TYPES.CHANGE_IMG,
    payload: { img, id }
  }
}

export function changeSortType(sort) {
  return {
    type: TYPES.CHANGE_SORT_TYPE,
    payload: sort
  }
}

export function sortByYear(sort) {
  return {
    type: TYPES.SORT_BY_YEAR,
    payload: sort
  }
}

export function sortByTitle(sort) {
  return {
    type: TYPES.SORT_BY_TITLE,
    payload: sort
  }
}

export function changeButtonColorByTitle(color) {
  return {
    type: TYPES.CHANGE_BUTTON_COLOR_BY_TITLE,
    payload: color
  }
}

export function changeButtonColorByYear(color) {
  return {
    type: TYPES.CHANGE_BUTTON_COLOR_BY_YEAR,
    payload: color
  }
}

