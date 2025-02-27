import { useState } from "react";
import { encrypt } from "../crypto/encrypt";
import api from "../api/axiosConfig";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/pages/UploadDocument.css"; // Import the cool CSS

const UploadDocument = () => {
  const [document, setDocument] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!document || !keyword) {
      toast.warn("Both fields are required!");
      return;
    }

    const encryptedDocument = encrypt(document);
    const encryptedKeyword = encrypt(keyword);

    setLoading(true);

    try {
      await api.post("/DataOwner", { document: encryptedDocument, keyword: encryptedKeyword });
      toast.success("Document uploaded successfully!");
      setDocument("");
      setKeyword("");
    } catch (err) {
      toast.error("Error uploading document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-form">
        <h2 className="upload-title">Upload Document</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <label htmlFor="document" className="input-label">Document</label>
            <InputField
              id="document"
              placeholder="Enter your document"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="keyword" className="input-label">Keyword</label>
            <InputField
              id="keyword"
              placeholder="Enter keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {loading ? <Loader className="upload-loader" /> : <Button className="upload-btn" text="Upload" />}
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} className="toast-container" />
    </div>
  );
};

export default UploadDocument;
