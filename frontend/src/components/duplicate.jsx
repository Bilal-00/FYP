import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_pic: null,
    phone_number: "",
    department: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formField = new FormData();

    for (const key in formData) {
      if (formData[key] !== null) {
        formField.append(key, formData[key]);
      }
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/student/register/", formField, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration successful!");
      navigate("/student-login");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Header
          className="text-white text-center rounded-3 mb-4"
          style={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            padding: "20px",
          }}
        >
          <h2 className="fw-bold">Student Registration</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="Enter first name"
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Enter last name"
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="profile_pic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profile_pic"
                onChange={(e) =>
                  setFormData({ ...formData, profile_pic: e.target.files[0] })
                }
                className="shadow-sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone_number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="Enter phone number"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                placeholder="Enter department"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                className="rounded-pill py-2 fw-bold shadow-lg"
                style={{
                  background: "linear-gradient(to right, #6a11cb, #2575fc)",
                  border: "none",
                }}
              >
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";

const StudentLogin = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/student/login/",
        credentials
      );
      const { token } = response.data;

      // Decode the token to get the user_id
      const user = JSON.parse(atob(token.access.split(".")[1]));
      const userId = user.user_id;

      // Fetch user details using the user_id
      const userResponse = await axios.get(
        `http://127.0.0.1:8000/api/users/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );

      const userDetails = userResponse.data; // This should contain the username and department
      setUser(userDetails);
      localStorage.setItem("token", token.access);
      navigate("/student-dashboard");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Header
          className="text-white text-center rounded-3 mb-4"
          style={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            padding: "20px",
          }}
        >
          <h2 className="fw-bold">Student Login</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                className="rounded-pill py-2 fw-bold shadow-lg"
                style={{
                  background: "linear-gradient(to right, #6a11cb, #2575fc)",
                  border: "none",
                }}
              >
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

//export default StudentLogin;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";

const AdminLogin = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login/",
        credentials
      );
      const { token } = response.data;

      // Decode the token to get the user_id
      const user = JSON.parse(atob(token.access.split(".")[1]));
      const userId = user.user_id;

      // Fetch user details using the user_id
      const userResponse = await axios.get(
        `http://127.0.0.1:8000/api/users/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );

      const userDetails = userResponse.data;
      console.log(userDetails);
      setUser(userDetails);
      localStorage.setItem("token", token.access);
      navigate("/admin-dashboard");
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Header
          className="text-white text-center rounded-3 mb-4"
          style={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            padding: "20px",
          }}
        >
          <h2 className="fw-bold">Admin Login</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                className="rounded-pill py-2 fw-bold shadow-lg"
                style={{
                  background: "linear-gradient(to right, #6a11cb, #2575fc)",
                  border: "none",
                }}
              >
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

//export default AdminLogin;
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
        &larr; Back to Courses
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

//export default Subjects;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Button, Container } from "react-bootstrap";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/student-login");
  };

  return (
    <BootstrapNavbar
      expand="lg"
      style={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
      className="py-3"
    >
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="#"
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "white",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Quiz Platform
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {!user && (
              <>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="text-white fw-bold me-3"
                  style={{ textDecoration: "none" }}
                >
                  Student Register
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/student-login"
                  className="text-white fw-bold me-3"
                  style={{ textDecoration: "none" }}
                >
                  Student Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/admin-login"
                  className="text-white fw-bold"
                  style={{ textDecoration: "none" }}
                >
                  Admin Login
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <BootstrapNavbar.Text
                  className="text-white fw-bold me-3"
                  style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)" }}
                >
                  {user.username} ({user.department || "Admin"})
                </BootstrapNavbar.Text>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="text-white fw-bold me-3"
                  style={{ textDecoration: "none" }}
                >
                  View Profile
                </Nav.Link>
                <Button
                  variant="light"
                  onClick={handleLogout}
                  className="rounded-pill px-4 fw-bold"
                  style={{
                    background: "white",
                    color: "#6a11cb",
                    border: "1px solid #6a11cb",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

//export default Navbar;



