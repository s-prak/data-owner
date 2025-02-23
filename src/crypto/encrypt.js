import CryptoJS from 'crypto-js';

const SECRET_KEY = "1234567890abcdef1234567890abcdef"; // Must be 32 characters
const IV = "0000000000000000"; // 16 characters

const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();
};

//console.log(encrypt("soil"));

export { encrypt };
