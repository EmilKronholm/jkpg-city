async function signUp() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${apiURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        if (response.ok) {
            onSignupSucess();
        } else {
            const errorData = await response.json();
            onSignupFail(errorData.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function onSignupFail(errorMessage = "") {
    message.innerHTML = (errorMessage === "") ? "Signed up failed" : errorMessage;
    message.style.color = "red";
}

function onSignupSucess() {
    const message = document.getElementById('message');
    message.innerHTML = "Successfully signed up up!";
    message.style.color = "green";
}

function reset() {
    const message = document.getElementById('message');
    if (message) {
        message.innerHTML = "";
    }
}
reset();

document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    await signUp();
});