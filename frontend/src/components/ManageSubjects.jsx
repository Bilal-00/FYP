import React, { useState, useEffect } from "react";
import { Table, Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageSubjects = () => {
  const { id: courseId } = useParams(); // Get the course ID from the URL
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch subjects for the selected course
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(
          `http://127.0.0.1:8000/api/courses/${courseId}/`
        );
        setCourseName(courseResponse.data.name);

        // Fetch subjects under the course
        const subjectResponse = await axios.get(
          `http://127.0.0.1:8000/api/subjects/?course=${courseId}`
        );
        setSubjects(subjectResponse.data);
        setFilteredSubjects(subjectResponse.data); // Initialize filtered subjects
      } catch (err) {
        console.error("Error fetching subjects:", err.message);
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
      subject.name.toLowerCase().includes(query)
    );
    setFilteredSubjects(filtered);
  };

  // Handle delete action
  const handleDelete = async (subjectId) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/subjects/${subjectId}/`);
        setSubjects(subjects.filter((subject) => subject.id !== subjectId));
        setFilteredSubjects(
          filteredSubjects.filter((subject) => subject.id !== subjectId)
        );
      } catch (err) {
        console.error("Error deleting subject:", err.message);
      }
    }
  };

  // Handle edit action
  const handleEdit = (subjectId) => {
    navigate(`/admin/course/${courseId}/edit-subject/${subjectId}`);
  };

  // Handle add subject action
  const handleAddSubject = () => {
    navigate(`/admin/course/${courseId}/add-subject`);
  };

  // Handle view questions action
  const handleViewQuestions = (subjectId) => {
    navigate(`/admin/subject/${subjectId}/questions`);
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Handle dashboard navigation
  const handleDashboard = () => {
    navigate("/admin-dashboard"); // Navigate to the admin dashboard
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1
          style={{
            fontWeight: "bold",
            color: "#495057",
            fontSize: "2rem",
            marginBottom: "0",
          }}
        >
          Manage Subjects for "{courseName}"
        </h1>
        <div>
          <Button
            variant="secondary"
            className="me-2"
            style={{ fontWeight: "bold", borderRadius: "5px" }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="primary"
            style={{ fontWeight: "bold", borderRadius: "5px" }}
            onClick={handleDashboard}
          >
            Dashboard
          </Button>
        </div>
      </div>

      {/* Add Subject Button */}
      <Button
        variant="primary"
        className="mb-4"
        style={{
          fontWeight: "bold",
          borderRadius: "20px",
          padding: "10px 20px",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={handleAddSubject}
      >
        Add Subject
      </Button>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <FormControl
          type="text"
          placeholder="Search Subjects..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            borderRadius: "20px",
            padding: "10px",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </InputGroup>

      {/* Table */}
      <Table
        striped
        bordered
        hover
        className="shadow-sm"
        style={{
          background: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead
          style={{
            backgroundColor: "#343a40",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <tr>
            <th>#</th>
            <th>Subject Name</th>
            <th>Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject, index) => (
              <tr key={subject.id} style={{ textAlign: "center" }}>
                <td>{index + 1}</td>
                <td style={{ fontWeight: "bold", color: "#495057" }}>
                  {subject.name}
                </td>
                <td>
                  <Button
                    variant="info"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleViewQuestions(subject.id)}
                  >
                    View Questions
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleEdit(subject.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    style={{ fontWeight: "bold", borderRadius: "5px" }}
                    onClick={() => handleDelete(subject.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No subjects match your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageSubjects;
