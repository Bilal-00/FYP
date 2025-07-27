// src/components/EditResult.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const EditResult = () => {
  const { id } = useParams(); // Get the result ID from URL
  const navigate = useNavigate();
  const [resultData, setResultData] = useState({ student: "", marks: 0, subject: "" });
  const [subjects, setSubjects] = useState([]); // List of available subjects
  const [error, setError] = useState("");

  // Fetch the result details and available subjects
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch result details
        const resultResponse = await axios.get(`http://127.0.0.1:8000/api/results/${id}/`);
        setResultData(resultResponse.data);

        // Fetch all subjects
        const subjectResponse = await axios.get("http://127.0.0.1:8000/api/subjects/");
        setSubjects(subjectResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to load data.");
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/results/${id}/`, resultData);
      navigate(`/admin/subject/${resultData.subject}/results`); // Redirect to the subject's results page
    } catch (err) {
      console.error("Error updating result:", err.message);
      setError("Failed to update the result.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResultData({ ...resultData, [name]: value });
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Edit Result</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            name="student"
            value={resultData.student}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Marks</Form.Label>
          <Form.Control
            type="number"
            name="marks"
            value={resultData.marks}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Select
            name="subject"
            value={resultData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Result
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditResult;
