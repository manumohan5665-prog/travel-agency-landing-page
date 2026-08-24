const bookNowButtons = document.querySelectorAll(".book-now-btn");

bookNowButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const isLoggedIn = localStorage.getItem("isLoggedIn");

            // User is not logged in
            if (isLoggedIn !== "true") {

                alert(
                    "Please sign in to book your trip."
                );


                window.location.href = "signin.html";

                return;
            }

            // User is logged in
            window.location.href = "booking.html";

        }
    );

});