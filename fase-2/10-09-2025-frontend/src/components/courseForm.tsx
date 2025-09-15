import { useState } from 'react';

const CourseForm = () => {
    const [state, setState] = useState({ name: '', maxStudents: 0 })

    const handleSubmit = (event) => {
        console.log("Formulier submitted" + state.name);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Course Name:</label>
                <input type="text" id="name" name="name" value={state.name} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="maxStudents">Max Students:</label>
                <input type="number" id="maxStudents" name="maxStudents" min={0} max={150} value={state.maxStudents} onChange={handleChange} />
            </div>

            <button type="submit">Add Course</button>
        </form>
    );
}

export default CourseForm;
