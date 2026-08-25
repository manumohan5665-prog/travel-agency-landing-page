// CHECK LOGIN STATUS

const isLoggedIn = localStorage.getItem("isLoggedIn");
const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

// Redirect if user is not logged in

if (isLoggedIn !== "true" || !registeredUser) {

    alert("Please sign in to access the booking page.");

    window.location.href = "signin.html";

}

// SELECT FORM ELEMENTS

const bookingForm = document.getElementById("bookingForm");
const bookingName = document.getElementById("bookingName");
const bookingEmail = document.getElementById("bookingEmail");
const destination = document.getElementById("destination");
const travelers = document.getElementById("travelers");
const departureDate = document.getElementById("departureDate");
const returnDate = document.getElementById("returnDate");

// PREFILL USER DETAILS

bookingName.value = registeredUser.fullName;
bookingEmail.value = registeredUser.email;

// Optional: prevent editing

bookingName.readOnly = true;
bookingEmail.readOnly = true;

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

// VALIDATE DESTINATION

function validateDestination() {

    if (destination.value === "") {

        showError(
            destination,
            "Please select a destination."
        );

        return false;
    }

    showSuccess(destination);

    return true;
}

// VALIDATE TRAVELERS

function validateTravelers() {

    if (travelers.value === "") {

        showError(
            travelers,
            "Please enter the number of travelers."
        );

        return false;
    }

    if (Number(travelers.value) < 1) {

        showError(
            travelers,
            "At least 1 traveler is required."
        );

        return false;
    }

    showSuccess(travelers);

    return true;
}

// VALIDATE DEPARTURE DATE

function validateDepartureDate() {

    if (departureDate.value === "") {

        showError(
            departureDate,
            "Please select a departure date."
        );

        return false;
    }

    const selectedDate = new Date(departureDate.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {

        showError(
            departureDate,
            "Departure date cannot be in the past."
        );

        return false;
    }

    showSuccess(departureDate);

    return true;
}

// VALIDATE RETURN DATE

function validateReturnDate() {

    if (returnDate.value === "") {

        showError(
            returnDate,
            "Please select a return date."
        );

        return false;
    }

    if (departureDate.value === "") {

        showError(
            returnDate,
            "Please select a departure date first."
        );

        return false;
    }

    const departure =
        new Date(departureDate.value);

    const returning =
        new Date(returnDate.value);


    if (returning <= departure) {

        showError(
            returnDate,
            "Return date must be after departure date."
        );

        return false;
    }

    showSuccess(returnDate);

    return true;
}

// REAL-TIME VALIDATION

destination.addEventListener(
    "change",
    validateDestination
);


travelers.addEventListener(
    "input",
    validateTravelers
);


departureDate.addEventListener(
    "change",
    function () {

        validateDepartureDate();

        if (returnDate.value !== "") {

            validateReturnDate();

        }

    }
);

returnDate.addEventListener(
    "change",
    validateReturnDate
);

// FORM SUBMISSION

bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const isDestinationValid =
            validateDestination();

        const isTravelersValid =
            validateTravelers();

        const isDepartureDateValid =
            validateDepartureDate();

        const isReturnDateValid =
            validateReturnDate();


        if (
            isDestinationValid &&
            isTravelersValid &&
            isDepartureDateValid &&
            isReturnDateValid
        ) {

            // Create booking object

            const booking = {
                bookingId:
                    "TRB-" + Date.now(),

                fullName:
                    registeredUser.fullName,

                email:
                    registeredUser.email,

                destination:
                    destination.value,

                travelers:
                    travelers.value,

                departureDate:
                    departureDate.value,

                returnDate:
                    returnDate.value,

                status:
                    "Confirmed",

                bookingDate:
                    new Date().toLocaleString()
            };


            // Get existing bookings
            const existingBookings = JSON.parse(
                localStorage.getItem("userBookings")
            ) || [];


            // Add the new booking
            existingBookings.push(booking);


            // Save bookings
            localStorage.setItem(
                "userBookings",
                JSON.stringify(existingBookings)
            );


            // Success message

            alert(
                "Booking confirmed successfully! ✈️"
            );


            // Redirect to home page

            window.location.href = "my-bookings.html";

        }

    }
);