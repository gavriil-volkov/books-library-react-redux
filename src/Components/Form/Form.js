import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { addNewBook } from "../../redux/actionCreators/books"
import { storage } from '../../firebase/firebase'

function Form() {
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState(0)

  const ref = useRef()

  const handlerFileChange = event => {
    setImage(event.target.files[0])
  }

  function handlerChange({ target: { value, name } }) {
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

  const [inputs, setInputs] = useState([{
    placeholder: "Название книги* (макс. 30 символов)",
    value: '',
    name: 'title',
    maxlength: '30',
    type: 'text',
  }, {
    placeholder: "Автор* (макс. 45 символов)",
    value: '',
    name: 'author',
    maxlength: '45',
    type: 'text',
  }, {
    placeholder: "Колличество страниц* (макс. 10000)",
    value: '',
    name: 'numberOfPages',
    maxlength: '4',
    type: 'number',
    min: "0",
    max: "10000",
  }, {
    placeholder: "Издательство* (макс. 30 символов)",
    value: '',
    name: 'publishingHouse',
    maxlength: '30',
    type: 'text'
  }, {
    placeholder: "Год публикации* (1800 - 2021)",
    value: '',
    name: 'year',
    maxlength: '4',
    type: 'number',
    min: "1800",
    max: "2021"
  }])

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
              ...inputs
                .reduce((acc, el) => ({
                  ...acc, [el.name]: el.value
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
      <form onSubmit={handlerSubmit} className="mt-3 mb-5">
        {inputs.map(el => (<input key={el.placeholder} type={el.type} maxlength={el.maxlength} name={el.name} onChange={handlerChange} value={el.value} className="form-control" placeholder={el.placeholder} min={el.min} max={el.max} required />))}
        <input onChange={handlerFileChange} type="file" className="form-control userPic changePhoto" ref={ref} required />
        {progress ? <div className="mt-3 mb-2"><progress value={progress} max="100" /></div> : ''}
        <div><small>*Поля обязательные для заполнения</small></div>
        <button type="submit" className="btn btn-primary mt-3 btn-lg">Добавить книгу</button>
      </form>
    </>
  )
}

export default Form;
