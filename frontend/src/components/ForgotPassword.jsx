import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [securityOptions, setSecurityOptions] = useState([]);
  const [selected, setSelected] = useState("");
  const [stage, setStage] = useState("enter-username");
  const navigate = useNavigate();

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/security-question/${username}/`);
      const { real_message, fake_options } = response.data;

      const options = [...fake_options, real_message].sort(() => 0.5 - Math.random());
      setSecurityOptions(options);
      setStage("select-option");
    } catch (error) {
      toast.error("Username not found or server error.");
    }
  };

  const handleSecurityCheck = () => {
    axios
      .post("http://127.0.0.1:8000/api/verify-security-answer/", {
        username,
        selected_answer: selected,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/create-password", { state: { username } });
        } else {
          toast.error("Incorrect security message selected.");
        }
      })
      .catch(() => {
        toast.error("Verification failed.");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Header className="text-white text-center" style={{ background: "#6a11cb" }}>
          <h3>Forgot Password</h3>
        </Card.Header>
        <Card.Body>
          {stage === "enter-username" ? (
            <Form onSubmit={handleUsernameSubmit}>
              <Form.Group>
                <Form.Label>Enter your username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Button className="mt-3" type="submit">Submit</Button>
            </Form>
          ) : (
            <>
              <Form.Label>Select your security message</Form.Label>
              {securityOptions.map((option, idx) => (
                <Form.Check
                  key={idx}
                  type="radio"
                  name="security_option"
                  label={option}
                  value={option}
                  onChange={(e) => setSelected(e.target.value)}
                  checked={selected === option}
                  className="mb-2"
                />
              ))}
              <Button className="mt-3" onClick={handleSecurityCheck} disabled={!selected}>
                Verify & Continue
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
