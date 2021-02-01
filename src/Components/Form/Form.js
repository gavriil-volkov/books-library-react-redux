import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { addNewBook } from "../../redux/actionCreators/books"
import { storage } from '../../firebase/firebase'

function Form() {
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState(0)
  const [inputs, setInputs] = useState([{
    title: "Название книги*",
    placeholder: "Макс. 30 символов",
    value: '',
    name: 'title',
    maxLength: '30',
    type: 'text',
    required: 'required',
    className: 'col-md-12'
  }, {
    title: "Имя автора*",
    placeholder: "Макс. 20 символов",
    value: '',
    name: 'authorName',
    maxLength: '20',
    type: 'text',
    required: 'required',
    className: 'col-md-6'
  }, {
    title: "Фамилия автора*",
    placeholder: "Макс. 20 символов",
    value: '',
    name: 'authorSurname',
    maxLength: '20',
    type: 'text',
    required: 'required',
    className: 'col-md-6'
  }, {
    title: "Количество страниц* ",
    placeholder: "Макс. 10000",
    value: '',
    name: 'numberOfPages',
    type: 'number',
    required: 'required',
    min: "0",
    max: "10000",
    className: 'col-md-4'
  }, {
    title: "Издательство",
    placeholder: "Макс. 30 символов",
    value: '',
    name: 'publishingHouse',
    maxLength: '30',
    type: 'text',
    className: 'col-md-4'
  }, {
    title: "Год публикации",
    placeholder: "1800 - 2021",
    value: '',
    name: 'publicationYear',
    type: 'number',
    min: '1800',
    max: '2021',
    className: 'col-md-4'
  }, {
    title: "Дата выхода в тираж",
    value: '',
    name: 'releaseDate',
    type: 'date',
    min: '1800-01-01',
    className: 'col-md-4'
  }, {
    title: "ISBN",
    placeholder: "Макс. 13 цифр",
    value: '',
    name: 'isbn',
    minLength: '2',
    maxLength: '13',
    type: 'text',
    className: 'col-md-4'
  }])

  const ref = useRef()

  const handlerFileChange = event => {
    setImage(event.target.files[0])
  }

  function handlerChange({ target: { value, name } }) {
    let reg = /[\D]+/
    if (reg.test(value) && name === "isbn") {
      value = ''
    }
    setInputs(prev => prev.map(el => {
      if (el.name === name) {
        return {
          ...el,
          value
        }
      }
      return el
    }))
  }

  const dispatch = useDispatch()

  const handlerSubmit = (event) => {
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
            dispatch(addNewBook({
              ...inputs.reduce((acc, el) => ({
                ...acc, [el.name]: el.value,
              }), {}),
              img: url
            }))
            setInputs(prev => prev.map(el => ({ ...el, value: '' })))
            ref.current.value = ""
            setProgress(0)
          })
      }
    )
  }
  return (
    <>
      <h1>Библиотека книг 📚</h1>
      <h2 className="mt-3 mb-5">React(Hooks) + Redux + Firebase + LocalStorage</h2>
      <form onSubmit={handlerSubmit} className="mt-3 mb-5 row g-3">
        {inputs.map(el => (
          <div className={el.className} key={el.title}>
            <h4 className="inputTitle">{el.title}</h4>
            <input
              className="form-control"
              onChange={handlerChange}
              name={el.name}
              type={el.type}
              value={el.value}
              maxLength={el.maxLength}
              placeholder={el.placeholder}
              min={el.min}
              max={el.max}
              required={el.required}
            />
          </div>
        ))}
        <div className="col-md-4 d-flex flex-column align-items-center">
          <h4 className="inputTitle">Выбрать изображение*</h4>
          <input onChange={handlerFileChange} type="file" className="form-control userPic changePhoto col-md-4" ref={ref} required />
        </div>
        {progress ?
          <div className="mt-3 mb-2">
            <progress value={progress} max="100" />
          </div>
          : ''}
        <div><small>*Поля обязательные для заполнения</small></div>
        <button type="submit" className="btn btn-primary mt-3 btn-lg">Добавить книгу</button>
      </form>
    </>
  )
}

export default Form;
