// ON LOAD (if logged in, create the button)

const showSecretButton = async () => {
    if (await isLoggedIn()) {
        console.log("You are looged in, showing secret button.")
        document.getElementById('create-vendor-button').style.display = "inline-flex";
    }
}
showSecretButton();


document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    
    const data = {
        name: document.getElementById("name").value,
        url: document.getElementById("url").value,
        district: document.getElementById("districtfk").value || null,
        score: document.getElementById("stars").value,
        address: document.getElementById("address").value
    };

    
    console.log("Submitted a new one with", data);
    
    const response = await fetch(`${apiURL}/vendors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });
    
    if (response.ok) {
        // Clear current data    
        // Reload data from API
        await main();

        // Clear the form affter submitting;

    } else {
        // Something went wrong, show error message

    }


});

document.getElementById('create-vendor-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = "block";
});

document.getElementById('close-edit-vendor-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = "none";
});