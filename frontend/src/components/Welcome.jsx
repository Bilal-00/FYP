import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Questions from "./Questions";

const Welcome = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false); // Manage quiz state
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [studentScore, setStudentScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const secondsPerQuestion = 10;
  const scorePerQuestion = 5;
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSubject = location.state?.subject;

  // Fetch questions for the selected subject
  useEffect(() => {
    if (!selectedSubject) return;

    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/questions/?subject=${selectedSubject.id}`
        );
        setQuestions(response.data); // Set fetched questions
        console.log(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchQuestion();
  }, [selectedSubject]);

  // Redirect if no subject is selected
  useEffect(() => {
    if (!selectedSubject) {
      navigate("/student-dashboard");
    }
  }, [selectedSubject, navigate]);

  // Initialize timeRemaining when quiz starts
  useEffect(() => {
    if (startQuiz) {
      setTimeRemaining(secondsPerQuestion * questions.length);
    }
  }, [startQuiz, secondsPerQuestion, questions.length]);

  // Submit quiz results to the API
  async function submitQuizToApi(updatedScore) {
    console.log("submitQuizToApi called");
    const studentQuiz = {
      student: user.username,
      subject: selectedSubject.id,
      marks: updatedScore,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/results/", studentQuiz);
      console.log(response.data);
    } catch (err) {
      if (err.response) {
        console.log("Error data:", err.response.data);
        console.log("Error status:", err.response.status);
      } else {
        console.log("Error message:", err.message);
      }
    }
  }

  // If no questions are found for the selected subject
  if (questions.length === 0) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="text-center shadow-lg p-4 rounded-4" style={{ maxWidth: "500px", backgroundColor: "#fff4e5" }}>
          <Card.Body>
            <Alert variant="warning" className="mb-3 fw-bold">
              No questions found for the subject: <strong>{selectedSubject?.name}</strong>.
            </Alert>
            <Button variant="outline-secondary" className="rounded-pill px-4" onClick={() => navigate("/student-dashboard")}>
              Back to Dashboard
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // If quiz starts, render Questions component
  if (startQuiz) {
    return (
      <Questions
        question={questions[questionIndex]}
        setQuestionIndex={setQuestionIndex}
        numQuestions={questions.length}
        questionIndex={questionIndex}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setCorrectOption={setCorrectOption}
        correctOption={correctOption}
        setStudentScore={setStudentScore}
        studentScore={studentScore}
        submitQuizToApi={submitQuizToApi}
        selectedSubject={selectedSubject}
        user={user}
        quizTotalScore={questions.length * scorePerQuestion}
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
      />
    );
  }

  // Render Welcome screen
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="text-center shadow-lg p-5 rounded-4"
        style={{
          maxWidth: "600px",
          background: "linear-gradient(to bottom right, #f0f9ff, #cfe8ff)",
        }}
      >
        <Card.Body>
          <Card.Title className="mb-4 fw-bold text-primary fs-3">Welcome, {user?.first_name}!</Card.Title>
          <Card.Text className="fs-5">
            <strong>Department:</strong> {user?.department}
          </Card.Text>
          <Card.Text className="fs-5">
            <strong>Selected Subject:</strong> {selectedSubject?.name}
          </Card.Text>
          <Card.Text className="fs-5">
            <strong>{questions.length}</strong> Questions to test your knowledge in <strong>{selectedSubject?.name}</strong>
          </Card.Text>
          <Card.Text className="fs-5">
            Each question has <strong>{scorePerQuestion}</strong> marks.
          </Card.Text>
          <Card.Text className="fs-5">
            Total Marks: <strong>{questions.length * scorePerQuestion}</strong>
          </Card.Text>
          <Card.Text className="fs-5">
            Time per question: <strong>{secondsPerQuestion} seconds</strong>
          </Card.Text>
          <Card.Text className="fs-5">
            Total Time:{" "}
            <strong>
              {Math.floor((secondsPerQuestion * questions.length) / 60)} minutes{" "}
              {(secondsPerQuestion * questions.length) % 60} seconds
            </strong>
          </Card.Text>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="outline-secondary"
              className="rounded-pill px-4 py-2 me-2 shadow-sm"
              onClick={() => navigate(-1)}
            >
              Back to Departments
            </Button>
            <Button
              //variant="success"
              variant="primary"
              className="rounded-pill px-4 py-2 shadow-sm"
              onClick={() => setStartQuiz(true)}
            >
              Let's Start!
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Welcome;
