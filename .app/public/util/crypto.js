const CryptoJS = require("react-native-crypto-js");
const ENCRYPT_KEY = "42553JDO-Copilot";
function encrypt(data) {
    let encryptedPassword;
    let encryptIsValid = false;
    while (encryptIsValid != true) {
        encryptedPassword = CryptoJS.AES.encrypt(data, ENCRYPT_KEY).toString();
        if (!encryptedPassword.includes("+")) {
            encryptIsValid = true
        }
    }
    return encryptedPassword;
}

function decrypt(data) {
    const decryptedPasswordBytes = CryptoJS.AES.decrypt(data, ENCRYPT_KEY);
    const decryptedPassword = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
}

export { encrypt, decrypt }