import React from "react";
import { Container, Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center mt-5">Please log in to view your profile.</p>;
  }

  return (
    <Container className="py-5 d-flex flex-column align-items-center">
      <Card
        className="shadow-lg mb-4"
        style={{
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
          padding: "30px",
          borderRadius: "15px",
          background:
            "linear-gradient(to right, #6a11cb, #2575fc)",
            //"linear-gradient(135deg, rgba(98, 0, 234, 0.9), rgba(155, 89, 182, 0.9))",
          color: "white",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Image
          src={user.profile_pic || "https://via.placeholder.com/150"}
          roundedCircle
          className="mb-4"
          style={{
            width: "150px",
            height: "150px",
            border: "5px solid white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        />
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            textShadow: "0 3px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          {user.username}
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.85,
            marginBottom: "1rem",
          }}
        >
          {user.email}
        </p>
        <div
          style={{
            fontSize: "1.1rem",
            textAlign: "left",
            marginTop: "1.5rem",
          }}
        >
          <p>
            <strong>First Name:</strong> {user.first_name || "N/A"}
          </p>
          <p>
            <strong>Last Name:</strong> {user.last_name || "N/A"}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phone_number || "N/A"}
          </p>
          <p>
            <strong>Department:</strong> {user.department || "N/A"}
          </p>
        </div>
      </Card>

      {/* Back Button */}
            <Button
              variant="primary"
              onClick={() => navigate(-1)} // Navigate to the previous page
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Back
            </Button>
    </Container>
  );
};

export default Profile;
