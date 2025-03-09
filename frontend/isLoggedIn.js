async function isLoggedIn() {
    try {
        const response = await fetch(`${apiURL}/auth`, { credentials: 'include' });
        console.log(response);
        return response.ok;
    } catch (error) {
        console.error("Error checking login status");
        return false;
    }
}


function setLogout() {
    const menuItem = document.getElementById('menu-login');
    menuItem.innerHTML = "Logout";
    menuItem.setAttribute('href', "");
    menuItem.addEventListener("click", (event) => {
        event.preventDefault()
        logout();
    });
}

function setLogin() {
    const menuItem = document.getElementById('menu-login');
    const newItem = menuItem; // Clone to remove all event listeners
    menuItem.innerHTML = "Login";
    menuItem.setAttribute('href', "login");
    menuItem.replaceWith(newItem);
}

async function logout() {
    await fetch(`${apiURL}/users/logout`, {
        method: 'POST',
        credentials: 'include' // Ensures the cookie is sent with the request
    });
    main();
}

async function main() {
    if (await isLoggedIn()) {
        setLogout();
    } else {
        setLogin();
    }
}

main();