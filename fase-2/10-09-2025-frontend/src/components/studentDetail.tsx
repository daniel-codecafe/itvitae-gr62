import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";
import type { StudentDTO } from "../types/models";
import StudentEditForm from "./studentEditForm";
import { useState } from "react";
// import type { StudentResponseDTO } from "../types";

interface StudentDetailProps {
    studentId: number;
    setStudentId: (id: number) => void
}


const StudentDetail = ({ studentId, setStudentId }: StudentDetailProps) => {

    const [isEditing, setIsEditing] = useState(false);

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

    if (isLoading) {
        return <p>Laden...</p>
    }

    if (error) {
        return <p>Er is iets fout gegaan</p>
    }

    if (!student) {
        return <p>Geen student gevonden</p>
    }

    if (isEditing) {
        return <StudentEditForm studentId={student.id} setIsEditing={setIsEditing} />
    }

    return <>
        <div style={{ border: 'solid 1px black' }}>
            <h3>Student</h3>
            <p>ID: {student.id}</p>
            <p>Naam: {student.name}</p>
            <p>Leeftijd: {student.age}</p>
            <input type='button' value='Terug' onClick={() => { setStudentId(NaN) }} />
            <input type='button' value='Bewerken' onClick={() => { setIsEditing(true) }} />

        </div>
    </>
}

export default StudentDetail;