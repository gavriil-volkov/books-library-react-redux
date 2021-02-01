import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../redux/actionCreators/books'
import style from './style.module.css'
import { storage } from '../../firebase/firebase'
import dayjs from 'dayjs'
import 'dayjs/locale/ru/'


function List() {
  const books = useSelector(state => state.books)
  const colors = useSelector(state => state.colors)
  const sortType = useSelector(state => state.typeOfSort)

  const prevBooksState = useRef(books)
  const prevSortState = useRef(sortType)

  console.log(books)

  useEffect(() => {
    if ((JSON.stringify(books) !== JSON.stringify(prevBooksState.current))
      || (sortType !== prevSortState.current)) {
      switch (sortType) {
        case 'TITLE':
          dispatch(
            AC.sortByTitle(
              books.sort((a, b) => a.title > b.title ? 1 : -1).slice()
            )
          )
          break;
        case 'YEAR':
          dispatch(
            AC.sortByYear(
              books.sort((a, b) => a.publicationYear > b.publicationYear ? 1 : -1).slice()
            )
          )
          break
        default:
          break;
      }
      prevBooksState.current = books
      prevSortState.current = sortType
    }

  }, [sortType, books])

  const ref = useRef()

  const addPhoto = event => {
    setImage(event.target.files[0])
  }

  const [image, setImage] = useState('')

  const [editBookById, setEditBookById] = useState('')

  const [progress, setProgress] = useState(0)

  const dispatch = useDispatch()

  function editHandler(event, id) {
    event.preventDefault()
    setEditBookById('')
    dispatch(AC.editBook(
      event.target.title.value,
      event.target.authorName.value,
      event.target.authorSurname.value,
      event.target.numberOfPages.value,
      event.target.publishingHouse.value,
      event.target.publicationYear.value,
      event.target.releaseDate.value,
      event.target.isbn.value,
      id
    ))
  }

  const deleteBook = (id) => {
    dispatch(AC.deleteBook(id))
  }

  const deleteImg = (img) => {
    dispatch(AC.deleteImg(img))
  }

  const sortByYear = () => {
    dispatch(
      AC.changeSortType(
        'YEAR'
      ),
      changeButtonColorByYear()
    )
  }

  const sortByTitle = () => {
    dispatch(
      AC.changeSortType(
        'TITLE'
      ),
      changeButtonColorByTitle()
    )
  }

  const changeButtonColorByTitle = () => {
    dispatch(AC.changeButtonColorByTitle({
      byTitle: 'btn btn-primary me-3 mb-3 btn-sm',
      byDate: 'btn btn-outline-primary me-3 mb-3 btn-sm'
    }))
  }

  const changeButtonColorByYear = () => {
    dispatch(AC.changeButtonColorByYear({
      byTitle: 'btn btn-outline-primary me-3 mb-3 btn-sm',
      byDate: 'btn btn-primary me-3 mb-3 btn-sm'
    }))
  }

  const handlerSubmit = (event, id) => {
    event.preventDefault()
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            dispatch(AC.changeBookImg(
              url, id
            ))
            setProgress(0)
          })
      }
    )
  }

  function isbnHandler(event) {
    let reg = /[\D]+/
    if (reg.test(event.target.value)) {
      event.target.value = ''
    }
  }

  const booksToRender = books.length ? books.map((book, index) => {
    const bookToRender = editBookById === book.id
      ?
      <div key={book.id} className="card col-md-4">
        <div className="card-body">
          {book.img && book.img ?
            <div className={style.imgBlock} style={{ backgroundImage: `url(${book.img})` }}></div>
            :
            <div className={style.imgBlock} style={{ backgroundImage: "url(https://palatka-online.ru/image/cache/catalog/Products/7/age-cache-placeholder-1120x1245-800x800.png)" }}></div>
          }
          {book.img && book.img ?
            <button onClick={() => deleteImg(book.img)} type="submit" className="btn btn-warning mt-3">Удалить изображение</button> :
            <form onSubmit={(event) => handlerSubmit(event, book.id)}>
              <div className="editInputDiv"><input onChange={addPhoto} className="form-control userPic changePhoto" type="file" ref={ref} required />
                <button type="submit" className="btn btn-primary mt-3">Загрузить изображение</button></div>
            </form>
          }
          {progress ?
            <div className="mt-3 mb-2">
              <progress value={progress} max="100" />
            </div>
            : ''}
          <form onSubmit={(event) => editHandler(event, book.id)} className="mt-3 mb-3">
            <div className="editInputDiv">
              <span>Название книги*</span>
              <input name="title" type="text" maxLength="30" className="form-control editInput" defaultValue={book.title} placeholder="Макс. 30 символов" required />
            </div>
            <div className="editInputDiv">
              <span>Имя автора*</span>
              <input name="authorName" type="text" maxLength="20" className="form-control editInput" defaultValue={book.authors[0].authorName} placeholder="Макс. 20 символов" required />
            </div>
            <div className="editInputDiv">
              <span>Фамилия автора*</span>
              <input name="authorSurname" type="text" maxLength="20" className="form-control editInput" defaultValue={book.authors[0].authorSurname} placeholder="Макс. 20 символов" required />
            </div>
            <div className="editInputDiv">
              <span>Количество страниц*</span>
              <input name="numberOfPages" type="number" min="0" max="10000" className="form-control editInput" defaultValue={book.numberOfPages} placeholder="Макс. 10000" required />
            </div>
            <div className="editInputDiv">
              <span>Издательство</span>
              <input name="publishingHouse" type="text" maxLength="30" className="form-control editInput" defaultValue={book.publishingHouse} placeholder="Макс. 30 символов" />
            </div>
            <div className="editInputDiv">
              <span>Год публикации</span>
              <input name="publicationYear" type="number" min="1800" className="form-control editInput" defaultValue={book.publicationYear} placeholder="1800 - 2021" />
            </div>
            <div className="editInputDiv">
              <span>Дата выхода в тираж</span>
              <input name="releaseDate" type="date" min="1800-01-01" className="form-control editInput" defaultValue={book.releaseDate} />
            </div>
            <div className="editInputDiv">
              <span>ISBN</span>
              <input onChange={isbnHandler} name="isbn" maxLength="13" type="text" className="form-control editInput" defaultValue={book.isbn} placeholder="Макс. 13 цифр" />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Сохранить</button>
          </form>
        </div>
      </div>
      :
      <div key={book.id} className="card col-md-4">
        <div className="card-body">
          {book.img && book.img ?
            <div className={style.imgBlock} style={{ backgroundImage: `url(${book.img})` }}></div>
            :
            <div className={style.imgBlock} style={{ backgroundImage: "url(https://palatka-online.ru/image/cache/catalog/Products/7/age-cache-placeholder-1120x1245-800x800.png)" }}></div>
          }
          <hr />
          <h5 className="card-title">{book.title}</h5>
          {book.authors.map(el => (
            <h6 key={el.authorName} className="card-subtitle mb-3 text-muted">{el.authorName}{' '}{el.authorSurname}</h6>
          ))}
          <p className="card-text mt-3"><strong>Количество страниц: </strong>{book.numberOfPages}</p>
          {book.publishingHouse && book.publishingHouse ? <p className="card-text"><strong>Издательство: </strong>{book.publishingHouse}</p> : ''}
          {book.publicationYear && book.publicationYear ?
            <p className="card-text">
              <strong>Год публикации: </strong>
              {book.publicationYear}
            </p> : ''}
          {book.releaseDate && book.releaseDate ?
            <p className="card-text">
              <strong>Дата выхода в тираж: </strong>
              {dayjs(book.releaseDate).locale(`ru`).format(`DD MMM YYYY г.`)}
            </p> : ''}
          {book.isbn && book.isbn ? <p className="card-text"><strong>ISBN: </strong>{book.isbn}</p> : ''}
          <button onClick={() => setEditBookById(book.id)} type="button" className="btn btn-success me-3"><i className="bi bi-pencil"></i></button>
          <button onClick={() => deleteBook(book.id)} type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button>
        </div>
      </div >
    return bookToRender;
  }) :
    <h5 className="card-title mt-5">Список книг пуст</h5>
  return (
    <>
      {books.length ?
        <div className="mb-3">
          <p>Сортировать список:</p>
          <button type="submit" className={colors[0].byTitle} onClick={sortByTitle}>По названию</button>
          <button type="submit" className={colors[0].byDate} onClick={sortByYear}>По году публикации</button>
        </div>
        : ''}
      <div className="row">
        {booksToRender}
      </div>
    </>
  )
}

export default List
