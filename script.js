// Selecting input fields and initializing variables
const firstName = document.querySelector("#first-name");
const firstNameError = document.querySelector(".first-name-error");
const lastName = document.querySelector("#last-name");
const lastNameError = document.querySelector(".last-name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email-error");
const phoneNumber = document.querySelector("#phone");
const phoneError = document.querySelector(".phone-error");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const passwordError = document.querySelector(".password-error");
const confirmPasswordError = document.querySelector(".confirmPassword-error");
let isValidPassword = false;
let isConfirmed = false;


// Initializing country code selector for the phone number input
const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
    initialCountry: "auto",
    geoIpLookup: callback => {
        fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => callback(data.country_code))
        .catch(() => callback("us"));
    },
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js"
});


// Event listeners for the input fields 
firstName.addEventListener("focus", () => {
    changeBorder(firstName);
})

firstName.addEventListener("input", () => {
    if(!firstName.validity.valid || firstName.validity.patternMismatch) {
        firstNameError.innerText = "Please provide a real name";
        applyErrorStyle(firstName);
    } else {
        applyValidStyle(firstName, firstNameError);
    }
});

lastName.addEventListener("focus", () => {
    changeBorder(lastName);
})

lastName.addEventListener("input", () => {
    if(!lastName.validity.valid || lastName.validity.patternMismatch) {
        lastNameError.innerText = "Please provide a real name";
        applyErrorStyle(lastName);
    } else {
        applyValidStyle(lastName, lastNameError);
    }
});

email.addEventListener("focus", () => {
    changeBorder(email);
})

email.addEventListener("blur", validateEmail);

phoneNumber.addEventListener("focus", function() {
    changeBorder(phoneNumber);
})

phoneNumber.addEventListener("blur", validatePhoneNumber);

password.addEventListener("input", validatePassword);

password.addEventListener("focus", function() {
    changeBorder(password);
})

password.addEventListener("blur", function() {
    if (isValidPassword) {
        applyValidStyle(password, passwordError);
    } else {
        applyErrorStyle(password);
    }
})

confirmPassword.addEventListener("input", confirmationPassword);

confirmPassword.addEventListener("focus", function() {
    changeBorder(confirmPassword);
})

confirmPassword.addEventListener("blur", function() {
    if (isConfirmed) {
        applyValidStyle(confirmPassword, confirmPasswordError);
    } else {
        applyErrorStyle(confirmPassword);
    }
})


// Validate user's email
function validateEmail() {
    if (!email.validity.valid) {
        emailError.innerText = "Please enter valid email";
        applyErrorStyle(email);
    } else {
        applyValidStyle(email, emailError);
    }
}


// Validate the phone number using Intl Tel isValidNumber() method
function validatePhoneNumber() {
    if (iti.isValidNumber()) {
        applyValidStyle(phoneNumber, phoneError);
    } else {
        phoneError.innerText = "Please enter a valid phone number";
        applyErrorStyle(phoneNumber);
    }
}


// Validate user's password
function validatePassword() {
    if (password.value.length < 8) {
        passwordError.innerText = "Password must contain a minimum of 8 characters";
        isValidPassword = false;
    } else if (password.validity.patternMismatch){
        passwordError.innerText = "Password must contain at least one letter and one digit";
        isValidPassword = false;
    } else {
        passwordError.innerText = "";
        isValidPassword = true;
    }

    confirmationPassword();
}


// Check the user's password confirmation
function confirmationPassword() {
    if (password.value === confirmPassword.value) {
        isConfirmed = true;
        confirmPasswordError.innerText = "";
    } else if (confirmPassword.value.length > 0) {
        isConfirmed = false;
        confirmPasswordError.innerText = "Passwords do not match";
    }
}


// Applying error styling for the input field
function applyErrorStyle(element) {
    element.style.border = "2px solid #FF0038";
    element.style.boxShadow = "0 4px 8px rgba(255, 0, 56, 0.5)";
}


// Applying valid styling for the input field
function applyValidStyle(element, error) {
    error.innerText = "";
    element.style.border = "2px solid #4A5F8C";
    element.style.boxShadow = "0 8px 16px rgba(74, 95, 140, 0.5)";
}

// Border styling for focus event
function changeBorder(element) {
    element.style.border = "";
}


// Prevent default submission
const button = document.querySelector(".submit-button");
button.addEventListener("click", (event) => {
    event.preventDefault();
})