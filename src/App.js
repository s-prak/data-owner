// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadDocument from "./pages/UploadDocument";
import Documents from "./pages/Documents";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<UploadDocument />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
