import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/courses/${id}/`);
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course details:", err.message);
        setError("Failed to fetch course details.");
      }
    };

    fetchCourse();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.put(`http://127.0.0.1:8000/api/courses/${id}/`, course);
      navigate("/admin/courses");
    } catch (err) {
      console.error("Error updating course:", err.message);
      setError("Failed to update the course. Please try again.");
    } finally {
      setLoading(false);
    }
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
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Course</h1>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleDashboard}>
            Dashboard
          </Button>
        </div>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCourseName" className="mb-3">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course name"
            name="name"
            value={course.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Uncomment if a course description is needed */}
        {/* <Form.Group controlId="formCourseDescription" className="mb-3">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter course description"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </Form.Group> */}

        <div className="d-flex">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/admin/courses")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditCourse;
