import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";

const StudentList = () => {
  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
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

  return (
    <div>
      <h2>Students</h2>
      {students && students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
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

