import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { StudentDTO, StudentUpdateDTO } from "../types/models";
import { API_URL } from "../App";
import { useEffect, useState } from "react";

interface StudentEditFormProps {
    studentId: number;
    setIsEditing: (editing: boolean) => void;
}

const StudentEditForm = ({ studentId, setIsEditing }: StudentEditFormProps) => {
    const [state, setState] = useState<StudentUpdateDTO>({ name: '', age: 0 });

    const { data: student, isLoading, error, } = useQuery<StudentDTO>({
        queryKey: ["students", studentId],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/students/${studentId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch student with id ${studentId}`);
            }

            return response.json();
        },
    });

    const queryClient = useQueryClient();

    const updateStudent = useMutation({
        mutationFn: async (studentData: StudentUpdateDTO) => {
            const response = await fetch(`${API_URL}/students/${studentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            if (!response.ok) throw new Error('Failed to update student');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] }); // Magic!
            setIsEditing(false);
        }
    });

    useEffect(() => {
        if (student) {
            setState({ name: student.name, age: student.age })
        }
    }, [student])

    if (isLoading) {
        return <p>Laden...</p>
    }

    if (error) {
        return <p>Er is iets fout gegaan</p>
    }

    // if (!student) {
    //     return <p>Geen student gevonden</p>
    // }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateStudent.mutate(state);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }

    return (
        <>
            <h3>Student edit form</h3>
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
                    <input
                        type="number"
                        id="age"
                        name="age"
                        min={0}
                        max={150}
                        value={state.age}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Edit Student</button>
            </form>

            <input type='button' value='Terug' onClick={() => { setIsEditing(false) }} />
        </>
    );
}

export default StudentEditForm