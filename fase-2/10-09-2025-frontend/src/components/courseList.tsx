import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../App";
import type { CourseDTO } from "../types/models";

const CourseList = () => {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery<CourseDTO>({
    queryKey: ["courses"],
    queryFn: async () => {
      // const response = await fetch(`${API_URL}/courses`);
      const response = await fetch(API_URL + '/courses' + dit + '...' + dat + '....');
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Courses</h2>
      {courses && courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.name}</strong> (max students: {course.maxStudents})
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CourseList;

