// src/components/AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Redirect if no user is logged in
  if (!user) {
    navigate("/admin-login");
    return null;
  }

  return (
    <Container
      className="py-5 d-flex flex-column align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <Card
  className="shadow-sm mb-4"
  style={{
    width: "100%",
    maxWidth: "800px",
    textAlign: "center",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
  }}
>
  <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
    Welcome, {user.username}!
  </h1>
  <p style={{ fontSize: "1.25rem", opacity: 0.9 }}>You are an Admin.</p>

  {/* New Admin Link Button */}
  <Button
    variant="light"
    size="sm"
    className="mt-3 fw-bold"
    style={{ color: "#6a11cb", border: "none" }}
    onClick={() => navigate("/add-admin")}
  >
    + Add New Admin
  </Button>
</Card>


      <Row
        className="g-4"
        style={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {[
          { label: "Manage Departments", variant: "primary", route: "/admin/courses" },
          { label: "Add Department", variant: "primary", route: "/admin/add-course" },
          { label: "Add Subject", variant: "primary", route: "/admin/add-subject" },
          { label: "Add Questions", variant: "primary", route: "/admin/add-question" },
          { label: "Manage Results", variant: "primary", route: "/admin/manage-results" },
        ].map(({ label, variant, route }) => (
          <Col xs={12} md={6} key={label}>
            <Button
              variant={variant}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => navigate(route)}
            >
              {label}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
