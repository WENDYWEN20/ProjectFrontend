
/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";

export default function CreateTaskForm({ projectId, setProject }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(
        `http://localhost:4000/api/projects/${projectId}/tasks`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ projectId, ...formData }),
        }
      );

      const data = await res.json();
      console.log(data);
      setProject(data.project);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input type="submit" value="Create" />
      </form>
    </>
  );
}
CreateTaskForm.propTypes = {
  projects: PropTypes.array,
  setProjects: PropTypes.func,
};
