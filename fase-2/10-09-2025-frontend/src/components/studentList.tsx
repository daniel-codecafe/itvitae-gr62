import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";
import StudentDetail from "./studentDetail";
import { useState } from "react";
import type { StudentResponseDTO } from "../types";

const StudentList = () => {
  const [studentId, setStudentId] = useState<number>(NaN);

  const {
    data: students,
    isLoading,
    error,
  } = useQuery<StudentResponseDTO[]>({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/students`);
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading students...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error.message}</div>;
  }

  if (studentId) {
    return <>
      <StudentDetail studentId={studentId} setStudentId={setStudentId} />
    </>
  }

  return (
    <div>
      <h2>Students</h2>
      {students && students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.id} onClick={() => {
              setStudentId(student.id);
              console.log("Student id", studentId);
            }} >
              <strong>{student.name}</strong> (Age: {student.age})
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default StudentList;

