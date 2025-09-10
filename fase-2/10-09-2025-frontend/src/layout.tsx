import { NavLink, Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/students" end>
          Students
        </NavLink>
        <NavLink to="/courses">Courses</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
