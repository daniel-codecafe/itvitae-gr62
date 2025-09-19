import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";
import type { StudentDTO } from "../types/models";
import StudentEditForm from "./studentEditForm";
import { useState } from "react";
import EnrolledCourse from "./EnrolledCourse";

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

            <h3>Courses</h3>

            {/* Dit.... */}
            {/* {student.courses.map(function (course) {
                return <div>
                    <span key={course.id} >{course.name} </span>
                    <input type="button" value='Afmelden' />
                </div>
            }
            )} */}

            {/* ...is het zelfde als dit!
            {student.courses.map(course =>
                <div>
                    <span key={course.id} >{course.name} </span>
                    <input type="button" value='Afmelden' onClick={() => { onUnenroll(course.id) }} />
                </div>
            )} */}

            <div>
                {student.courses.map(course =>
                    <EnrolledCourse key={course.id} studentId={studentId} courseSummary={course} />
                )}
            </div>

            <div>
                < input type='button' value='Terug' onClick={() => { setStudentId(NaN) }} />
                <input type='button' value='Bewerken' onClick={() => { setIsEditing(true) }} />
            </div>

        </div >
    </>
}

export default StudentDetail;