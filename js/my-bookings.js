// CHECK LOGIN STATUS

const isLoggedIn = localStorage.getItem("isLoggedIn");
const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));


// Redirect if not logged in

if (
    isLoggedIn !== "true" ||
    !registeredUser
) {

    alert(
        "Please sign in to view your bookings."
    );

    window.location.href =
        "signin.html";

}

// GET BOOKING

const booking = JSON.parse(localStorage.getItem("userBooking"));
const bookingContainer = document.getElementById("bookingContainer");

// DISPLAY BOOKING

if (booking) {

    bookingContainer.innerHTML = `

        <div class="col-lg-8">

            <div class="booking-card shadow">

                <div class="booking-header">

                    <h3>
                        <i class="bi bi-airplane"></i>
                        ${booking.destination}
                    </h3>

                    <span class="booking-status">
                        Confirmed
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

                </div>

            </div>

        </div>

    `;

} else {

    bookingContainer.innerHTML = `

        <div class="col-lg-6">

            <div class="no-booking text-center">

                <i class="bi bi-airplane-engines"></i>

                <h3>
                    No Bookings Yet
                </h3>

                <p>
                    You haven't booked a trip yet.
                    Start exploring amazing destinations!
                </p>

                <a
                    href="index.html"
                    class="btn auth-submit-btn">

                    Explore Trips

                </a>

            </div>

        </div>

    `;

}