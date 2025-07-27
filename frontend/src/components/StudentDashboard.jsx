import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container,Card } from "react-bootstrap";
import Courses from "./Courses";
import Subjects from "./Subjects";

const StudentDashboard = ({ user }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();

  // Redirect if no user is logged in
  if (!user) {
    navigate("/student-login");
    return null;
  }

  return (
    <div className="py-4">
      <Container>
        <Container className="d-flex flex-column align-items-center">
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
        <p style={{ fontSize: "1.25rem", opacity: 0.9 }}>Department: {user.department}</p>
      </Card>
      </Container>
        {/* Show Courses or Subjects based on selection */}
        {!selectedCourseId ? (
          <Courses onCourseSelect={setSelectedCourseId} />
        ) : (
          <Subjects
            courseId={selectedCourseId}
            onBack={() => setSelectedCourseId(null)}
          />
        )}
      </Container>
    </div>
  );
};

export default StudentDashboard;
