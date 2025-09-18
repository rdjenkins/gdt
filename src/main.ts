import './style.css'
import openstreetmaplogo from '/OpenStreetMap-logo-with-text.svg'
import ghplogo from '/gwchp-logo-coloured-600x600.png'
import calendarlogo from '/calendar.svg'
import acnylogo from '/acny.png'
import airqualitylogo from '/PurpleAir-Cornwall-Map.png'
import waterqualitylogo from '/Water-quality-sewage.png'
import creedchurchyardlogo from '/creed-churchyard.png'
import geographlogo from '/geograph-logo.svg'
import githublogo from '/github-mark.svg'
import packageJson from '../package.json';
console.log('GDT Version:', packageJson.version);

let nearestPurpleAirSensorwidget = `<div id='PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'>Loading nearest sensor ...</div>`

async function waterqualitytrafficlight() {
  const response = await fetch('https://deanjenkins.me/repack.php?id=grampoundwaterDOM');
  const text = await response.text();
  return text;
}

let waterqualitytrafficlightHTML = "";

const searchBox = document.createElement('input');
searchBox.type = 'text';
searchBox.placeholder = 'Find an address or place...';

const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchButton.id = 'search-button';

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
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>
<h2>Maps</h2>
    <ul class="flex-container">
    <li class="flex-item">
      <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
        <img src="${openstreetmaplogo}" class="logo vanilla" alt="OpenStreetMap logo" />
      </a>
      <p>Map of Grampound with Creed.</p>
    </li>

    <li class="flex-item">
        <div id="search-container"></div>
      <p>Search for an address or place in Grampound with Creed.</p>
    </li>

    <li class="flex-item">
      <a href="https://umap.openstreetmap.fr/en/map/grampound-walk-pepo-trenowth_947847#14/50.3122/-4.8960" target="_blank">
        <button>Pepo Trenowth (1½ hrs)</button>
      </a>
      <a href="https://umap.openstreetmap.fr/en/map/creed-circuit-avoiding-most-of-fore-street_955200#15/50.2940/-4.8909" target="_blank">
        <button>Creed Circuit (1 hr)</button>
      </a>
      <p>Circular walks near Grampound.</p>
    </li>
    </ul>

<h2>What's on</h2>
    <ul class="flex-container">

    <li class="flex-item">
      <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
        <img src="${calendarlogo}" class="logo" alt="Grampound calendar logo" />
      </a>
      <p>Calendar of events.</p>
    </li>

    <li class="flex-item">
      <a href="https://www.achurchnearyou.com/search/?acny_search_place=Grampound%2C+Truro%2C+UK&lat=50.2992589&lon=-4.8984499&place=Grampound%2C+Truro+TR2%2C+UK&postcode=TR2&text=" target="_blank">
        <img src="${acnylogo}" class="logo" alt="A Church Near You logo" />
      </a>
      <p>Church services in Grampound with Creed.</p>
    </li>
    </ul>

<h2>Photos and more</h2>
    <ul class="flex-container">

    <li class="flex-item">
      <a href="https://photos.grampound.org.uk/" target="_blank">
        <img src="${ghplogo}" class="logo green" alt="Grampound Heritage Project logo" />
      </a>
      <p>Grampound Heritage Project photo archive.</p>
    </li>

    <li class="flex-item">
      <a href="https://www.geograph.org.uk/mapper/combined.php#15/50.3010/-4.9012" target="_blank">
        <img src="${geographlogo}" class="logo vanilla" alt="Geograph logo" />
      </a>
      <p>Geograph photographs of Grampound.</p>
    </li>

    <li class="flex-item">
      <a href="https://stcrida.co.uk/cs.php" target="_blank">
        <img src="${creedchurchyardlogo}" class="logo green" alt="Creed Churchyard logo" />
      </a>
      <p>Creed Churchyard search.</p>
    </li>
    </ul>

<h2>Environment</h2>
    <ul class="flex-container">

    <li class="flex-item">
      <a href="https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound" target="_blank">
        <div id="water-quality-traffic-light">
          ${waterqualitytrafficlightHTML}
          <img src="${waterqualitylogo}" class="logo" alt="Sewage discharges logo" />
        </div>
      </a>
      <p>Water quality for the River Fal.</p>
    </li>

    <li class="flex-item">
      <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank">
        <img src="${airqualitylogo}" class="logo" alt="Air Quality, PurpleAir logo" />
      </a>
      <p>${nearestPurpleAirSensorwidget}</p>
      <p>Air quality in Cornwall.</p>
    </li>
    </ul>
  
<h2>More info</h2>
    <ul class="flex-container">
    <li class="flex-item">
      <a href="https://github.com/rdjenkins/gdt/discussions" target="_blank">
        <img src="${githublogo}" class="logo" alt="GitHub Logo" />
      </a>
      <p>Find this project on GitHub.</p>
    </li>

    </ul>
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

// Fetch the water quality traffic light HTML and update the content
document.addEventListener('DOMContentLoaded', () => {
  waterqualitytrafficlight().then(html => {
    waterqualitytrafficlightHTML = html;
    const waterQualityDiv = document.querySelector('#water-quality-traffic-light');
    if (waterQualityDiv) {
      waterQualityDiv.innerHTML =  waterqualitytrafficlightHTML + '<div>Get more detail on floodmapper ↗</div>';
    }
  });
});
async function submitLg(lg: string, u: string = ''): Promise<string> {
  let theresponse = '';
  const response = await fetch('https://deanjenkins.me/repack.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `lg=${encodeURIComponent(lg)}&u=${encodeURIComponent(u)}`,
  });
  theresponse = await response.text();
  console.log('GDT Logging:', theresponse);
  return theresponse;
}
// Append the PurpleAir script to the document body after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = 'https://www.purpleair.com/pa.widget.js?key=DX82CA29U5Z4C6HO&module=US_EPA_AQI&conversion=C0&average=10&layer=US_EPA_AQI&container=PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI';
  document.body.appendChild(script);
});

// Listen for clicks on any hyperlink and log the URL
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const anchor = target.closest('a');
  if (anchor && anchor instanceof HTMLAnchorElement) {
    submitLg('Hyperlink clicked: ', anchor.href);
  }
  if (target.id === 'search-button') {
    submitLg('Search button clicked: ' + (searchBox.value || '').trim());
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const targetId = 'PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI';
  let sent = false;
  const observer = new MutationObserver(() => {
    const widgetDiv = document.getElementById(targetId);
    if (widgetDiv) {
      // Try to find the span by its text content and approximate style, since mobile may render differently
      let span = Array.from(widgetDiv.querySelectorAll('span')).find(s => {
        const text = s.textContent?.trim() || '';
        // Check if the text is a number and the font size is large
        const isNumber = !isNaN(parseFloat(text));
        const fontSize = window.getComputedStyle(s).fontSize;
        return isNumber && parseFloat(fontSize) >= 60;
      });
      if (span) {
        console.log('PurpleAir Pm2.5 span found');
        const pmValue = parseFloat(span.innerHTML);
        if (!isNaN(pmValue) && pmValue < 50) {
          // Create a new span element
          const newSpan = document.createElement('span');
          newSpan.textContent = span.textContent;
          newSpan.style.background = 'green';
          newSpan.style.color = 'white';
          newSpan.style.borderRadius = '1000px';
          newSpan.style.padding = '0.5em 0.5em';
          widgetDiv.innerHTML = '';
          widgetDiv.appendChild(newSpan);
        }
        if (!isNaN(pmValue) && pmValue >=50 && pmValue < 100) {
          // Create a new span element
          const newSpan = document.createElement('span');
          newSpan.textContent = span.textContent;
          newSpan.style.background = 'yellow';
          newSpan.style.color = 'white';
          newSpan.style.borderRadius = '1000px';
          newSpan.style.padding = '0.5em 0.5em';
          widgetDiv.innerHTML = '';
          widgetDiv.appendChild(newSpan);
        }
        if (sent === false) { // only send once
          submitLg(`Nearest PurpleAir sensor Pm2.5 value: ${pmValue}`);
          sent = true;
        }
        //observer.disconnect();
      } 
    }
  });

  const widgetDiv = document.getElementById(targetId);
  if (widgetDiv) {
    observer.observe(widgetDiv, { childList: true, subtree: true });
  } else {
    console.error(`PurpleAir widget not found.`);
  }
});