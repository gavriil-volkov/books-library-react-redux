import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../redux/actionCreators/books'
import style from './style.module.css'

function List() {
  const books = useSelector(state => state.books)

  const [editBookById, setEditBookById] = useState('')

  const dispatch = useDispatch()

  function editHandler(event, id) {
    event.preventDefault()
    setEditBookById('')
    dispatch(AC.editBook(
      event.target.title.value,
      event.target.author.value,
      event.target.numberOfPages.value,
      event.target.publishingHouse.value,
      event.target.year.value,
      id
    ))
  }

  const deleteBook = (id) => {
    dispatch(AC.deleteBook(id))
  }

  const sortByYear = (year) => {
    dispatch(AC.sortByYear(year))
  }

  const sortByAsc = (title) => {
    dispatch(AC.sortByAsc(title))
  }

  const booksToRender = books.length ? books.map((book) => {
    const bookToRender = editBookById === book.id
      ?
      <div key={book.id} className="card col-12 col-md-4">
        <div className="card-body">
          {book.img && book.img ? <div className={style.imgBlock} style={{ backgroundImage: `url(${book.img})` }}></div> : ''}
          <form onSubmit={(event) => editHandler(event, book.id)} className="mt-3 mb-3">
            <input name="title" type="text" className="form-control" defaultValue={book.title} />
            <input name="author" type="text" className="form-control" defaultValue={book.author} />
            <input name="numberOfPages" type="text" className="form-control" defaultValue={book.numberOfPages} />
            <input name="publishingHouse" type="text" className="form-control" defaultValue={book.publishingHouse} />
            <input name="year" type="text" className="form-control" defaultValue={book.year} />
            <button type="submit" className="btn btn-primary mt-3">Сохранить</button>
          </form>
        </div>
      </div>
      :
      <div key={book.id} className="card col-12 col-md-4">
        <div className="card-body">
          {book.img && book.img ? <div className={style.imgBlock} style={{ backgroundImage: `url(${book.img})` }}></div> : ''}
          <hr />
          <h5 className="card-title">{book.title}</h5>
          <h6 className="card-subtitle mb-3 text-muted">{book.author}</h6>
          <p className="card-text mt-3"><strong>Количество страниц: </strong>{book.numberOfPages}</p>
          <p className="card-text"><strong>Издательство: </strong>{book.publishingHouse}</p>
          <p className="card-text"><strong>Дата написания: </strong>{book.year}</p>
          <button onClick={() => setEditBookById(book.id)} type="button" className="btn btn-success me-3"><i className="bi bi-pencil"></i></button>
          <button onClick={() => deleteBook(book.id)} type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
        </div>
      </div>
    return bookToRender;
  }) :
    <h5 className="card-title mt-5">Список книг пуст</h5>

  return (
    <>
      {books.length ?
        <div className="mb-3">
          <p>Сортировать список:</p>
          <button type="submit" className="btn btn-outline-primary me-3 mb-3 btn-sm" onClick={sortByAsc}>По названию</button>
          <button type="submit" className="btn btn-outline-primary mb-3 btn-sm" onClick={sortByYear}>По дате</button>
        </div>
        : ''}
      <div className="row">
        {booksToRender}
      </div>
    </>
  )
}

export default List
