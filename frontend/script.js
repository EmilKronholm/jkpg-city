const apiURL = "http://localhost:3000"

fetch("http://localhost:3000")
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error("Error:", error));


function getVendorMockData() {
    return { "id": 1, "name": "Klock & ur", "url": "example.com", "district": "väster" };
}

const ul = document.querySelector("#all-vendors ul");

function appendVendor(vendor) {
    const li = document.createElement("li");
    
    const a = document.createElement("a");
    a.setAttribute("href", `./vendor/${vendor.id}`);
    a.textContent = vendor.name;
    li.appendChild(a);
    ul.appendChild(li);
}

appendVendor(getVendorMockData());

async function fetchVendorsFromAPI(limit = 5, offset = 0) {
    const result = await fetch(`${apiURL}/vendors?limit=${limit}`);
    const json = await result.json();
    return await result.json();
}

async function main() {
    const vendors = await fetchVendorsFromAPI(10, 0);
    console.log(vendors)
    
    for (const key in vendors) {
        let vendor = vendors[key];
        console.log(vendor);
        appendVendor(vendor);
    }
}

main();