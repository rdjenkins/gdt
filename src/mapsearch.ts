import { submitLog } from "./utils"

const SEARCH_CONTAINER_ID = 'search-container'
const SEARCH_BOX_ID = 'search-box'
const SEARCH_BUTTON_ID = 'search-button'

export function showSearchContainer() {
    return `
    <li class="flex-item">
        <div id="${SEARCH_CONTAINER_ID}"></div>
        <p>Search for an address or place in Grampound with Creed.</p>
    </li>
    `
}

// Open Street Map search box and button
let searchBox = document.createElement('input');
searchBox.type = 'text';
searchBox.id = `${SEARCH_BOX_ID}`
searchBox.placeholder = 'Find an address or place...';

let searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchButton.id = `${SEARCH_BUTTON_ID}`;
searchButton.classList.add('widgetlink')

searchButton.onclick = () => {
    const QUERY = encodeURIComponent(`${searchBox.value} "Grampound with Creed"`);
    const URL = `https://www.openstreetmap.org/search?query=${QUERY}&zoom=19&minlon=-4.903727173805238&minlat=50.298594007719345&maxlon=-4.900551438331605&maxlat=50.29984131703836#map=17/50.298894/-4.900718`;
    window.open(URL, '_blank');
};

// listen for when someone hits enter in the search box
searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (typeof searchButton.onclick === 'function') {
            searchButton.click();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const APP = document.querySelector<HTMLDivElement>('#app');
    if (APP) {
        const searchContainer = document.createElement('div');
        searchContainer.style.marginBottom = '1em';
        searchContainer.appendChild(searchBox);
        searchContainer.appendChild(searchButton);
        APP.prepend(searchContainer);
    }
});

// Move the search box and button into the #search-container after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector<HTMLDivElement>(`#${SEARCH_CONTAINER_ID}`);
    if (searchContainer) {
        searchContainer.appendChild(searchBox);
        searchContainer.appendChild(searchButton);
        searchContainer.style.marginBottom = '1em';
    }
});

// Listen for clicks on the search button
document.addEventListener('click', (event) => {
    let target = event.target as HTMLElement;
    if (target.id === SEARCH_BUTTON_ID) {
        var searchInput = document.getElementById('search-box') as HTMLInputElement | null;
        if (searchInput) {
            submitLog('Search button clicked: ' + (searchInput.value).trim());
        } else {
            submitLog('Search button clicked.')
        }
    }
});