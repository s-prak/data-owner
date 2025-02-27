import CryptoJS from "crypto-js";
import natural from "natural";
import { encrypt } from "./src/crypto/encrypt.js";


const SECRET_KEY = "1234567890abcdef1234567890abcdef"; // 32 bytes key
const IV = "0000000000000000"; // 16 bytes IV


// 🔹 Decrypt function
const decrypt = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
};

// 🔹 Compute TF-IDF scores
const computeTFIDF = (documents) => {
    const tfidf = new natural.TfIdf();
    let docIDs = Object.keys(documents);

    docIDs.forEach((docId) => {
        tfidf.addDocument(documents[docId]);
    });

    let tfidfScores = {};
    docIDs.forEach((docId, index) => {
        tfidf.listTerms(index).forEach((item) => {
            let keyword = item.term;
            let score = item.tfidf;

            if (!tfidfScores[keyword]) tfidfScores[keyword] = {};
            tfidfScores[keyword][docId] = score;
        });
    });

    return tfidfScores;
};

// 🔹 Store encrypted data
let encryptedIndex = {};

// 🔹 Encrypt and index documents
const indexDocuments = (documents) => {
    let tfidfScores = computeTFIDF(documents);

    Object.keys(tfidfScores).forEach((keyword) => {
        let encryptedKeyword = encrypt(keyword);

        Object.keys(tfidfScores[keyword]).forEach((docId) => {
            let score = tfidfScores[keyword][docId];

            let encryptedDocId = encrypt(docId);
            let encryptedScore = encrypt(score.toString());

            if (!encryptedIndex[encryptedKeyword]) encryptedIndex[encryptedKeyword] = [];
            encryptedIndex[encryptedKeyword].push({ encryptedDocId, encryptedScore });
        });
    });
};

// 🔹 Search & Rank Documents
const searchEncrypted = (query) => {
    let encryptedQuery = encrypt(query);

    if (!encryptedIndex[encryptedQuery]) {
        console.log("No results found.");
        return;
    }

    let results = encryptedIndex[encryptedQuery];

    results.sort((a, b) => {
        return parseFloat(decrypt(b.encryptedScore)) - parseFloat(decrypt(a.encryptedScore));
    });

    console.log(`Results for query: "${query}"`);
    results.forEach((doc) => {
        console.log(`Doc ID: ${decrypt(doc.encryptedDocId)} | Score: ${decrypt(doc.encryptedScore)}`);
    });
};

// 🔹 Example Usage
let documents = {
    "doc1": "machine learning is amazing",
    "doc2": "deep learning helps artificial intelligence",
    "doc3": "machine learning improves privacy"
};

// Index documents
indexDocuments(documents);

// Perform encrypted search
searchEncrypted("machine");
