// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Table, Container, Button, FormControl, InputGroup, Row, Col } from "react-bootstrap";
// import axios from "axios";
// import { FormatDate } from "./FormatDate";

// const SubjectResults = () => {
//   const { id } = useParams(); // Get subject ID from URL
//   const [results, setResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [subjectName, setSubjectName] = useState(""); // Store subject name
//   const [searchQuery, setSearchQuery] = useState(""); // Search input state
//   const navigate = useNavigate();

//   // Fetch results and subject name for the given subject ID
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const resultsResponse = await axios.get(
//           `http://127.0.0.1:8000/api/results/?subject=${id}`
//         );
//         setResults(resultsResponse.data);
//         setFilteredResults(resultsResponse.data); // Initialize filtered results

//         const subjectResponse = await axios.get(
//           `http://127.0.0.1:8000/api/subjects/${id}/`
//         );
//         setSubjectName(subjectResponse.data.name);
//       } catch (err) {
//         console.error("Error fetching data:", err.message);
//       }
//     };

//     fetchResults();
//   }, [id]);

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter results based on student name
//     const filtered = results.filter((result) =>
//       result.student.toLowerCase().includes(query)
//     );
//     setFilteredResults(filtered);
//   };

//   // Handle delete action
//   const handleDelete = async (resultId) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/results/${resultId}/`);
//       setResults((prevResults) =>
//         prevResults.filter((result) => result.id !== resultId)
//       );
//       setFilteredResults((prevResults) =>
//         prevResults.filter((result) => result.id !== resultId)
//       );
//     } catch (err) {
//       console.error("Error deleting result:", err.message);
//     }
//   };

//   return (
//     <Container
//       fluid
//       className="py-4"
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//       }}
//     >
//       <Row className="mb-4">
//         <Col xs={12} className="text-center">
//           <h1
//             style={{
//               fontWeight: "bold",
//               color: "#495057",
//               fontSize: "1.8rem",
//             }}
//           >
//             Results for Subject: {subjectName || "Loading..."}
//           </h1>
//         </Col>
//       </Row>

//       {/* Search Bar */}
//       <Row className="mb-3">
//         <Col xs={12} md={6} className="mx-auto">
//           <InputGroup>
//             <FormControl
//               type="text"
//               placeholder="Search by Student Name..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               style={{
//                 borderRadius: "20px",
//                 padding: "10px",
//                 boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
//               }}
//             />
//           </InputGroup>
//         </Col>
//       </Row>

//       {/* Results Table */}
//       <Row>
//         <Col xs={12}>
//           {filteredResults.length > 0 ? (
//             <Table
//               responsive
//               striped
//               bordered
//               hover
//               className="shadow-sm"
//               style={{
//                 background: "#ffffff",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//               }}
//             >
//               <thead
//                 style={{
//                   backgroundColor: "#343a40",
//                   color: "#ffffff",
//                   textAlign: "center",
//                 }}
//               >
//                 <tr>
//                   <th>#</th>
//                   <th>Student Name</th>
//                   <th>Marks</th>
//                   <th>Date</th>
//                   <th>Subject</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredResults.map((result, index) => (
//                   <tr key={result.id} style={{ textAlign: "center" }}>
//                     <td>{index + 1}</td>
//                     <td style={{ fontWeight: "bold", color: "#495057" }}>
//                       {result.student}
//                     </td>
//                     <td>{result.marks}</td>
//                     <td>{FormatDate(result.date)}</td>
//                     <td>{subjectName}</td>
//                     <td>
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-2"
//                         style={{ fontWeight: "bold", borderRadius: "5px" }}
//                         onClick={() =>
//                           navigate(`/admin/result/${result.id}/edit`)
//                         }
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         style={{ fontWeight: "bold", borderRadius: "5px" }}
//                         onClick={() => handleDelete(result.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           ) : (
//             <p className="text-muted text-center">No results found for this subject.</p>
//           )}
//         </Col>
//       </Row>

//       {/* Add Back and Dashboard buttons */}
//       <Row className="mt-4">
//         <Col xs={12} className="d-flex justify-content-between">
//           <Button
//             variant="secondary"
//             style={{ fontWeight: "bold", borderRadius: "5px" }}
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </Button>
//           <Button
//             variant="success"
//             style={{ fontWeight: "bold", borderRadius: "5px" }}
//             onClick={() => navigate("/admin-dashboard")}
//           >
//             Dashboard
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SubjectResults;





// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Table, Container, Button, FormControl, InputGroup, Row, Col } from "react-bootstrap";
// import axios from "axios";
// import { FormatDate } from "./FormatDate";

// const SubjectResults = () => {
//   const { id } = useParams(); // Get subject ID from URL
//   const [results, setResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [subjectName, setSubjectName] = useState(""); // Store subject name
//   const [searchQuery, setSearchQuery] = useState(""); // Search input state
//   const navigate = useNavigate();

//   // Fetch results and subject name for the given subject ID
//   useEffect(() => {
//   const fetchResults = async () => {
//     try {
//       const resultsResponse = await axios.get(
//         `http://127.0.0.1:8000/api/results/?subject=${id}`
//       );

//       // Sort results by marks in descending order
//       const sortedResults = resultsResponse.data.sort(
//         (a, b) => b.marks - a.marks
//       );

//       setResults(sortedResults);
//       setFilteredResults(sortedResults); // Initialize filtered results

//       const subjectResponse = await axios.get(
//         `http://127.0.0.1:8000/api/subjects/${id}/`
//       );
//       setSubjectName(subjectResponse.data.name);
//     } catch (err) {
//       console.error("Error fetching data:", err.message);
//     }
//   };

//   fetchResults();
// }, [id]);


//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter results based on student name
//     const filtered = results.filter((result) =>
//       result.student.toLowerCase().includes(query)
//     );
//     setFilteredResults(filtered);
//   };

//   // Handle delete action
//   const handleDelete = async (resultId) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/results/${resultId}/`);
//       setResults((prevResults) =>
//         prevResults.filter((result) => result.id !== resultId)
//       );
//       setFilteredResults((prevResults) =>
//         prevResults.filter((result) => result.id !== resultId)
//       );
//     } catch (err) {
//       console.error("Error deleting result:", err.message);
//     }
//   };

//   return (
//     <Container
//       fluid
//       className="py-4"
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//       }}
//     >
//       <Row className="mb-4">
//         <Col xs={12} className="text-center">
//           <h1
//             style={{
//               fontWeight: "bold",
//               color: "#495057",
//               fontSize: "1.8rem",
//             }}
//           >
//             Results for Subject: {subjectName || "Loading..."}
//           </h1>
//         </Col>
//       </Row>

//       {/* Search Bar */}
//       <Row className="mb-3">
//         <Col xs={12} md={6} className="mx-auto">
//           <InputGroup>
//             <FormControl
//               type="text"
//               placeholder="Search by Student Name..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               style={{
//                 borderRadius: "20px",
//                 padding: "10px",
//                 boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
//               }}
//             />
//           </InputGroup>
//         </Col>
//       </Row>

//       {/* Results Table */}
//       <Row>
//         <Col xs={12}>
//           {filteredResults.length > 0 ? (
//             <Table
//               responsive
//               striped
//               bordered
//               hover
//               className="shadow-sm"
//               style={{
//                 background: "#ffffff",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//               }}
//             >
//               <thead
//                 style={{
//                   backgroundColor: "#343a40",
//                   color: "#ffffff",
//                   textAlign: "center",
//                 }}
//               >
//                 <tr>
//                   <th>#</th>
//                   <th>Student Name</th>
//                   <th>Marks</th>
//                   <th>Date</th>
//                   <th>Subject</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredResults.map((result, index) => (
//                   <tr key={result.id} style={{ textAlign: "center" }}>
//                     <td>{index + 1}</td>
//                     <td style={{ fontWeight: "bold", color: "#495057" }}>
//                       {result.student}
//                     </td>
//                     <td>{result.marks}</td>
//                     <td>{FormatDate(result.date)}</td>
//                     <td>{subjectName}</td>
//                     <td>
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-2"
//                         style={{ fontWeight: "bold", borderRadius: "5px" }}
//                         onClick={() =>
//                           navigate(`/admin/result/${result.id}/edit`)
//                         }
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         style={{ fontWeight: "bold", borderRadius: "5px" }}
//                         onClick={() => handleDelete(result.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           ) : (
//             <p className="text-muted text-center">No results found for this subject.</p>
//           )}
//         </Col>
//       </Row>

//       {/* Add Back and Dashboard buttons */}
//       <Row className="mt-4">
//         <Col xs={12} className="d-flex justify-content-between">
//           <Button
//             variant="secondary"
//             style={{ fontWeight: "bold", borderRadius: "5px" }}
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </Button>
//           <Button
//             variant="success"
//             style={{ fontWeight: "bold", borderRadius: "5px" }}
//             onClick={() => navigate("/admin-dashboard")}
//           >
//             Dashboard
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SubjectResults;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Table, Container, Button, FormControl, InputGroup, Row, Col } from "react-bootstrap";
// import axios from "axios";
// import { FormatDate } from "./FormatDate";

// const SubjectResults = () => {
//   const { id } = useParams(); 
//   const [results, setResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [subjectName, setSubjectName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const resultsResponse = await axios.get(
//           `http://127.0.0.1:8000/api/results/?subject=${id}`
//         );
//         const sortedResults = resultsResponse.data.sort((a, b) => b.marks - a.marks);
//         setResults(sortedResults);
//         setFilteredResults(sortedResults);

//         const subjectResponse = await axios.get(
//           `http://127.0.0.1:8000/api/subjects/${id}/`
//         );
//         setSubjectName(subjectResponse.data.name);
//       } catch (err) {
//         console.error("Error fetching data:", err.message);
//       }
//     };

//     fetchResults();
//   }, [id]);

//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = results.filter((result) =>
//       result.student.toLowerCase().includes(query)
//     );
//     setFilteredResults(filtered);
//   };

//   const handleDelete = async (resultId) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/results/${resultId}/`);
//       setResults((prev) => prev.filter((r) => r.id !== resultId));
//       setFilteredResults((prev) => prev.filter((r) => r.id !== resultId));
//     } catch (err) {
//       console.error("Error deleting result:", err.message);
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (!window.confirm(`Are you sure you want to delete ALL results for ${subjectName}?`)) {
//       return;
//     }
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/results/subject/${id}/delete/`);
//       setResults([]);
//       setFilteredResults([]);
//     } catch (err) {
//       console.error("Error deleting all results:", err.message);
//     }
//   };

//   return (
//     <Container
//       fluid
//       className="py-4"
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
//       }}
//     >
//       <Row className="mb-4">
//         <Col xs={12} className="text-center">
//           <h1 style={{ fontWeight: "bold", color: "#495057", fontSize: "1.8rem" }}>
//             Results for Subject: {subjectName || "Loading..."}
//           </h1>
//         </Col>
//       </Row>

//       {/* Search + Delete All */}
//       <Row className="mb-3 align-items-center">
//         <Col xs={12} md={6} className="mx-auto">
//           <InputGroup>
//             <FormControl
//               type="text"
//               placeholder="Search by Student Name..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               style={{
//                 borderRadius: "20px",
//                 padding: "10px",
//                 boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
//               }}
//             />
//           </InputGroup>
//         </Col>
//         <Col xs={12} md="auto" className="mt-2 mt-md-0 text-center">
//           <Button variant="danger" style={{ fontWeight: "bold", borderRadius: "5px" }} onClick={handleDeleteAll}>
//             Delete All
//           </Button>
//         </Col>
//       </Row>

//       {/* Results Table */}
//       <Row>
//         <Col xs={12}>
//           {filteredResults.length > 0 ? (
//             <Table
//               responsive
//               striped
//               bordered
//               hover
//               className="shadow-sm"
//               style={{ background: "#ffffff", borderRadius: "10px", overflow: "hidden" }}
//             >
//               <thead style={{ backgroundColor: "#343a40", color: "#ffffff", textAlign: "center" }}>
//                 <tr>
//                   <th>#</th>
//                   <th>Student Name</th>
//                   <th>Marks</th>
//                   <th>Date</th>
//                   <th>Subject</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredResults.map((result, index) => (
//                   <tr key={result.id} style={{ textAlign: "center" }}>
//                     <td>{index + 1}</td>
//                     <td style={{ fontWeight: "bold", color: "#495057" }}>{result.student}</td>
//                     <td>{result.marks}</td>
//                     <td>{FormatDate(result.date)}</td>
//                     <td>{subjectName}</td>
//                     <td>
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-2"
//                         style={{ fontWeight: "bold", borderRadius: "5px" }}
//                         onClick={() => navigate(`/admin/result/${result.id}/edit`)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         style={{ fontWeight: "bold", borderRadius: "5px" }}
//                         onClick={() => handleDelete(result.id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           ) : (
//             <p className="text-muted text-center">No results found for this subject.</p>
//           )}
//         </Col>
//       </Row>

//       {/* Back and Dashboard */}
//       <Row className="mt-4">
//         <Col xs={12} className="d-flex justify-content-between">
//           <Button
//             variant="secondary"
//             style={{ fontWeight: "bold", borderRadius: "5px" }}
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </Button>
//           <Button
//             variant="success"
//             style={{ fontWeight: "bold", borderRadius: "5px" }}
//             onClick={() => navigate("/admin-dashboard")}
//           >
//             Dashboard
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SubjectResults;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Container, Button, FormControl, InputGroup, Row, Col } from "react-bootstrap";
import axios from "axios";
import { FormatDate } from "./FormatDate";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const SubjectResults = () => {
  const { id } = useParams(); 
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsResponse = await axios.get(
          `http://127.0.0.1:8000/api/results/?subject=${id}`
        );
        const sortedResults = resultsResponse.data.sort((a, b) => b.marks - a.marks);
        setResults(sortedResults);
        setFilteredResults(sortedResults);

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

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = results.filter((result) =>
      result.student.toLowerCase().includes(query)
    );
    setFilteredResults(filtered);
  };

  const handleDelete = async (resultId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/results/${resultId}/`);
      setResults((prev) => prev.filter((r) => r.id !== resultId));
      setFilteredResults((prev) => prev.filter((r) => r.id !== resultId));
    } catch (err) {
      console.error("Error deleting result:", err.message);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm(`Are you sure you want to delete ALL results for ${subjectName}?`)) {
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/results/subject/${id}/delete/`);
      setResults([]);
      setFilteredResults([]);
    } catch (err) {
      console.error("Error deleting all results:", err.message);
    }
  };

  // Download PDF
  const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Results for ${subjectName}`, 14, 15);

  const tableColumn = ["#", "Student Name", "Marks", "Date", "Subject"];
  const tableRows = filteredResults.map((res, index) => [
    index + 1,
    res.student,
    res.marks,
    FormatDate(res.date),
    subjectName,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save(`Results_${subjectName}.pdf`);
};

  // Download Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredResults.map((res, index) => ({
        "#": index + 1,
        "Student Name": res.student,
        Marks: res.marks,
        Date: FormatDate(res.date),
        Subject: subjectName,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, `Results_${subjectName}.xlsx`);
  };

  return (
    <Container
      fluid
      className="py-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
    >
      <Row className="mb-4">
        <Col xs={12} className="text-center">
          <h1 style={{ fontWeight: "bold", color: "#495057", fontSize: "1.8rem" }}>
            Results for Subject: {subjectName || "Loading..."}
          </h1>
        </Col>
      </Row>

      {/* Search + Delete All + Download Buttons */}
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={4}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by Student Name..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                borderRadius: "20px",
                padding: "10px",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md="auto" className="mt-2 mt-md-0">
          <Button variant="danger" onClick={handleDeleteAll}>Delete All</Button>
        </Col>
        <Col xs={12} md="auto" className="mt-2 mt-md-0">
          <Button variant="primary" onClick={handleDownloadPDF}>Download PDF</Button>
        </Col>
        <Col xs={12} md="auto" className="mt-2 mt-md-0">
          <Button variant="success" onClick={handleDownloadExcel}>Download Excel</Button>
        </Col>
      </Row>

      {/* Results Table */}
      <Row>
        <Col xs={12}>
          {filteredResults.length > 0 ? (
            <Table responsive striped bordered hover className="shadow-sm" style={{ background: "#ffffff", borderRadius: "10px", overflow: "hidden" }}>
              <thead style={{ backgroundColor: "#343a40", color: "#ffffff", textAlign: "center" }}>
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
                  <tr key={result.id} style={{ textAlign: "center" }}>
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
                        onClick={() => navigate(`/admin/result/${result.id}/edit`)}
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
            <p className="text-muted text-center">No results found for this subject.</p>
          )}
        </Col>
      </Row>

      {/* Back and Dashboard */}
      <Row className="mt-4">
        <Col xs={12} className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
          <Button variant="success" onClick={() => navigate("/admin-dashboard")}>Dashboard</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SubjectResults;

