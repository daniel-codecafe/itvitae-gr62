import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { API_URL } from "../App";

interface Student {
  name: string;
  age: number;
}

const StudentForm = () => {
  const [state, setState] = useState<Student>({ name: '', age: 0 });

  const queryClient = useQueryClient();

  const createStudent = useMutation({
    mutationFn: async (studentData: Student) => {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      if (!response.ok) throw new Error('Failed to create student');
      return response.json();
    },
    onSuccess: () => {
      setState({ name: '', age: 0 });
      queryClient.invalidateQueries({ queryKey: ['students'] }); // Magic!
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("Formulier submitted: " + state.name);
    createStudent.mutate(state);
    // createStudent.mutate({
    //   name: 'hallo',
    //   age: 12
    // });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
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
