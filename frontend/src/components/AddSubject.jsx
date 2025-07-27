import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const AddSubject = () => {
  const navigate = useNavigate();

  const [subjectName, setSubjectName] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all courses to populate the dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/");
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err.message);
        setError("Failed to load courses. Please try again.");
      }
    };
    fetchCourses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!selectedCourse) {
      setError("Please select a course.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/subjects/", {
        name: subjectName,
        course: selectedCourse,
      });
      setSuccess("Subject added successfully!");
      setSubjectName("");
      setSelectedCourse("");
    } catch (err) {
      console.error("Error adding subject:", err.message);
      setError("Failed to add the subject. Please try again.");
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
        <h1>Add New Subject</h1>
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
        {/* Subject Name */}
        <Form.Group controlId="formSubjectName" className="mb-3">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </Form.Group>

        {/* Course Dropdown */}
        <Form.Group controlId="formCourseSelect" className="mb-3">
          <Form.Label>Select Course</Form.Label>
          <Form.Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">-- Select a Course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Buttons */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Subject"}
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate("/admin-dashboard")}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default AddSubject;
