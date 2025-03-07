var CryptoJS = require("crypto-js");
export function authHeader(unAuth = null, isFile = null) {
    if (unAuth) {
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    } else {
        let authToken = localStorage.getItem('security_data');
        var bytes = CryptoJS.AES.decrypt(authToken, process.env.REACT_APP_JWT_SECRET);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      
        if (isFile) {
            return {
                Accept: "multipart/form-data",
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + decryptedData?.access_token
            };
        } else {
            return {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + decryptedData?.access_token
            };
        }
    }
}
