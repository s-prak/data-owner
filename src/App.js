import './App.css';
import api from './api/axiosConfig';
import { useState } from 'react';

// Reusable InputField component
const InputField = ({ label, value, onChange, type = "text", required }) => (
  <div className="input-field-container">
    <label className="input-label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="input-field"
      required={required}
    />
  </div>
);

// Reusable Button component
const Button = ({ text, onClick, disabled }) => (
  <button
    onClick={onClick}
    className="submit-button"
    disabled={disabled}
  >
    {text}
  </button>
);

function App() {
  const [document, setDocument] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    const postData = {
      document: document,
      keyword: keyword
    };

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/DataOwner", postData);
      console.log("Upload successful:", response.data);
      setMessage("Document uploaded successfully!");
    } catch (err) {
      console.error("Error uploading document:", err);
      setMessage("Error uploading document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <InputField
          label="Document"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          required
        />
        <InputField
          label="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
        <Button
          text={loading ? "Uploading..." : "Upload"}
          onClick={handleSubmit}
          disabled={loading || !document || !keyword}
        />
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;
