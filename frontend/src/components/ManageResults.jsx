import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageResults = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch subjects from the API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/subjects/");
        setSubjects(response.data);
        setFilteredSubjects(response.data); // Initialize filtered subjects
      } catch (err) {
        console.error("Error fetching subjects:", err.message);
      }
    };

    fetchSubjects();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter subjects based on the search query
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(query)
    );
    setFilteredSubjects(filtered);
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
    >
      <h1 className="mb-4 text-center" style={{ fontWeight: "bold", color: "#495057" }}>
        View Results
      </h1>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <FormControl
          type="text"
          placeholder="Search Subjects..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            borderRadius: "20px",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px",
          }}
        />
      </InputGroup>

      {/* Subjects Display */}
      <Row className="g-4 mb-4">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <Col md={4} key={subject.id}>
              <Card
                className="shadow-sm h-100"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 3px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "1.5rem", fontWeight: "600", color: "#343a40" }}>
                    {subject.name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "1rem", color: "#6c757d" }}>
                    Department: <strong>{subject.course}</strong>
                  </Card.Text>
                  <Button
                    variant="primary"
                    style={{ borderRadius: "5px", fontWeight: "bold", width: "100%" }}
                    onClick={() => navigate(`/admin/subject/${subject.id}/results`)}
                  >
                    View Results
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p
            className="text-center"
            style={{
              fontSize: "1.2rem",
              color: "#6c757d",
              marginTop: "2rem",
              fontStyle: "italic",
            }}
          >
            No subjects match your search criteria.
          </p>
        )}
      </Row>

      {/* Add Back and Dashboard buttons */}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          style={{
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          variant="success"
          style={{
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
          onClick={() => navigate("/admin-dashboard")}
        >
          Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default ManageResults;
