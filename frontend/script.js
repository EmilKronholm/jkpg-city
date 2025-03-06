const apiURL = "http://localhost:3000"

// Test ping
// fetch("http://localhost:3000")
//             .then(response => response.text())
//             .then(data => console.log(data))
//             .catch(error => console.error("Error:", error));


function getSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('search');
    return param || "";
}

function getVendorMockData() {
    return { "id": 1, "name": "Klock & ur", "url": "example.com", "district": "väster" };
}


const ul = document.querySelector("#all-vendors ul");
function appendVendor(vendor) {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.setAttribute("href", `./vendor.html?vendorID=${vendor.id}`);
    a.textContent = vendor.name;
    li.appendChild(a);
    ul.appendChild(li);
}

// appendVendor(getVendorMockData());

async function fetchVendorsFromAPI(limit = 5, offset = 0) {
    const search = getSearch()
    console.log("test", search)
    const result = await fetch(`${apiURL}/vendors?limit=${limit}&search=${search}`);
    const json = await result.json();
    return json;
}

async function main() {
    const vendors = await fetchVendorsFromAPI(200, 0);

    for (const key in vendors) {
        let vendor = vendors[key];
        appendVendor(vendor);
    }
}

main();

function search() {

    const searchInput = document.getElementById('search-input');
    const searchPhrase = searchInput.value;
    search.value = "";

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', searchPhrase);
    window.history.replaceState(null, null, "?" + urlParams.toString());
    
    ul.innerHTML = ""
    const li = document.createElement('h3')
    li.textContent = "Showing results for " + searchPhrase
    ul.appendChild(li)
    main()
}