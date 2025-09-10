import { useState } from "react";

const StudentForm = () => {
  const [ state, setState ] = useState({name: '', age: 0});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulier submitted: " + state.name);
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setState({...state, [name]: value});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Student Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" min={0} max={150} />
      </div>

      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
