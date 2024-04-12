// validations.js
const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for basic phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  
  const isValidPassword = (password) => {
    // Password must be at least 6 characters long and contain one special character, one digit, and one alphabet
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    return passwordRegex.test(password);
  };
  
  const isValidName = (name) => {
    // Name must start with an alphabet and not contain special characters
    const nameRegex = /^[A-Za-z][A-Za-z\s]*$/;
    return nameRegex.test(name);
  };
  
  const isValidsport = (favoriteSport) => {
    // Name must start with an alphabet and not contain special characters
    const nameRegex = /^[A-Za-z][A-Za-z\s]*$/;
    return nameRegex.test(favoriteSport);
  };
  
  const isValidAddress = (address) => {
    // Address must be at least 12 characters long
    return address.length >= 0;
  };
  
  const validateForm = (name, email, phoneNumber, password, address) => {
    // if (!name || !email || !phoneNumber || !password || !address || !favoriteSport) {
    //   return "All fields are required.";
    // }

    if(!name){
      alert("Name is required")
      return "Name is required"
    }

    if(!email)
    {
      alert("Email is required")
      return "email is required"
    }
    if(!phoneNumber)
    {
      alert("phoneNumber is required")
      return "phoneNumber is required"
    }
    if(!password)
    {
      alert("Password is required")
      return "Password is required"
    }
    if(!address)
    {
      alert("Address is required")
      return "Address is required"
    }
  
    if (!isValidName(name)) {
      alert("Name must start with an alphabet and not contain special characters.")
      return "Name must start with an alphabet and not contain special characters.";
    }
  
    if (!isValidEmail(email)) {
      alert("Invalid email address")
      return "Invalid email address.";
    }
  
    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Invalid phone number")
      return "Invalid phone number.";
    }
  
    if (!isValidPassword(password)) {
      alert("Password must be at l east 6 characters long and contain one special character, one digit, and one alphabet.")
      return "Password must be at l east 6 characters long and contain one special character, one digit, and one alphabet.";
    }
  
    if (!isValidAddress(address)) {
      alert("Address must be at least 12 characters long.")
      return "Address must be at least 12 characters long.";
    }
    return null; // No validation error
  };
  
  export default validateForm;