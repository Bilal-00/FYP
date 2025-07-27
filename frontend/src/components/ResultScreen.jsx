import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const ResultScreen = () => {
  const location = useLocation();
  const { username, department, subjectName, marks, Total, per } = location.state;

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="shadow-lg p-4 rounded-4 w-100"
        style={{
          maxWidth: '800px',
          background: 'linear-gradient(to bottom right, #f0f9ff, #cce7ff)',
          border: 'none',
        }}
      >
        {/* Header */}
        <Card.Header
          className="text-white text-center rounded-3 mb-4"
          style={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            //background: 'linear-gradient(to right, #007bff, #00c6ff)',
            padding: '20px',
          }}
        >
          <h3 className="fw-bold display-5">Quiz Result</h3>
        </Card.Header>

        {/* Card Body */}
        <Card.Body className="py-4">
          <Row className="mb-4">
            <Col className="fw-bold fs-5">Username:</Col>
            <Col className="text-end text-primary fs-5">{username}</Col>
          </Row>
          <Row className="mb-4">
            <Col className="fw-bold fs-5">Department:</Col>
            <Col className="text-end text-primary fs-5">{department}</Col>
          </Row>
          <Row className="mb-4">
            <Col className="fw-bold fs-5">Subject Name:</Col>
            <Col className="text-end text-primary fs-5">{subjectName}</Col>
          </Row>
          <Row className="mb-4">
            <Col className="fw-bold fs-5">Total Marks:</Col>
            <Col className="text-end text-primary fs-5">{Total}</Col>
          </Row>
          <Row className="mb-4">
            <Col className="fw-bold fs-5">Obtained Marks:</Col>
            <Col className="text-end text-primary fs-5">{marks}</Col>
          </Row>
          <Row className="mb-4">
            <Col className="fw-bold fs-5">Percentage:</Col>
            <Col className="text-end text-primary fs-5">{per}%</Col>
          </Row>
        </Card.Body>

        {/* Footer */}
        <Card.Footer className="text-center border-0 py-4">
          <Button
            as={Link}
            to="/student-dashboard"
            variant="primary"
            className="rounded-pill px-5 py-3 shadow-lg"
            style={{
              
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              //background: 'linear-gradient(to right, #007bff, #00c6ff)',
              border: 'none',
              fontSize: '1.2rem',
              color: 'white',
            }}
          >
            Go Back to Home
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ResultScreen;
