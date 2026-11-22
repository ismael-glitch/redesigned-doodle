document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.querySelector(".cookie-consent");
    const acceptButton = document.getElementById("accept-cookies");

    if (document.cookie.includes("cookiesAccepted=true")) {
        cookieBanner.style.display = "none";
    }

    acceptButton.addEventListener("click", function () {
        document.cookie = "cookiesAccepted=true; path=/; max-age=31536000";
        cookieBanner.style.display = "none";
    });
});
