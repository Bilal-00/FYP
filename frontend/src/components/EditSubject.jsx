import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSubject = () => {
  const { subjectId, id: courseId } = useParams(); // Get subjectId and courseId from the URL
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Fetch the subject details
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/subjects/${subjectId}/`
        );
        setName(response.data.name);
      } catch (err) {
        console.error("Error fetching subject details:", err.message);
      }
    };

    fetchSubject();
  }, [subjectId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSubject = {
      name,
      course: courseId, // Include courseId if your backend requires it
    };

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/subjects/${subjectId}/`,
        updatedSubject
      );
      alert("Subject updated successfully!");
      navigate(`/admin/manage-subjects/${courseId}`);
    } catch (err) {
      if (err.response) {
        console.error("Error data:", err.response.data);
        alert(`Failed to update subject: ${err.response.data?.message || "Unknown error"}`);
      } else {
        console.error("Error message:", err.message);
      }
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
        <h1>Edit Subject</h1>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleDashboard}>
            Dashboard
          </Button>
        </div>
      </div>
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
        <Button variant="primary" type="submit">
          Update Subject
        </Button>
      </Form>
    </Container>
  );
};

export default EditSubject;
