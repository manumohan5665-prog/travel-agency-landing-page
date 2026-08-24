// SELECT FORM AND INPUTS

const signupForm = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const city = document.getElementById("city");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// SHOW ERROR

function showError(input, message) {

    const errorElement = document.getElementById(`${input.id}Error`);

    errorElement.textContent = message;

    input.classList.add("invalid");
    input.classList.remove("valid");
}

// SHOW SUCCESS

function showSuccess(input) {

    const errorElement = document.getElementById(`${input.id}Error`);

    errorElement.textContent = "";

    input.classList.add("valid");
    input.classList.remove("invalid");
}

// VALIDATE FULL NAME

function validateFullName() {

    if (fullName.value.trim() === "") {

        showError(
            fullName,
            "Full name is required"
        );

        return false;
    }

    showSuccess(fullName);

    return true;
}

// VALIDATE EMAIL

function validateEmail() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        showError(
            email,
            "Email address is required"
        );

        return false;
    }

    if (
        !emailPattern.test(
            email.value.trim()
        )
    ) {

        showError(
            email,
            "Enter a valid email address"
        );

        return false;
    }

    showSuccess(email);

    return true;
}

// VALIDATE PHONE

function validatePhone() {

    const phonePattern = /^\d{10}$/;

    if (phone.value.trim() === "") {

        showError(
            phone,
            "Phone number is required"
        );

        return false;
    }

    if (
        !phonePattern.test(
            phone.value.trim()
        )
    ) {

        showError(
            phone,
            "Phone number must contain exactly 10 digits"
        );

        return false;
    }

    showSuccess(phone);

    return true;
}

// VALIDATE CITY

function validateCity() {

    const cityPattern = /^[A-Za-z\s]+$/;

    if (city.value.trim() === "") {

        showError(
            city,
            "City is required"
        );

        return false;
    }

    if (
        !cityPattern.test(
            city.value.trim()
        )
    ) {

        showError(
            city,
            "City must contain only alphabets"
        );

        return false;
    }

    showSuccess(city);

    return true;
}

// VALIDATE PASSWORD

function validatePassword() {

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (password.value === "") {

        showError(
            password,
            "Password is required"
        );

        return false;
    }

    if (
        !passwordPattern.test(
            password.value
        )
    ) {

        showError(
            password,
            "Password must be at least 8 characters and contain letters and numbers"
        );

        return false;
    }

    showSuccess(password);

    return true;
}

// VALIDATE CONFIRM PASSWORD

function validateConfirmPassword() {

    if (confirmPassword.value === "") {

        showError(
            confirmPassword,
            "Please confirm your password"
        );

        return false;
    }

    if (
        password.value !==
        confirmPassword.value
    ) {

        showError(
            confirmPassword,
            "Passwords do not match"
        );

        return false;
    }

    showSuccess(confirmPassword);

    return true;
}

// REAL-TIME VALIDATION

fullName.addEventListener(
    "input",
    validateFullName
);


email.addEventListener(
    "input",
    validateEmail
);


phone.addEventListener(
    "input",
    validatePhone
);


city.addEventListener(
    "input",
    validateCity
);


password.addEventListener(
    "input",
    function () {

        validatePassword();

        // Re-check confirm password
        // when the main password changes
        if (confirmPassword.value !== "") {

            validateConfirmPassword();
        }

    }
);


confirmPassword.addEventListener(
    "input",
    validateConfirmPassword
);

// SIGNUP FORM SUBMISSION

signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const isFullNameValid =
            validateFullName();

        const isEmailValid =
            validateEmail();

        const isPhoneValid =
            validatePhone();

        const isCityValid =
            validateCity();

        const isPasswordValid =
            validatePassword();

        const isConfirmPasswordValid =
            validateConfirmPassword();


        // If every field is valid
        if (
            isFullNameValid &&
            isEmailValid &&
            isPhoneValid &&
            isCityValid &&
            isPasswordValid &&
            isConfirmPasswordValid
        ) {

            // Create user object
            const user = {

                fullName:
                    fullName.value.trim(),

                email:
                    email.value.trim(),

                phone:
                    phone.value.trim(),

                city:
                    city.value.trim(),

                password:
                    password.value

            };

            // Save user in localStorage
            localStorage.setItem(
                "registeredUser",
                JSON.stringify(user)
            );


            alert(
                "Account created successfully! Please sign in."
            );


            // Redirect to Sign In page
            window.location.href =
                "signin.html";

        }

    }
);

// SHOW / HIDE PASSWORD

const toggleButtons =
    document.querySelectorAll(
        ".toggle-password"
    );

toggleButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId =
                    button.dataset.target;

                const input =
                    document.getElementById(
                        targetId
                    );


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    button.innerHTML =
                        `<i class="bi bi-eye-slash"></i>`;

                } else {

                    input.type = "password";

                    button.innerHTML =
                        `<i class="bi bi-eye"></i>`;

                }

            }
        );

    }
);    