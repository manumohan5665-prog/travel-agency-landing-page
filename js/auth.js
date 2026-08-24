// SELECT AUTH CONTAINER

const authButtons = document.getElementById("authButtons");

// GET USER AND LOGIN STATUS

const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
const isLoggedIn = localStorage.getItem("isLoggedIn");

// CHECK LOGIN STATUS

if (
    isLoggedIn === "true" &&
    registeredUser
) {

    authButtons.innerHTML = `
    
        <span class="welcome-user me-3">
            Welcome, ${registeredUser.fullName}
        </span>

        <button
            class="btn logout-btn" id="logoutBtn">
            Logout
        </button>

    `;

    // LOGOUT

    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener(
        "click",
        function () {

            // Remove login status
            localStorage.removeItem(
                "isLoggedIn"
            );


            // Redirect to home page
            window.location.href =
                "index.html";

        }
    );

}