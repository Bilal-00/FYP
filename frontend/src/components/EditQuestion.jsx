import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditQuestion = () => {
  const { id: subjectId, questionId } = useParams(); // Get subject and question IDs from the URL
  const [questionText, setQuestionText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/questions/${questionId}/`
        );
        setQuestionText(response.data.question);
      } catch (err) {
        console.error("Error fetching question:", err.message);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText) {
      setError("Question text is required.");
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/questions/${questionId}/`, {
        question: questionText,
        subject: subjectId,
      });
      navigate(`/admin/subject/${subjectId}/questions`);
    } catch (err) {
      console.error("Error updating question:", err.message);
      setError("Failed to update question. Please try again.");
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
        <h1>Edit Question</h1>
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
            placeholder="Edit the question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit">
          Update Question
        </Button>
      </Form>
    </Container>
  );
};

export default EditQuestion;
