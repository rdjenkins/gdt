import './style.css'
import openstreetmaplogo from '/OpenStreetMap-logo-with-text.svg'
import ghplogo from '/gwchp-logo-coloured-600x600.png'
import calendarlogo from '/calendar.svg'
import acnylogo from '/acny.png'
import airqualitylogo from '/PurpleAir-Cornwall-Map.png'
import waterqualitylogo from '/Water-quality-sewage.png'

const searchBox = document.createElement('input');
searchBox.type = 'text';
searchBox.placeholder = 'Find an address or place...';

const searchButton = document.createElement('button');
searchButton.textContent = 'Search';

searchButton.onclick = () => {
  const query = encodeURIComponent(`${searchBox.value} "Grampound with Creed"`);
  const url = `https://www.openstreetmap.org/search?query=${query}&zoom=19&minlon=-4.903727173805238&minlat=50.298594007719345&maxlon=-4.900551438331605&maxlat=50.29984131703836#map=17/50.298894/-4.900718`;
  window.open(url, '_blank');
};

searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (typeof searchButton.onclick === 'function') {
      searchButton.click();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (app) {
    const searchContainer = document.createElement('div');
    searchContainer.style.marginBottom = '1em';
    searchContainer.appendChild(searchBox);
    searchContainer.appendChild(searchButton);
    app.prepend(searchContainer);
  }
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
      <img src="${openstreetmaplogo}" class="logo vanilla" alt="OpenStreetMap logo" />
    </a>
    <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
      <img src="${calendarlogo}" class="logo" alt="Grampound calendar logo" />
    </a>
    <a href="https://www.achurchnearyou.com/search/?acny_search_place=Grampound%2C+Truro%2C+UK&lat=50.2992589&lon=-4.8984499&place=Grampound%2C+Truro+TR2%2C+UK&postcode=TR2&text=" target="_blank">
      <img src="${acnylogo}" class="logo" alt="A Church Near You logo" />
    </a>
    <a href="https://photos.grampound.org.uk/" target="_blank">
      <img src="${ghplogo}" class="logo green" alt="Grampound Heritage Project logo" />
    </a>
    <a href="https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound" target="_blank">
      <img src="${waterqualitylogo}" class="logo" alt="Sewage discharges logo" />
    </a>
    <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank">
      <img src="${airqualitylogo}" class="logo" alt="Air Quality, PurpleAir logo" />
    </a>
    <div id="search-container"></div>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>
  </div>
`

// Move the search box and button into the #search-container after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.querySelector<HTMLDivElement>('#search-container');
  if (searchContainer) {
    searchContainer.appendChild(searchBox);
    searchContainer.appendChild(searchButton);
    searchContainer.style.marginBottom = '1em';
  }
});
