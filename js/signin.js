// SELECT FORM AND INPUTS

const signinForm = document.getElementById("signinForm");

const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");

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

// VALIDATE EMAIL

function validateSigninEmail() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (signinEmail.value.trim() === "") {

        showError(
            signinEmail,
            "Email address is required"
        );

        return false;
    }


    if (
        !emailPattern.test(
            signinEmail.value.trim()
        )
    ) {

        showError(
            signinEmail,
            "Enter a valid email address"
        );

        return false;
    }


    showSuccess(signinEmail);

    return true;
}

// VALIDATE PASSWORD

function validateSigninPassword() {

    if (signinPassword.value === "") {

        showError(
            signinPassword,
            "Password is required"
        );

        return false;
    }

    showSuccess(signinPassword);

    return true;
}

// REAL-TIME VALIDATION

signinEmail.addEventListener(
    "input",
    validateSigninEmail
);


signinPassword.addEventListener(
    "input",
    validateSigninPassword
);


// SIGN IN AUTHENTICATION

signinForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const isEmailValid = validateSigninEmail();

        const isPasswordValid = validateSigninPassword();


        // Stop if validation fails

        if (
            !isEmailValid ||
            !isPasswordValid
        ) {
            return;
        }

        // Get registered user from localStorage

        const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

        // Check if a user exists
        if (!registeredUser) {

            showError(
                signinEmail,
                "No account found. Please Sign Up first."
            );

            return;
        }

        // Check if email is registered
        if (
            signinEmail.value.trim().toLowerCase() !==
            registeredUser.email.toLowerCase()
        ) {

            showError(
                signinEmail,
                "This email is not registered."
            );

            return;
        }

        // Check if password matches
        if (
            signinPassword.value !==
            registeredUser.password
        ) {

            showError(
                signinPassword,
                "Incorrect password."
            );

            return;
        }

        // LOGIN SUCCESS

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        alert(
            `Welcome back, ${registeredUser.fullName}!`
        );


        // Redirect to Travel Landing Page
        window.location.href = "index.html";

    }
);

// SHOW / HIDE PASSWORD

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const targetId = button.dataset.target;
                const input = document.getElementById(targetId);

                if (input.type === "password") {

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