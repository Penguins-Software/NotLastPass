import AuthService from "./auth.service";   
var CryptoJS = require("crypto-js");

class CryptoService {

    generatePassword(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?[]{}';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
       }
       return result;
    }

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
        const passwordBytes = CryptoJS.AES.decrypt(ciphertext, currentUser.id);
        return JSON.parse(passwordBytes.toString(CryptoJS.enc.Utf8));
    }
}

export default new CryptoService();