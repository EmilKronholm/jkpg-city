// ON LOAD (if logged in, create the button)

console.log(isLoggedIn)

if (isLoggedIn()) {
    console.log("User is logged in, showing button.");
}

document.getElementById('create-vendor-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = "block";
});

document.getElementById('close-create-vendor-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = "none";
});