const CryptoJS = require("react-native-crypto-js"); // Importe les composants de CryptoJS
const ENCRYPT_KEY = "42553JDO-Copilot";

// Fonction qui permet d'encrypter une donnée
function encrypt(data) {
    let encryptedData;
    let encryptIsValid = false;
    while (encryptIsValid != true) { // On refuse le charactère "+" car il est utilisé pour séparer les données dans l'URL
        encryptedData = CryptoJS.AES.encrypt(data, ENCRYPT_KEY).toString(); // On encrypte la donnée
        if (!encryptedData.includes("+")) {
            encryptIsValid = true
        }
    }
    return encryptedData;
}

// Fonction qui permet de décrypter une donnée
function decrypt(data) {
    const decryptedDataBytes = CryptoJS.AES.decrypt(data, ENCRYPT_KEY); // On décrypte la donnée
    const decryptedData = decryptedDataBytes.toString(CryptoJS.enc.Utf8); // On la convertit en UTF-8
    return decryptedData;
}

export { encrypt, decrypt }