// src/pages/Documents.js
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await api.get("/DataOwner");
        setDocuments(response.data);
      } catch (err) {
        toast.error("Error fetching documents");
      } finally {
        setLoading(false);
      }
    };
    loadDocuments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/DataOwner/${id}`);
      setDocuments(documents.filter((doc) => doc.id !== id));
      toast.success("Document deleted successfully!");
    } catch (err) {
      toast.error("Error deleting document.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Uploaded Documents</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} title={`Keyword: ${doc.encryptedKeyword}`}>
              <Button text="Delete" onClick={() => handleDelete(doc.id)} />
            </Card>
          ))}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Documents;
