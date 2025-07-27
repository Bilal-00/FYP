import React, { useState, useEffect } from "react";
import { Table, Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageQuestions = () => {
  const { id: subjectId } = useParams(); // Get the subject ID from the URL
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch questions for the selected subject
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const subjectResponse = await axios.get(
          `http://127.0.0.1:8000/api/subjects/${subjectId}/`
        );
        setSubjectName(subjectResponse.data.name);

        const questionsResponse = await axios.get(
          `http://127.0.0.1:8000/api/questions/?subject=${subjectId}`
        );
        setQuestions(questionsResponse.data);
        setFilteredQuestions(questionsResponse.data); // Initialize filtered questions
      } catch (err) {
        console.error("Error fetching questions:", err.message);
      }
    };

    fetchQuestions();
  }, [subjectId]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = questions.filter((question) =>
      question.question.toLowerCase().includes(query)
    );
    setFilteredQuestions(filtered);
  };

  const handleDelete = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/questions/${questionId}/`);
        setQuestions(questions.filter((question) => question.id !== questionId));
        setFilteredQuestions(
          filteredQuestions.filter((question) => question.id !== questionId)
        );
      } catch (err) {
        console.error("Error deleting question:", err.message);
      }
    }
  };

  const handleEdit = (questionId) => {
    navigate(`/admin/subject/${subjectId}/edit-question/${questionId}`);
  };

  const handleAddQuestion = () => {
    navigate(`/admin/subject/${subjectId}/add-question`);
  };

  const handleViewOptions = (questionId) => {
    navigate(`/admin/question/${questionId}/options`);
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleDashboard = () => {
    navigate("/admin-dashboard"); // Navigate to the admin dashboard
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1
          style={{
            fontWeight: "bold",
            color: "#495057",
            fontSize: "2rem",
            marginBottom: "0",
          }}
        >
          Manage Questions for "{subjectName}"
        </h1>
        <div>
          <Button
            variant="secondary"
            className="me-2"
            style={{ fontWeight: "bold", borderRadius: "5px" }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="primary"
            style={{ fontWeight: "bold", borderRadius: "5px" }}
            onClick={handleDashboard}
          >
            Dashboard
          </Button>
        </div>
      </div>

      <Button
        variant="primary"
        className="mb-3"
        style={{ fontWeight: "bold", borderRadius: "5px" }}
        onClick={handleAddQuestion}
      >
        Add Question
      </Button>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <FormControl
          type="text"
          placeholder="Search Questions..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            borderRadius: "20px",
            padding: "10px",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </InputGroup>

      <Table
        striped
        bordered
        hover
        className="shadow-sm"
        style={{
          background: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead
          style={{
            backgroundColor: "#343a40",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <tr>
            <th>#</th>
            <th>Question Text</th>
            <th>Options</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
              <tr key={question.id} style={{ textAlign: "center" }}>
                <td>{index + 1}</td>
                <td style={{ fontWeight: "bold", color: "#495057" }}>
                  {question.question}
                </td>
                <td>
                  <Button
                    variant="info"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleViewOptions(question.id)}
                  >
                    View Options
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleEdit(question.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No questions match your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageQuestions;
