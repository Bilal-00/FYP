import React from "react";
import OptionContainer from "./OptionContainer";
import Footer from "./Footer";
import NextButton from "./NextButton";
import Timer from "./Timer";
import { Container, Card, ProgressBar } from "react-bootstrap";

const Questions = ({
  question,
  setQuestionIndex,
  numQuestions,
  questionIndex,
  selectedOption,
  setSelectedOption,
  setCorrectOption,
  correctOption,
  setStudentScore,
  studentScore,
  submitQuizToApi,
  user,
  selectedSubject,
  quizTotalScore,
  timeRemaining,
  setTimeRemaining,
}) => {
  // Calculate progress percentage
  const progress = ((questionIndex + 1) / numQuestions) * 100;

  return (
    <Container className="py-5">
      <Card className="shadow-lg p-4">
        <Card.Body>
          {/* Progress Bar */}
          <div className="mb-3">
            <h5>Question {questionIndex + 1} of {numQuestions}</h5>
            <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
          </div>

          {/* Current Score */}
          <h4 className="text-primary">Score: {studentScore}</h4>

          {/* Question Title */}
          <Card.Title as="h4" className="mb-4">
            {question.question}
          </Card.Title>

          {/* Options */}
          <OptionContainer
            question={question}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setCorrectOption={setCorrectOption}
          />
        </Card.Body>

        {/* Timer */}
        <Card.Footer className="d-flex justify-content-between bg-white border-0">
          <Timer
            timeRemaining={timeRemaining}
            setTimeRemaining={setTimeRemaining}
            submitQuizToApi={submitQuizToApi}
            studentScore={studentScore}
            user={user}
            selectedSubject={selectedSubject}
            quizTotalScore={quizTotalScore}
          />
        </Card.Footer>

        {/* Next Button */}
        <Card.Footer className="d-flex justify-content-end bg-white border-0">
          <NextButton
            setQuestionIndex={setQuestionIndex}
            numQuestions={numQuestions}
            questionIndex={questionIndex}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            correctOption={correctOption}
            setStudentScore={setStudentScore}
            setCorrectOption={setCorrectOption}
            submitQuizToApi={submitQuizToApi}
            user={user}
            selectedSubject={selectedSubject}
            studentScore={studentScore}
            quizTotalScore={quizTotalScore}
          />
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Questions;
