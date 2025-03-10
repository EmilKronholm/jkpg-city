const apiURL = "http://localhost:3000";

function getID() {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('vendorID');
    return param;
}

async function getVendorFromID(id) {
    const result = await fetch(`${apiURL}/vendors/${id}`);
    const json = await result.json();
    return json;
}

async function main() {
    // Step 1: Retrieve ID and the matching data
    const ID = getID();

    // No ID was given, therfore we cannot show any vendor
    if (ID == undefined) {
        const vendorSection = document.getElementById('vendor');
        const h2 = document.createElement('h2');
        h2.textContent = "No store ID given in URL!";
        vendorSection.appendChild(h2)
        return;
    }

    const json = await getVendorFromID(ID);
    const store = json[0];

    // Store with id id wasn't found
    if (store == undefined) {
        const vendorSection = document.getElementById('vendor');
        const h2 = document.createElement('h2');
        h2.textContent = "Vendor with id " + ID + " wasn't found.";
        vendorSection.appendChild(h2)
        return;
    }

    // Step 2: Build the dom
    const vendorSection = document.getElementById('vendor');
    const vendorDIV = document.createElement('div');

    // Create the Heading
    const h2 = document.createElement("h2");
    h2.textContent = store.name;

    // Create the link
    const a = document.createElement('a');
    a.textContent = "Offical Website";
    a.setAttribute("href", `https://${store.url}`);

    // Create the district
    const p = document.createElement('p');
    p.textContent = store.district || "Unkown district";

    // Finaliez the creation 
    vendorDIV.appendChild(h2);
    vendorDIV.appendChild(a);
    vendorDIV.appendChild(p);

    vendorSection.appendChild(vendorDIV);

    // Manually update the form for the current data
    document.getElementById('name').setAttribute('value', store.name);
    document.getElementById('url').setAttribute('value', store.url);
    document.getElementById('districtfk').setAttribute('value', store.district);

}
main();

document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const ID = getID();

    if (!ID){
        console.log("No id was given")
        return;
    }

    const data = {
        id: 419,
        name: document.getElementById("name").value,
        url: document.getElementById("url").value,
        districtfk: document.getElementById("districtfk").value || null
    };

    const response = await fetch(`${apiURL}/vendors/${getID()}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });

    if (response.ok) {
        // Clear current data
        document.getElementById('vendor').innerHTML = ""
        // Reload data from API
        main();
    }
});

document.getElementById('edit-vendor-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = "block";
});

document.getElementById('close-edit-vendor-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = "none";
});