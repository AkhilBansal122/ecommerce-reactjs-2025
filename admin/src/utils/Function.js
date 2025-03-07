var CryptoJS = require("crypto-js");

export const moduleAccessArr = [
     { label: "Dashboard", value: "Dashboard" },
    { label: "Role Management", value: "Role Management" },
    { label: "Permission Management", value: "Permission Management" },
    { label: "User Management", value: "User Management" },
    { label: "CMS Manager", value: "CMS Manager" },
    { label: "Category Management", value: "Category Management" },
    { label :"Sub Category Management",value:"Sub Category Management"},
    { label :"Product Management",value:"Product Management"},
    { label: "CMS Manager", value: "CMS Manager" },
    { label: "FAQ Manager", value: "FAQ Manager" },
    
]

export const AllModuleAccessArr = () => {
    return moduleAccessArr.map(item => item.value);
}

export const getUserSettings = () => {
    var token = CryptoJS.AES.decrypt(localStorage.security_data, process.env.REACT_APP_JWT_SECRET);
    var decryptedData = JSON.parse(token.toString(CryptoJS.enc.Utf8));
}

export const debounceSearch = (func, delay) => {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), delay);
    };
};

export const HasConsecutiveSpaces = (str) => {
    const string = /  +/.test(str);
    return string
}

export const RemoveEmptyObjKey = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
}

export const isValidHttpUrl = (string) => {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

export const calculatePercentage = (value, percentage) => {
    return (value / 100) * percentage;
}