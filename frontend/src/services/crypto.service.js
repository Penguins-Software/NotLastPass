import AuthService from "./auth.service";   
var CryptoJS = require("crypto-js");

class CryptoService {
    encryptData(password)
    {
        // Encrypt
        const currentUser = AuthService.getCurrentUser();
        return CryptoJS.AES.encrypt(JSON.stringify(password), currentUser.id).toString();
    }
    decryptData(ciphertext)
    {
        // Decrypt
        const currentUser = AuthService.getCurrentUser();
        console.log("Crypto cipher: " + ciphertext);
        const passwordBytes = CryptoJS.AES.decrypt(ciphertext, currentUser.id);
        return JSON.parse(passwordBytes.toString(CryptoJS.enc.Utf8));
    }

}

export default new CryptoService();