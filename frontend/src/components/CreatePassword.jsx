// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Form, Button, Card } from "react-bootstrap";
// import { toast } from "react-toastify";

// const CreatePassword = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [passwords, setPasswords] = useState({ password: "", confirm_password: "" });

//   const handleChange = (e) => {
//     setPasswords({ ...passwords, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { password, confirm_password } = passwords;

//     if (password !== confirm_password) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     try {
//       await axios.post("http://127.0.0.1:8000/api/reset-password/", {
//         username: state?.username,
//         new_password: password,
//       });
//       toast.success("Password reset successful.");
//       navigate("/student-login");
//     } catch (error) {
//       toast.error("Failed to reset password.");
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Card className="shadow-lg p-4 rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
//         <Card.Header className="text-white text-center" style={{ background: "#2575fc" }}>
//           <h3>Reset Password</h3>
//         </Card.Header>
//         <Card.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>New Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="confirm_password"
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Button type="submit" className="w-100">Reset Password</Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default CreatePassword;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CreatePassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState({ password: false, confirm_password: false });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirm_password } = passwords;

    if (password !== confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/reset-password/", {
        username: state?.username,
        new_password: password,
      });
      toast.success("Password reset successful.");
      navigate("/student-login");
    } catch (error) {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Header className="text-white text-center" style={{ background: "#2575fc" }}>
          <h3>Reset Password</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  required
                />
                <Button variant="outline-secondary" onClick={() => toggleVisibility("password")}>
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword.confirm_password ? "text" : "password"}
                  name="confirm_password"
                  onChange={handleChange}
                  required
                />
                <Button variant="outline-secondary" onClick={() => toggleVisibility("confirm_password")}>
                  {showPassword.confirm_password ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="w-100">Reset Password</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreatePassword;

