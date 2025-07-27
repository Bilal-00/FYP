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
       // background: "linear-gradient(to right, #6a11cb, #2575fc)",
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

export default Navbar;
