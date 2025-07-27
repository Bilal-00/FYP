// src/components/AddSubject2.js
import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddSubject2 = () => {
  const { id: courseId } = useParams(); // Get the course ID from the URL
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const newSubject = {
      name,
      course: courseId,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/subjects/", newSubject);
      setSuccess("Subject added successfully!");
      setName(""); // Reset the form
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
        <h1>Add Subject</h1>
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
        <Form.Group controlId="formSubjectName" className="mb-3">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Subject"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddSubject2;
