import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import StudentLogin from "./components/StudentLogin";
import AdminLogin from "./components/AdminLogin";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./components/Welcome";
import Questions from "./components/Questions";
import ResultScreen from "./components/ResultScreen";
import ManageCourses from "./components/ManageCourses";
import EditCourse from "./components/EditCourse";
import AddCourse from "./components/AddCourse";
import AddSubject from "./components/AddSubject";
import ManageSubjects from "./components/ManageSubjects";
import EditSubject from "./components/EditSubject";
import AddSubject2 from "./components/AddSubject2";
import ManageQuestions from "./components/ManageQuestions";
import AddQuestion from "./components/AddQuestion";
import EditQuestion from "./components/EditQuestion";
import ManageOptions from "./components/ManageOptions";
import AddOption from "./components/AddOption";
import EditOption from "./components/EditOption";
import AddQuestion2 from "./components/AddQuestion2";
import ManageResults from "./components/ManageResults";
import SubjectResults from "./components/SubjectResults";
import EditResult from "./components/EditResult";
import Profile from "./components/Profile";
import AddAdmin from "./components/AddAdmin";
import ForgotPassword from "./components/ForgotPassword";
import CreatePassword from "./components/CreatePassword";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const [user, setUser] = useState(null);
  

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/student-login" element={<StudentLogin setUser={setUser} />} />
        <Route path="/admin-login" element={<AdminLogin setUser={setUser} />} />
        <Route path="/student-dashboard" element={<StudentDashboard user={user} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard user={user} />} />
        <Route path="/welcome" element={<Welcome user={user} />} />
        <Route path="/question" element={<Questions />} />
        <Route path="/results" element={<ResultScreen />} />
        <Route path="/admin/courses" element={<ManageCourses />} />
        <Route path="/admin/edit-course/:id" element={<EditCourse />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/add-subject" element={<AddSubject />} />
        <Route path="/admin/course/:id/subjects" element={<ManageSubjects />} />
        <Route path="/admin/course/:id/edit-subject/:subjectId" element={<EditSubject />} />
        <Route path="/admin/course/:id/add-subject" element={<AddSubject2 />} />
        <Route path="/admin/manage-subjects/:id" element={<ManageSubjects />} />
        <Route path="/admin/subject/:id/questions" element={<ManageQuestions />} />
        <Route path="/admin/subject/:id/add-question" element={<AddQuestion />} />
        <Route path="/admin/subject/:id/edit-question/:questionId" element={<EditQuestion />} />
        <Route
          path="/admin/question/:id/options"
          element={<ManageOptions />}
        />
         <Route
          path="/admin/question/:id/add-option"
          element={<AddOption />}
        />
        <Route
          path="/admin/question/:questionId/edit-option/:optionId"
          element={<EditOption />}
        />
        <Route path="/admin/add-question" element={<AddQuestion2 />} />
        <Route path="/admin/manage-results" element={<ManageResults />} />
        <Route path="/admin/subject/:id/results" element={<SubjectResults />} />
        <Route path="/admin/result/:id/edit" element={<EditResult />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-password" element={<CreatePassword />} />





      </Routes>
    </Router>
  );
};

export default App;
