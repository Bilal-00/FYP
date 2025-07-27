import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      // Navigate to admin dashboard after a delay
        navigate("/admin-dashboard");

      // Show success toast
      toast.success("Login Successful!", {
        position: toast.POSITION?.TOP_RIGHT,
      });

      
    } catch (error) {
      // Show error toast
      toast.error("Login failed. Please try again.", {
        position: toast.POSITION?.TOP_RIGHT,
      });
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

export default AdminLogin;
