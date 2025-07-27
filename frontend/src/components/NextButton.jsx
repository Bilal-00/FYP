import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NextButton = ({ setQuestionIndex, numQuestions, questionIndex ,selectedOption,
  setSelectedOption,
  correctOption,
  setStudentScore,
  setCorrectOption,
  submitQuizToApi,
user,
selectedSubject,
studentScore,
quizTotalScore}) => {
  const percentage =(studentScore/quizTotalScore) * 100
    const navigate = useNavigate();
  if (selectedOption === null) return null;
  function NextQuestion() {
    setQuestionIndex((curr) => curr + 1);
    if(selectedOption === correctOption){
      setStudentScore(curr => curr + 5)
  }
    setSelectedOption(null)
    setCorrectOption(null); // Reset correctOption
  }

  function submitQuiz() {
    let updatedScore = studentScore; // Default to the current score
  
    if (selectedOption === correctOption) {
      updatedScore += 5; // Increment the score if the answer is correct
      setStudentScore(updatedScore); // Update the state
    }
  
    // Always call submitQuizToApi with the current or updated score
    submitQuizToApi(updatedScore);
  
    const percentages = (updatedScore / quizTotalScore) * 100;
  
    // Navigate to the result screen
    navigate('/results', {
      state: {
        username: user.username,
        department: user.department,
        subjectName: selectedSubject.name,
        marks: updatedScore,
        Total: quizTotalScore,
        per: percentages,
      },
    });
  }

  return (
    <>
    <div className="d-flex justify-content-center">
    
      {questionIndex === numQuestions - 1 ? (
    
        <Button 
          variant="success" 
          className="mt-3 px-4 py-2" 
          size="lg"
          onClick={submitQuiz}
        >
          <FaCheck className="me-2" /> Submit Quiz
        </Button>
      ) : (
        <Button 
          variant="primary" 
          className="mt-3 px-4 py-2" 
          size="lg" 
          onClick={NextQuestion}
        >
          Next <FaArrowRight className="ms-2" />
        </Button>
        
      )}
      </div>
    </>
  );
};

export default NextButton;
