import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const AddCourse = () => {
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("http://127.0.0.1:8000/api/courses/", { name: courseName });
      setSuccess("Course added successfully!");
      setCourseName(""); // Reset the form
    } catch (err) {
      console.error("Error adding course:", err.message);
      setError("Failed to add the course. Please try again.");
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
        <h1>Add New Course</h1>
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
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCourseName" className="mb-3">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Course"}
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate("/admin/courses")}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default AddCourse;
