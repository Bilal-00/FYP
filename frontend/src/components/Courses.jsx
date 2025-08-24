import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Alert, Form } from "react-bootstrap";

const Courses = ({ onCourseSelect }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/");
        setCourses(response.data);
        setFilteredCourses(response.data); // Initially set filteredCourses to all courses
      } catch (err) {
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses when the search query changes
  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, courses]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">Explore Our Departments</h2>

      {/* Search Bar */}
      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow rounded-pill border-0 px-4 py-2"
          />
        </Col>
      </Row>

      {/* Loading, Error, and Courses Display */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" className="text-primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : filteredCourses.length > 0 ? (
        <Row>
          {filteredCourses.map((course) => (
            <Col key={course.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <Card.Body
                  className="d-flex flex-column justify-content-between"
                  style={{
                    background: "linear-gradient(135deg, #B39DDB 0%, #d4efdf 100%)",
                    //background: "linear-gradient(135deg, #B39DDB 0%, #a8edea 100%)",
                    //background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                    borderRadius: "15px",
                    
                  }}
                >
                  <div>
                    <Card.Title className="text-center text-dark fw-bold fs-5 mb-3">
                      {course.name}
                    </Card.Title>
                    {/*<Card.Text className="text-muted text-center">
                      {course.description || "No description provided."}
                    </Card.Text> */}
                  </div>
                  <div className="text-center mt-4">
                    <Button
                      //variant="dark"
                      variant="primary"
                      className="rounded-pill px-4 py-2"
                      onClick={() => onCourseSelect(course.id)}
                    >
                      View Subjects
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="warning" className="text-center">
          No departments found.
        </Alert>
      )}
    </Container>
  );
};

export default Courses;
