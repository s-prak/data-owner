import './App.css';
import api from './api/axiosConfig';
import { useState } from 'react';
import InputField from './components/InputField';
import Button from './components/Button';
import { encrypt } from './crypto/encrypt';

function App() {
  const [document, setDocument] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    const encryptedDocument= encrypt(document);
    const encryptedKeyword= encrypt(keyword);

    const postData = {
      document: encryptedDocument,
      keyword: encryptedKeyword
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