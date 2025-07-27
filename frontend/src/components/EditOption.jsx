import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditOption = () => {
  const { questionId, optionId } = useParams(); // Get the question and option IDs from the URL
  const [optionText, setOptionText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch existing option data
  useEffect(() => {
    const fetchOption = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/options/${optionId}/`
        );
        setOptionText(response.data.option);
        setIsCorrect(response.data.is_correct);
      } catch (err) {
        setError("Failed to fetch option data. Please try again.");
      }
    };

    fetchOption();
  }, [optionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/options/${optionId}/`, {
        question: questionId,
        option: optionText,
        is_correct: isCorrect,
      });
      navigate(`/admin/question/${questionId}/options`);
    } catch (err) {
      setError("Failed to update option. Please try again.");
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
        <h1>Edit Option</h1>
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
          Update Option
        </Button>
      </Form>
    </Container>
  );
};

export default EditOption;
