import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NavBar from "./components/Navbar.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";

function App() {
  const [projects, setProjects] = useState([]);

  // fetch all project when component first render
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("http://localhost:4000/api/projects/");
      const projectsData = await res.json();
      console.log(projectsData);
      setProjects(projectsData.projects);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/projects"
          element={
            <ProjectsPage projects={projects} setProjects={setProjects} />
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProjectDetails projects={projects} setProjects={setProjects} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
