import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/home";
import StudentPage from "./pages/students";
import CoursePage from "./pages/courses";
import MainLayout from "./layout";
import EnrollmentPage from "./pages/enrollmentPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="courses" element={<CoursePage />} />
          <Route path="enrollment" element={<EnrollmentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

