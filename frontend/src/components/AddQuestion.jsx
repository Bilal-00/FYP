import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddQuestion = () => {
  const { id: subjectId } = useParams(); // Get the subject ID from the URL
  const [questionText, setQuestionText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText) {
      setError("Question text is required.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/questions/", {
        question: questionText,
        subject: subjectId,
      });
      navigate(`/admin/subject/${subjectId}/questions`);
    } catch (err) {
      console.error("Error adding question:", err.message);
      setError("Failed to add question. Please try again.");
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
        <h1>Add Question</h1>
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
        <Form.Group className="mb-3">
          <Form.Label>Question Text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit">
          Add Question
        </Button>
      </Form>
    </Container>
  );
};

export default AddQuestion;
