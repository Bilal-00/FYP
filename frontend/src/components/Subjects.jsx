import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Button, FormControl } from "react-bootstrap";

const Subjects = ({ courseId, onBack }) => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch subjects for the selected course
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/subjects/?course=${courseId}`);
        setSubjects(response.data); // Set fetched subjects
        setFilteredSubjects(response.data); // Initialize filtered subjects
      } catch (err) {
        setError("Failed to fetch subjects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [courseId]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter subjects based on the search query
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(query) ||
      (subject.description && subject.description.toLowerCase().includes(query))
    );
    setFilteredSubjects(filtered);
  };

  // Handle subject selection and navigate to WelcomeComponent
  const handleSubjectClick = (subject) => {
    navigate("/welcome", { state: { subject } }); // Send selected subject to the Welcome Component
  };

  return (
    <Container className="mt-5">
      <Button variant="primary" className="mb-4 rounded-pill shadow-sm px-4 py-2" onClick={onBack}>
        &larr; Back to Departments
      </Button>
      <h2 className="text-center mb-4 fw-bold text-primary">Available Subjects</h2>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search subjects..."
        className="mb-4 rounded-pill shadow-sm px-3 py-2 border-0"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" className="text-success">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : filteredSubjects.length === 0 ? (
        <Alert variant="info" className="text-center">
          No subjects match your search criteria.
        </Alert>
      ) : (
        <Row>
          {filteredSubjects.map((subject) => (
            <Col key={subject.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card
                className="h-100 shadow-lg border-0 rounded-4"
                style={{
                  background: "linear-gradient(135deg,rgb(122, 183, 233) 0%, #d4efdf 100%)",
                  cursor: "pointer",
                }}
                onClick={() => handleSubjectClick(subject)}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="text-center text-dark fw-bold fs-5">
                      {subject.name}
                    </Card.Title>
                    {/*<Card.Text className="text-muted text-center">
                      {subject.description || "No description available."}
                    </Card.Text>   */}
                  </div>
                  <div className="text-center mt-4">
                    <Button variant="primary" className="rounded-pill px-4 py-2">
                      Learn More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Subjects;
