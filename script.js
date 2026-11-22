const cookieBanner = document.querySelector(".cookie-consent");
const acceptCookiesButton = document.getElementById("accept-cookies");

if (cookieBanner && acceptCookiesButton) {
    if (document.cookie.split("; ").includes("cookiesAccepted=true")) {
        cookieBanner.hidden = true;
    }

    acceptCookiesButton.addEventListener("click", function () {
        document.cookie = "cookiesAccepted=true; path=/; max-age=31536000; SameSite=Lax";
        cookieBanner.hidden = true;
    });
}

async function postForm(form, endpoint) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "La demande a échoué.");
    }

    return result;
}

function showMessage(element, message, isError) {
    element.textContent = message;
    element.className = isError ? "form-message error" : "form-message success";
}

const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

if (signupForm && signupMessage) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        showMessage(signupMessage, "Création du compte en cours…", false);

        try {
            const result = await postForm(signupForm, "/api/clients");
            signupForm.reset();
            showMessage(signupMessage, `${result.message} Vous pouvez maintenant vous connecter.`, false);
        } catch (error) {
            showMessage(signupMessage, error.message || "Impossible de joindre le serveur.", true);
        }
    });
}

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const accountForms = document.getElementById("account-forms");
const sessionPanel = document.getElementById("session-panel");
const firstName = document.getElementById("client-first-name");

async function refreshSession() {
    if (!accountForms || !sessionPanel) {
        return;
    }

    try {
        const response = await fetch("/api/me");
        const state = await response.json();
        if (!response.ok) {
            throw new Error("Impossible de vérifier la session.");
        }

        accountForms.hidden = state.authenticated;
        sessionPanel.hidden = !state.authenticated;
        if (state.authenticated && firstName) {
            firstName.textContent = state.prenom;
        }
    } catch (error) {
        if (loginMessage) {
            showMessage(loginMessage, error.message, true);
        }
    }
}

if (loginForm && loginMessage) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        showMessage(loginMessage, "Connexion en cours…", false);

        try {
            const result = await postForm(loginForm, "/api/login");
            loginForm.reset();
            showMessage(loginMessage, result.message, false);
            await refreshSession();
        } catch (error) {
            showMessage(loginMessage, error.message || "Impossible de joindre le serveur.", true);
        }
    });
}

const logoutButton = document.getElementById("logout-button");
const sessionMessage = document.getElementById("session-message");

if (logoutButton && sessionMessage) {
    logoutButton.addEventListener("click", async function () {
        logoutButton.disabled = true;
        try {
            const response = await fetch("/api/logout", { method: "POST" });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || "La déconnexion a échoué.");
            }

            showMessage(sessionMessage, result.message, false);
            await refreshSession();
        } catch (error) {
            showMessage(sessionMessage, error.message || "Impossible de joindre le serveur.", true);
        } finally {
            logoutButton.disabled = false;
        }
    });
}

refreshSession();
