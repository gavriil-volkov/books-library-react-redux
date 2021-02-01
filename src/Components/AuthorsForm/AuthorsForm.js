const { useState, Fragment } = require("react");

function AuthorsForm() {
  const [inputFields, setInputFields] = useState([
    { authorName: '', authorSurname: '' }
  ]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "authorName") {
      values[index].authorName = event.target.value;
    } else {
      values[index].authorSurname = event.target.value;
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ authorName: '', authorSurname: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-3 mb-5 row g-3">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div>
              <div className="col-md-6">
                <label htmlFor="authorName">First Name</label>
                <input onChange={event => handleInputChange(index, event)}
                  type="text"
                  className="form-control"
                  id="authorName"
                  name="authorName"
                  value={inputField.authorName}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="authorSurname">Last Name</label>
                <input onChange={event => handleInputChange(index, event)}
                  type="text"
                  className="form-control"
                  id="authorSurname"
                  name="authorSurname"
                  value={inputField.authorSurname}
                />
              </div>
              </div>
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
      </form>
    </>
  )
}

export default AuthorsForm
