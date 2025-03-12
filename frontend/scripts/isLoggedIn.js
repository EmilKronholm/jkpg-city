// GLOBAL
const menuItem = document.getElementById('menu-login');

// FUNCTIONS

async function isLoggedIn() {
    try {
        const response = await fetch(`${apiURL}/auth`, { credentials: 'include' });
        const loggedIn = response.ok;
        localStorage.setItem("isLoggedIn", loggedIn ? "true" : "false");
        return loggedIn;
    } catch (error) {
        console.error("Error checking login status");
        return localStorage.getItem("isLoggedIn") === "true";
    }
}

function updateMenu() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
        setLogout();
    } else {
        menuItem.innerHTML = "Login";
        menuItem.setAttribute('href', "login");
        menuItem.onclick = null;
    }
}

async function logout() {
    await fetch(`${apiURL}/users/logout`, { method: 'POST', credentials: 'include' });
    localStorage.setItem("isLoggedIn", "false");
    updateMenu();
}

async function mainLoggedIn() {
    updateMenu();
    if (await isLoggedIn()) {
        updateMenu();
    }
}

mainLoggedIn();


// EVENTS

function onLogin() {
    setLogout();
}


// HELPERS

function setLogout() {
    menuItem.innerHTML = "Logout";
    menuItem.setAttribute('href', "");
    menuItem.onclick = (event) => {
        event.preventDefault();
        logout();
    };
}