import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Home = ({ user }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={10} lg={8}>
            <h1
              className="fw-bold mb-3"
              style={{ fontSize: "3rem", textShadow: "0 3px 6px rgba(0,0,0,0.3)" }}
            >
              Welcome to Quiz Platform 🎓
            </h1>
            <p
              className="lead mb-4"
              style={{ fontSize: "1.2rem", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              Test your knowledge, improve your skills, and challenge yourself with
              interactive quizzes across multiple subjects.
            </p>

            
              <div>
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  className="rounded-pill px-4 py-2 fw-bold me-3"
                  style={{ color: "#6a11cb", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}
                >
                  Student Register
                </Button>
                <Button
                  as={Link}
                  to="/student-login"
                  variant="outline-light"
                  className="rounded-pill px-4 py-2 fw-bold me-3"
                >
                  Student Login
                </Button>
                <Button
                  as={Link}
                  to="/admin-login"
                  variant="outline-light"
                  className="rounded-pill px-4 py-2 fw-bold"
                >
                  Admin Login
                </Button>
              </div>
            {/* ) : (
              <div>
                <Card
                  className="text-dark mx-auto shadow-lg"
                  style={{ maxWidth: "600px", borderRadius: "20px" }}
                >
                  <Card.Body>
                    <h3 className="fw-bold mb-3">Hello, {user.username}! 👋</h3>
                    <p className="mb-4">
                      Ready to continue your learning journey? Jump back into your
                      dashboard and start practicing quizzes.
                    </p>
                    <Button
                      as={Link}
                      to={user.department ? "/student-dashboard" : "/admin-dashboard"}
                      variant="primary"
                      className="rounded-pill px-4 py-2 fw-bold"
                    >
                      Go to Dashboard
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            )} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
