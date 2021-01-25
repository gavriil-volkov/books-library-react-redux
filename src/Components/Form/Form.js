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
    placeholder: "Название книги*",
    value: '',
    name: 'title'
  }, {
    placeholder: "Автор*",
    value: '',
    name: 'author'
  }, {
    placeholder: "Колличество страниц*",
    value: '',
    name: 'numberOfPages'
  }, {
    placeholder: "Издательство*",
    value: '',
    name: 'publishingHouse'
  }, {
    placeholder: "Год публикации*",
    value: '',
    name: 'year'
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
        {inputs.map(el => (<input key={el.placeholder} name={el.name} onChange={handlerChange} value={el.value} type="text" className="form-control" placeholder={el.placeholder} required />))}
        <input onChange={handlerFileChange} type="file" className="form-control userPic changePhoto" ref={ref} required />
        {progress ? <div className="mt-3 mb-2"><progress value={progress} max="100" /></div> : ''}
        <div><small>*Поля обязательные для заполнения</small></div>
        <button type="submit" className="btn btn-primary mt-3 btn-lg">Добавить книгу</button>
      </form>
    </>
  )
}

export default Form;
