import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    toast.success("Registration Successful!", {
      position: toast.POSITION?.TOP_RIGHT,
    });

    navigate("/student-login");
  } catch (error) {
    // Handle and show detailed error messages
    if (error.response && error.response.data) {
      const errors = error.response.data;

      // If error is an object (field-wise errors), loop and show them
      Object.values(errors).forEach((errMsg) => {
        if (Array.isArray(errMsg)) {
          errMsg.forEach((msg) =>
            toast.error(msg, {
              position: toast.POSITION?.TOP_RIGHT,
            })
          );
        } else {
          toast.error(errMsg, {
            position: toast.POSITION?.TOP_RIGHT,
          });
        }
      });
    } else {
      // Fallback error
      toast.error("Registration failed. Please try again.", {
        position: toast.POSITION?.TOP_RIGHT,
      });
    }
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
                required
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
