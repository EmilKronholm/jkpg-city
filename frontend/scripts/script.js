function getSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('search');
    return param || "";
}

function getOrder() {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('order');
    return param || 'alphabetic-desc';
}

function getVendorMockData() {
    return { "id": 1, "name": "Klock & ur", "url": "example.com", "district": "väster" };
}


const ul = document.querySelector("#all-vendors ul");
function appendVendor(vendor) {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.setAttribute("href", `./vendor?vendorID=${vendor.id}`);
    a.textContent = vendor.name;
    li.appendChild(a);
    ul.appendChild(li);
}

// appendVendor(getVendorMockData());
async function fetchVendorsFromAPI(limit = 5, offset = 0) {
    const search = getSearch();
    const order = getOrder();
    console.log("test", search)
    const result = await fetch(`${apiURL}/vendors?limit=${limit}&search=${search}&order=${order}`);
    const json = await result.json();
    return json;
}

function appendVendors(vendors) {
    for (const key in vendors) {
        let vendor = vendors[key];
        appendVendor(vendor);
    }
}

async function main() {
    const vendors = await fetchVendorsFromAPI(200, 0);
    appendVendors(vendors)
}

main();

function searchKeyPress(event) {
    console.log("test")
    if (event.key === "Enter" || event.key == "Backspace") {
        event.preventDefault();
        search();
    }
}

function clearSearch() {
    document.getElementById('search-input').value = "";
    search();
}

function search() {

    // Get search input
    const searchInput = document.getElementById('search-input');
    const searchPhrase = searchInput.value;

    // Update URL params
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', searchPhrase);
    window.history.replaceState(null, null, "?" + urlParams.toString());

    // Clear vendors
    ul.innerHTML = "";

    // Search results heading
    // const li = document.createElement('h3');
    // li.textContent = "Showing results for " + searchPhrase;
    // ul.appendChild(li);

    // Build vendors
    main();
}

function searchClear() {
    document.getElementById('search-input').value = "";
    search();
}

document.getElementById('options').addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    let orderValue = ""

    switch (selectedOption) {
        case 'sort-recent':
            console.log("Sorting by recent");
            orderValue = 'recent';
            break;
        case 'sort-oldest':
            console.log("Sorting by oldest");
            orderValue = 'oldest';
            break;
        case 'sort-alphabetic-desc':
            console.log("Sorting alphabetically descending");
            orderValue = 'alphabetic-desc';
            break;
        case 'sort-alphabetic-asc':
            console.log("Sorting alphabetically ascending");
            orderValue = 'alphabetic-asc';
            break;
        default:
            console.log("Default sorting");
            orderValue = 'alphabetic-desc';
            break;
    }

    // Update URL params
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('order', orderValue);
    window.history.replaceState(null, null, "?" + urlParams.toString());

    search();
});
