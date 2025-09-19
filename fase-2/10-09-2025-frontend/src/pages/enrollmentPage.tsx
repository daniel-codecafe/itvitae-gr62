import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CourseDTO, StudentDTO } from "../types";
import { API_URL } from "../App";
import { useState } from "react";

const EnrollmentPage = () => {

    const [studentId, setStudentId] = useState<number>(NaN);
    const [courseId, setCourseId] = useState<number>(NaN);

    const queryClient = useQueryClient();

    // const queryData = useQuery<StudentDTO[]>({
    // queryData.isLoading
    const enrollMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${API_URL}/students/${studentId}/courses/${courseId}`,
                { method: 'POST' }
            )

            if (!response.ok) {
                throw new Error("Er is iets fout gegaan");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        }
    })

    // const { data, isLoading, error } = useQuery<StudentDTO[]>({
    const { data: students, isLoading: isStudentsLoading, error: studentsError } = useQuery<StudentDTO[]>({
        queryKey: ["students"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/students`);
            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }
            return response.json();
        },
    });

    const { data: courses, isLoading: isCoursesLoading, error: coursesError } = useQuery<CourseDTO[]>({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/courses`);
            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }
            return response.json();
        },
    });

    if (isStudentsLoading || isCoursesLoading) {
        return <p>Laden...</p>
    }

    if (studentsError || coursesError) {
        return <p>Error!</p>
    }

    if (!students || !courses) {
        return <p>Error!</p>
    }

    const changeStudentHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.currentTarget.value);
        setStudentId(Number(event.currentTarget.value));
    }

    const changeCourseHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.currentTarget.value);
        setCourseId(Number(event.currentTarget.value));
    }

    const enrollStudentToCourse = () => {
        enrollMutation.mutate();
    }

    return <>
        <h4>Selecteer een student</h4>

        <select name="students" onChange={changeStudentHandler} value="">
            <option value="" disabled hidden>-- Selecteer een student --</option>
            {students.map((student) =>
                <option key={student.id} value={student.id}>{student.name}</option>
            )}
        </select>

        <h4>Selecteer een course</h4>

        <select name="courses" onChange={changeCourseHandler} value="">
            <option value="" disabled hidden>-- Selecteer een course --</option>
            {courses.map((course) =>
                <option key={course.id} value={course.id}>{course.name}</option>
            )}
        </select>

        <div>
            <input type="button" value="Enroll!" onClick={enrollStudentToCourse} />
        </div>
    </>
}

export default EnrollmentPage;