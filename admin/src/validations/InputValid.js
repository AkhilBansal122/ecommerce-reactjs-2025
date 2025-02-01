export const InputValid = (name, value) => {
    let error = "";
  
    if (value === "") {
      error = "This field is required";
      return error;
    }
    if (value.match(/^\s/)) {
      error = `Please enter valid ${name} without first space`;
      return error;
    }
    return error;
  };

  export const EmailValid = (name, value) => {
    let error = "";
  
    if (value === "") {
      error = "This field is required";
      return error;
    }
  
    if (name === "email" && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      error = "Please enter a valid email address";
      return error;
    }
    return error;
  };
  export const CountryCodeValid = (name,value)=>{
    let error ="";
    if (name === "country_code" && !value.match(/^\+[0-9]{1,3}$/)) {
      error = "Please enter a valid country code (e.g., +1, +44)";
      return error;
    }

  }
  export const PhoneNoValid = (name,value)=>{
    let error ="";
    if (name === "phone_no" && !value.match(/^[0-9]{7,15}$/)) {
      error = "Please enter a valid phone number (7-15 digits)";
      return error;
    }
  }
  export const PasswordValid = (name, value) => {
    let error = "";
  
    // Check if the field is empty
    if (value === "") {
      error = "This field is required";
      return error;
    }
  
    // Check if the password meets the criteria
    if (name === "password") {
      if (value.length < 8) {
        error = "Password must be at least 8 characters long";
        return error;
      }
      if (!/[A-Z]/.test(value)) {
        error = "Password must contain at least one uppercase letter";
        return error;
      }
      if (!/[a-z]/.test(value)) {
        error = "Password must contain at least one lowercase letter";
        return error;
      }
      if (!/[0-9]/.test(value)) {
        error = "Password must contain at least one number";
        return error;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        error = "Password must contain at least one special character";
        return error;
      }
    }
  
    return error;
  };
  
  