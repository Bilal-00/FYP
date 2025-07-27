import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddOption = () => {
  const { id: questionId } = useParams(); // Get the question ID from the URL
  const [optionText, setOptionText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/options/", {
        question: questionId,
        option: optionText,
        is_correct: isCorrect,
      });
      navigate(`/admin/question/${questionId}/options`);
    } catch (err) {
      setError("Failed to add option. Please try again.");
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
        <h1>Add Option</h1>
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
        <Form.Group className="mb-3" controlId="optionText">
          <Form.Label>Option Text</Form.Label>
          <Form.Control
            type="text"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            placeholder="Enter option text"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="isCorrect">
          <Form.Check
            type="checkbox"
            label="Is Correct"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Option
        </Button>
      </Form>
    </Container>
  );
};

export default AddOption;
