import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddQuestion2 = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([{ option: "", is_correct: false }]); // Array of options
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/subjects/");
        setSubjects(response.data);
      } catch (err) {
        console.error("Error fetching subjects:", err.message);
      }
    };

    fetchSubjects();
  }, []);

  // Add an empty option field
  const addOptionField = () => {
    setOptions([...options, { option: "", is_correct: false }]);
  };

  // Remove an option field
  const removeOptionField = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  // Handle option change
  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!selectedSubject || !questionText || options.length < 4) {
      setError("Please select a subject, enter a question, and provide at least four options.");
      return;
    }
    if (!options.some((opt) => opt.is_correct)) {
      setError("At least one option must be marked as correct.");
      return;
    }

    try {
      // Create the question
      const questionResponse = await axios.post("http://127.0.0.1:8000/api/questions/", {
        subject: selectedSubject,
        question: questionText,
      });

      const questionId = questionResponse.data.id;

      // Create options for the question
      await Promise.all(
        options.map((opt) =>
          axios.post("http://127.0.0.1:8000/api/options/", {
            question: questionId,
            option: opt.option,
            is_correct: opt.is_correct,
          })
        )
      );

      // Redirect to ManageQuestions or success page
      navigate(`/admin/subject/${selectedSubject}/questions`);
    } catch (err) {
      setError("Failed to add question and options. Please try again.");
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
        <h1>Add a Question</h1>
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
        <Form.Group className="mb-3" controlId="subjectSelect">
          <Form.Label>Select Subject</Form.Label>
          <Form.Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            required
          >
            <option value="">-- Select a Subject --</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="questionText">
          <Form.Label>Question Text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </Form.Group>
        <h5 className="mt-4">Options</h5>
        {options.map((opt, index) => (
          <div key={index} className="mb-3">
            <Form.Group controlId={`optionText-${index}`}>
              <Form.Label>Option {index + 1}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter option text"
                value={opt.option}
                onChange={(e) => handleOptionChange(index, "option", e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId={`isCorrect-${index}`}>
              <Form.Check
                type="checkbox"
                label="Is Correct"
                checked={opt.is_correct}
                onChange={(e) => handleOptionChange(index, "is_correct", e.target.checked)}
              />
            </Form.Group>
            {index > 0 && (
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => removeOptionField(index)}
              >
                Remove Option
              </Button>
            )}
          </div>
        ))}
        <Button variant="secondary" className="mt-3" onClick={addOptionField}>
          Add Another Option
        </Button>
        <div className="mt-4">
          <Button variant="primary" type="submit">
            Add Question
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddQuestion2;
