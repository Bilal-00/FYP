import React, { useState, useEffect } from "react";
import { Table, Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageOptions = () => {
  const { id: questionId } = useParams(); // Get the question ID from the URL
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch question and its options
  useEffect(() => {
    const fetchQuestionAndOptions = async () => {
      try {
        const questionResponse = await axios.get(
          `http://127.0.0.1:8000/api/questions/${questionId}/`
        );
        setQuestion(questionResponse.data.question);

        const optionsResponse = await axios.get(
          `http://127.0.0.1:8000/api/options/?question=${questionId}`
        );
        setOptions(optionsResponse.data);
        setFilteredOptions(optionsResponse.data); // Initialize filtered options
      } catch (err) {
        console.error("Error fetching question and options:", err.message);
      }
    };

    fetchQuestionAndOptions();
  }, [questionId]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter options based on the search query
    const filtered = options.filter((option) =>
      option.option.toLowerCase().includes(query)
    );
    setFilteredOptions(filtered);
  };

  // Handle delete action
  const handleDelete = async (optionId) => {
    if (window.confirm("Are you sure you want to delete this option?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/options/${optionId}/`);
        setOptions(options.filter((option) => option.id !== optionId));
        setFilteredOptions(
          filteredOptions.filter((option) => option.id !== optionId)
        );
      } catch (err) {
        console.error("Error deleting option:", err.message);
      }
    }
  };

  // Handle edit action
  const handleEdit = (optionId) => {
    navigate(`/admin/question/${questionId}/edit-option/${optionId}`);
  };

  // Handle add option action
  const handleAddOption = () => {
    navigate(`/admin/question/${questionId}/add-option`);
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
          Manage Options for Question: "{question}"
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
        onClick={handleAddOption}
      >
        Add Option
      </Button>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <FormControl
          type="text"
          placeholder="Search Options..."
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
            <th>Option Text</th>
            <th>Is Correct</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <tr key={option.id} style={{ textAlign: "center" }}>
                <td>{index + 1}</td>
                <td style={{ fontWeight: "bold", color: "#495057" }}>
                  {option.option}
                </td>
                <td>{option.is_correct ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleEdit(option.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleDelete(option.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No options match your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageOptions;
