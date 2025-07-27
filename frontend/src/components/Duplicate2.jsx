// src/components/AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "../style/Dashboard.module.css"; // Import CSS module

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Redirect if no user is logged in
  if (!user) {
    navigate("/admin-login");
    return null;
  }

  return (
    <Container className={`${styles.dashboard} py-5`}>
      <h1 className={styles.heading}>Welcome, {user.username}!</h1>
      <p className={styles.info}>You are an Admin.</p>
      <Row className="mt-4">
        <Col md={6} className="mb-3">
          <Button
            variant="primary"
            className={styles.button}
            onClick={() => navigate("/admin/courses")}
          >
            Manage Courses
          </Button>
        </Col>
        <Col md={6} className="mb-3">
          <Button
            variant="success"
            className={styles.button}
            onClick={() => navigate("/admin/add-course")}
          >
            Add Course
          </Button>
        </Col>
        <Col md={6} className="mb-3">
          <Button
            variant="info"
            className={styles.button}
            onClick={() => navigate("/admin/add-subject")}
          >
            Add Subject
          </Button>
        </Col>
        <Col md={6} className="mb-3">
          <Button
            variant="warning"
            className={styles.button}
            onClick={() => navigate("/admin/add-question")}
          >
            Add Questions
          </Button>
        </Col>
        <Col md={6} className="mb-3">
          <Button
            variant="dark"
            className={styles.button}
            onClick={() => navigate("/admin/manage-results")}
          >
            Manage Results
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageResults = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch subjects from the API
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/subjects/");
        setSubjects(response.data);
        setFilteredSubjects(response.data); // Initialize filtered subjects
      } catch (err) {
        console.error("Error fetching subjects:", err.message);
      }
    };

    fetchSubjects();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter subjects based on the search query
    const filtered = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(query)
      //subject.course.toLowerCase().includes(query)
    );
    setFilteredSubjects(filtered);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">View Results</h1>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search Subjects..."
        className="mb-4"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Subjects Display */}
      <Row className="g-4 mb-4">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subject) => (
            <Col md={4} key={subject.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{subject.name}</Card.Title>
                  <Card.Text>
                    Department: <strong>{subject.course}</strong>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      navigate(`/admin/subject/${subject.id}/results`)
                    }
                  >
                    View Results
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No subjects match your search criteria.</p>
        )}
      </Row>

      {/* Add Back and Dashboard buttons */}
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="success" onClick={() => navigate("/admin-dashboard")}>
          Dashboard
        </Button>
      </div>
    </Container>
  );
};

//export default ManageResults;

import React, { useState, useEffect } from "react";
import { Table, Button, Container, FormControl } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/");
        setCourses(response.data);
        setFilteredCourses(response.data); // Initialize filtered courses
      } catch (err) {
        console.error("Error fetching courses:", err.message);
      }
    };

    fetchCourses();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter courses based on the search query
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`);
        setCourses(courses.filter((course) => course.id !== id));
        setFilteredCourses(filteredCourses.filter((course) => course.id !== id));
      } catch (err) {
        console.error("Error deleting course:", err.message);
      }
    }
  };

  // Handle edit action
  const handleEdit = (id) => {
    navigate(`/admin/edit-course/${id}`);
  };

  // Handle view subjects action
  const handleViewSubjects = (courseId) => {
    navigate(`/admin/course/${courseId}/subjects`);
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
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Courses</h1>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleDashboard}>
            Dashboard
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search Courses..."
        className="mb-4"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewSubjects(course.id)}
                  >
                    View Subjects
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(course.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No courses match your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

//export default ManageCourses;
import React, { useState, useEffect } from "react";
import { Table, Button, Container, FormControl } from "react-bootstrap";
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
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Subjects for "{courseName}"</h1>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleDashboard}>
            Dashboard
          </Button>
        </div>
      </div>

      {/* Add Subject Button */}
      <Button variant="primary" className="mb-3" onClick={handleAddSubject}>
        Add Subject
      </Button>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search Subjects..."
        className="mb-4"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <Table striped bordered hover>
        <thead>
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
              <tr key={subject.id}>
                <td>{index + 1}</td>
                <td>{subject.name}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewQuestions(subject.id)}
                  >
                    View Questions
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(subject.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(subject.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No subjects match your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

//export default ManageSubjects;

import React, { useState, useEffect } from "react";
import { Table, Button, Container, FormControl } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageQuestions = () => {
  const { id: subjectId } = useParams(); // Get the subject ID from the URL
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch questions for the selected subject
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch subject details
        const subjectResponse = await axios.get(
          `http://127.0.0.1:8000/api/subjects/${subjectId}/`
        );
        setSubjectName(subjectResponse.data.name);

        // Fetch questions under the subject
        const questionsResponse = await axios.get(
          `http://127.0.0.1:8000/api/questions/?subject=${subjectId}`
        );
        setQuestions(questionsResponse.data);
        setFilteredQuestions(questionsResponse.data); // Initialize filtered questions
      } catch (err) {
        console.error("Error fetching questions:", err.message);
      }
    };

    fetchQuestions();
  }, [subjectId]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter questions based on the search query
    const filtered = questions.filter((question) =>
      question.question.toLowerCase().includes(query)
    );
    setFilteredQuestions(filtered);
  };

  // Handle delete action
  const handleDelete = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/questions/${questionId}/`);
        setQuestions(questions.filter((question) => question.id !== questionId));
        setFilteredQuestions(
          filteredQuestions.filter((question) => question.id !== questionId)
        );
      } catch (err) {
        console.error("Error deleting question:", err.message);
      }
    }
  };

  // Handle edit action
  const handleEdit = (questionId) => {
    navigate(`/admin/subject/${subjectId}/edit-question/${questionId}`);
  };

  // Handle add question action
  const handleAddQuestion = () => {
    navigate(`/admin/subject/${subjectId}/add-question`);
  };

  // Handle view options action
  const handleViewOptions = (questionId) => {
    navigate(`/admin/question/${questionId}/options`);
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
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Questions for "{subjectName}"</h1>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleDashboard}>
            Dashboard
          </Button>
        </div>
      </div>

      {/* Add Question Button */}
      <Button variant="primary" className="mb-3" onClick={handleAddQuestion}>
        Add Question
      </Button>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search Questions..."
        className="mb-4"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Question Text</th>
            <th>Options</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.question}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewOptions(question.id)}
                  >
                    View Options
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(question.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No questions match your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

//export default ManageQuestions;
import React, { useState, useEffect } from "react";
import { Table, Button, Container, FormControl } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageOptions = () => {
  const { id: questionId } = useParams(); // Get the question ID from the URL
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch question and its options
  useEffect(() => {
    const fetchQuestionAndOptions = async () => {
      try {
        // Fetch question details
        const questionResponse = await axios.get(
          `http://127.0.0.1:8000/api/questions/${questionId}/`
        );
        setQuestion(questionResponse.data.question);

        // Fetch options for the question
        const optionsResponse = await axios.get(
          `http://127.0.0.1:8000/api/options/?question=${questionId}`
        );
        setOptions(optionsResponse.data);
        setFilteredOptions(optionsResponse.data); // Initialize filtered options
      } catch (err) {
        console.error("Error fetching question and options:", err.message);
      }
    };

    fetchQuestionAndOptions();
  }, [questionId]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter options based on the search query
    const filtered = options.filter((option) =>
      option.option.toLowerCase().includes(query)
    );
    setFilteredOptions(filtered);
  };

  // Handle delete action
  const handleDelete = async (optionId) => {
    if (window.confirm("Are you sure you want to delete this option?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/options/${optionId}/`);
        setOptions(options.filter((option) => option.id !== optionId));
        setFilteredOptions(
          filteredOptions.filter((option) => option.id !== optionId)
        );
      } catch (err) {
        console.error("Error deleting option:", err.message);
      }
    }
  };

  // Handle edit action
  const handleEdit = (optionId) => {
    navigate(`/admin/question/${questionId}/edit-option/${optionId}`);
  };

  // Handle add option action
  const handleAddOption = () => {
    navigate(`/admin/question/${questionId}/add-option`);
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
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Options for Question: "{question}"</h1>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" onClick={handleDashboard}>
            Dashboard
          </Button>
        </div>
      </div>

      {/* Add Option Button */}
      <Button variant="primary" className="mb-3" onClick={handleAddOption}>
        Add Option
      </Button>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search Options..."
        className="mb-4"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Option Text</th>
            <th>Is Correct</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <tr key={option.id}>
                <td>{index + 1}</td>
                <td>{option.option}</td>
                <td>{option.is_correct ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(option.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(option.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No options match your search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

//export default ManageOptions;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Container, Button, FormControl } from "react-bootstrap";
import axios from "axios";
import { FormatDate } from "./FormatDate";

const SubjectResults = () => {
  const { id } = useParams(); // Get subject ID from URL
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [subjectName, setSubjectName] = useState(""); // Store subject name
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const navigate = useNavigate();

  // Fetch results and subject name for the given subject ID
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch results
        const resultsResponse = await axios.get(
          `http://127.0.0.1:8000/api/results/?subject=${id}`
        );
        setResults(resultsResponse.data);
        setFilteredResults(resultsResponse.data); // Initialize filtered results

        // Fetch subject details
        const subjectResponse = await axios.get(
          `http://127.0.0.1:8000/api/subjects/${id}/`
        );
        setSubjectName(subjectResponse.data.name);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchResults();
  }, [id]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter results based on student name
    const filtered = results.filter((result) =>
      result.student.toLowerCase().includes(query)
    );
    setFilteredResults(filtered);
  };

  // Handle delete action
  const handleDelete = async (resultId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/results/${resultId}/`);
      setResults((prevResults) =>
        prevResults.filter((result) => result.id !== resultId)
      );
      setFilteredResults((prevResults) =>
        prevResults.filter((result) => result.id !== resultId)
      );
    } catch (err) {
      console.error("Error deleting result:", err.message);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Results for Subject: {subjectName || "Loading..."}</h1>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search by Student Name..."
        className="mb-4"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Results Table */}
      {filteredResults.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Marks</th>
              <th>Date</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result, index) => (
              <tr key={result.id}>
                <td>{index + 1}</td>
                <td>{result.student}</td>
                <td>{result.marks}</td>
                <td>{FormatDate(result.date)}</td>
                <td>{subjectName}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() =>
                      navigate(`/admin/result/${result.id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(result.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No results found for this subject.</p>
      )}

      {/* Add Back and Dashboard buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="success" onClick={() => navigate("/admin-dashboard")}>
          Dashboard
        </Button>
      </div>
    </Container>
  );
};

//export default SubjectResults;
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



