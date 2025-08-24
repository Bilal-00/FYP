import React, { useState, useEffect } from "react";
import { Table, Button, Container, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/");
        setCourses(response.data);
        setFilteredCourses(response.data); // Initialize filtered courses
      } catch (err) {
        console.error("Error fetching courses:", err.message);
      }
    };

    fetchCourses();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter courses based on the search query
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`);
        setCourses(courses.filter((course) => course.id !== id));
        setFilteredCourses(filteredCourses.filter((course) => course.id !== id));
      } catch (err) {
        console.error("Error deleting course:", err.message);
      }
    }
  };

  // Handle edit action
  const handleEdit = (id) => {
    navigate(`/admin/edit-course/${id}`);
  };

  // Handle view subjects action
  const handleViewSubjects = (courseId) => {
    navigate(`/admin/course/${courseId}/subjects`);
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Handle dashboard navigation
  const handleDashboard = () => {
    navigate("/admin-dashboard"); // Navigate to the admin dashboard
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1
          style={{
            fontWeight: "bold",
            color: "#495057",
            fontSize: "2rem",
            marginBottom: "0",
          }}
        >
          Manage Departments
        </h1>
        <div>
          <Button
            variant="secondary"
            className="me-2"
            style={{ fontWeight: "bold", borderRadius: "5px" }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="primary"
            style={{ fontWeight: "bold", borderRadius: "5px" }}
            onClick={handleDashboard}
          >
            Dashboard
          </Button>
        </div>
      </div>

      <Button
              variant="primary"
              className="mb-4"
              style={{
                fontWeight: "bold",
                borderRadius: "20px",
                padding: "10px 20px",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => navigate("/admin/add-course")}
            >
              Add Department
            </Button>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <FormControl
          type="text"
          placeholder="Search Departments..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            borderRadius: "20px",
            padding: "10px",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </InputGroup>

      {/* Table */}
      <Table
        striped
        bordered
        hover
        className="shadow-sm"
        style={{
          background: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead
          style={{
            backgroundColor: "#343a40",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <tr key={course.id} style={{ textAlign: "center" }}>
                <td>{index + 1}</td>
                <td style={{ fontWeight: "bold", color: "#495057" }}>
                  {course.name}
                </td>
                <td>
                  <Button
                    variant="info"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleViewSubjects(course.id)}
                  >
                    View Subjects
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleEdit(course.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No courses match your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageCourses;
