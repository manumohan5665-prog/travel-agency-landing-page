
// CHECK LOGIN STATUS

const isLoggedIn = localStorage.getItem("isLoggedIn");

const registeredUser = JSON.parse(
    localStorage.getItem("registeredUser")
);

if (isLoggedIn !== "true" || !registeredUser) {

    alert("Please sign in to view your bookings.");

    window.location.href = "signin.html";

}

// SELECT BOOKING CONTAINER

const bookingContainer = document.getElementById("bookingContainer");

// GET ALL BOOKINGS

const bookings = JSON.parse(
    localStorage.getItem("userBookings")
) || [];


// DISPLAY BOOKINGS

function displayBookings() {

    bookingContainer.innerHTML = "";


    // No bookings

    if (bookings.length === 0) {

        bookingContainer.innerHTML = `

            <div class="col-lg-6">

                <div class="no-booking text-center">

                    <i class="bi bi-airplane-engines"></i>

                    <h3>No Bookings Yet</h3>

                    <p>
                        You haven't booked a trip yet.
                        Start exploring amazing destinations!
                    </p>

                    <a href="index.html"
                       class="btn auth-submit-btn">

                        Explore Trips

                    </a>

                </div>

            </div>

        `;

        return;
    }


    // Display all bookings

    bookings.forEach(function (booking, index) {

        bookingContainer.innerHTML += `

            <div class="col-lg-8 mb-4">

                <div class="booking-card shadow">

                    <div class="booking-header">

                        <div>

                            <h3>

                                <i class="bi bi-airplane"></i>

                                ${booking.destination}

                            </h3>

                            <small class="booking-id">

                                Booking ID: ${booking.bookingId}

                            </small>

                        </div>


                            <span
                                class="booking-status
                                ${booking.status === "Cancelled"
                                    ? "cancelled-status"
                                    : ""}">

                                ${booking.status || "Confirmed"}

                            </span>

                    </div>


                    <div class="row mt-4">

                        <div class="col-md-6 mb-3">

                            <div class="booking-info">

                                <span>Traveler</span>

                                <strong>
                                    ${booking.fullName}
                                </strong>

                            </div>

                        </div>


                        <div class="col-md-6 mb-3">

                            <div class="booking-info">

                                <span>Email</span>

                                <strong>
                                    ${booking.email}
                                </strong>

                            </div>

                        </div>


                        <div class="col-md-6 mb-3">

                            <div class="booking-info">

                                <span>Travelers</span>

                                <strong>
                                    ${booking.travelers}
                                </strong>

                            </div>

                        </div>


                        <div class="col-md-6 mb-3">

                            <div class="booking-info">

                                <span>Booking Date</span>

                                <strong>
                                    ${booking.bookingDate}
                                </strong>

                            </div>

                        </div>


                        <div class="col-md-6 mb-3">

                            <div class="booking-info">

                                <span>Departure</span>

                                <strong>
                                    ${booking.departureDate}
                                </strong>

                            </div>

                        </div>


                        <div class="col-md-6 mb-3">

                            <div class="booking-info">

                                <span>Return</span>

                                <strong>
                                    ${booking.returnDate}
                                </strong>

                            </div>

                        </div>

                        <div class="text-end mt-3">

                            ${booking.status !== "Cancelled" ? `

                                <div class="text-end mt-3">

                                    <button
                                        class="btn cancel-booking-btn"
                                        data-index="${index}">

                                        <i class="bi bi-x-circle"></i>
                                        Cancel Booking

                                    </button>

                                </div>

                            ` : `

                                <div class="text-end mt-3">

                                    <span class="cancelled-message">

                                        <i class="bi bi-x-circle-fill"></i>
                                        This booking has been cancelled

                                    </span>

                                </div>

                            `}

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

}

// RUN FUNCTION

displayBookings();


// CANCEL BOOKING

bookingContainer.addEventListener(
    "click",
    function (event) {

        const cancelButton =
            event.target.closest(
                ".cancel-booking-btn"
            );


        if (!cancelButton) {
            return;
        }


        const bookingIndex =
            Number(
                cancelButton.dataset.index
            );


        const confirmCancel =
            confirm(
                "Are you sure you want to cancel this booking?"
            );


        if (!confirmCancel) {
            return;
        }


        // Change booking status instead of deleting

        bookings[bookingIndex].status = "Cancelled";


        // Update localStorage

        localStorage.setItem(
            "userBookings",
            JSON.stringify(bookings)
        );


        // Refresh the booking list

        displayBookings();

    }
);

