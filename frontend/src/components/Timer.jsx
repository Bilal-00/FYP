import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar, Card } from 'react-bootstrap';

const Timer = ({
  timeRemaining,
  setTimeRemaining,
  submitQuizToApi,
  studentScore,
  user,
  selectedSubject,
  quizTotalScore,
}) => {
  const navigate = useNavigate();
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  const percentage = (studentScore / quizTotalScore) * 100;

  useEffect(() => {
    const id = setInterval(() => {
      setTimeRemaining((curr) => curr - 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (timeRemaining === 0) {
    submitQuizToApi(studentScore);
    navigate('/results', {
      state: {
        username: user.username,
        department: user.department,
        subjectName: selectedSubject.name,
        marks: studentScore,
        Total: quizTotalScore,
        per: percentage,
      },
    });
  }

  return (
    <Card className="shadow-lg mt-3 p-3" style={{ maxWidth: '20rem' }}>
      <Card.Header className="text-center bg-primary text-white">
        <h4>Time Remaining</h4>
      </Card.Header>
      <Card.Body>
        <div className="text-center fs-4">
          {mins < 10 && '0'}
          {mins}:{secs < 10 && '0'}
          {secs}
        </div>
        <ProgressBar
          now={(timeRemaining / (quizTotalScore * 60)) * 100}
          variant={timeRemaining > 30 ? 'success' : 'danger'}
          className="mt-3"
        />
      </Card.Body>
    </Card>
  );
};

export default Timer;
