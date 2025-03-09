const apiURL = "http://localhost:3000";

async function logIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${apiURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        if (response.ok) {
            onLoginSucess();
        } else {
            onLoginFail();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function onLoginFail() {
    message.innerHTML = "Login failed!";
    message.style.color = "red";
}

function onLoginSucess() {
    const message = document.getElementById('message');
    message.innerHTML = "Successfully logged in!";
    message.style.color = "green";

    setLogout();
}

function reset() {
    const message = document.getElementById('message');
    message.innerHTML = "";
}

reset();

document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    await logIn();
});