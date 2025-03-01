// src/pages/Documents.js
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await api.get("/DataOwner");
        console.log("Fetched documents:", response.data); // Log documents
        setDocuments(response.data);
      } catch (err) {
        toast.error("Error fetching documents");
      } finally {
        setLoading(false);
      }
    };
    loadDocuments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Uploaded Documents</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} title={`Keyword: ${doc.keyword}`}>
              <p className="text-gray-600">Content: {doc.document}</p>
            </Card>
          ))}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Documents;
