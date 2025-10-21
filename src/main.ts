import './style.css'
import openstreetmaplogo from '/OpenStreetMap-logo-with-text.svg'
import ghplogo from '/gwchp-logo-coloured-600x600.png'
import calendarlogo from '/calendar.svg'
import airqualitylogo from '/PurpleAir-Cornwall-Map.png'
import waterqualitylogo from '/Water-quality-sewage.png'
import creedchurchyardlogo from '/creed-churchyard.png'
import geographlogo from '/geograph-logo.svg'
import githublogo from '/github-mark.svg'
import busicon from '/ISO_7001_PI_TF_006.svg' // Original from https://commons.wikimedia.org/wiki/File:ISO_7001_PI_TF_006.svg
import hikericon from '/hiker.svg' // Original from https://commons.wikimedia.org/wiki/File:Big_guy_637%27s_hiking_icon.svg
import packageJson from '../package.json';
import { fetchWeatherApi } from 'openmeteo';
import wmoCodes from './wmo-codes.json';
import creedcircuitgpx from '/creed_circuit_avoiding_most_of_fore_street.gpx?url';
import falfootpathgpx from '/fal_footpath__barteliver_wood__bareliver_hill.gpx?url';
import trenowthwalkgpx from '/grampound_walk_pepo_trenowth.gpx?url';

console.log('GDT Version:', packageJson.version);

let nearestPurpleAirSensorwidget = `<div id='PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'>Loading nearest sensor ...</div>`
let currentDateTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour12: false });
const urlparams = new URLSearchParams(window.location.search);
const nolog = (urlparams.has('nolog')) ? true : false;
const QR = (urlparams.has('QR')) ? true : false;
let waterqualitytrafficlightHTML = "";
let firstbustrurourl = "https://www.firstbus.co.uk/cornwall/plan-journey/journey-planner/#/results?fromAddress=Grampound,%20Truro,%20UK&fromLat=50.2992589&fromLng=-4.8984499&fromPlaceId=ChIJaavkWhhra0gR-WQ7KozZobc&toAddress=Truro,%20UK&toLat=50.263195&toLng=-5.051041&toPlaceId=ChIJdRpa1XwQa0gRtAcdle9HY2E";
let firstbusstaustellurl = "https://www.firstbus.co.uk/cornwall/plan-journey/journey-planner/#/results?fromAddress=Grampound, Truro, UK&fromLat=50.2992589&fromLng=-4.8984499&fromPlaceId=ChIJaavkWhhra0gR-WQ7KozZobc&toAddress=St Austell, Saint Austell, UK&toLat=50.3403779&toLng=-4.7834252&toPlaceId=ChIJYwb4Jy1Aa0gRiCTxrSBmq2c";
let travellinetrurourl = "https://nationaljourneyplanner.travelinesw.com/swe/trip?formik=destination%3D30004840%26mtcb0%3Dfalse%26mtcb9%3Dfalse%26origin%3D30006418&lng=en&trip=multiModalitySelected%3Dpt";
let travellinestaustellurl = "https://nationaljourneyplanner.travelinesw.com/swe/trip?formik=destination%3D30004707%26mtcb0%3Dfalse%26mtcb9%3Dfalse%26origin%3D30006418&lng=en&trip=multiModalitySelected%3Dpt";

async function waterqualitytrafficlight() {
  const response = await fetch('https://photos.grampound.org.uk/repack.php?id=grampoundwaterDOM');
  const text = await response.text();
  return text;
}

// Function to submit anonymous logs to the server to see which functions are being used
async function submitLg(lg: string, u: string = ''): Promise<string> {

  if (nolog) {
    console.log('GDT Logging disabled:', lg || ' ', u || ' ');
    return 'nolog';
  }
  let theresponse = '';
  const response = await fetch('https://photos.grampound.org.uk/repack.php', {
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

if (QR) {
  submitLg('QR accessed');
}

function shuffleStringArray(array: string[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function showChoiceModal(name: string, buttons: { text: string, url: string }[]) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.5)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '1000';

  const modalContent = document.createElement('div');
  modalContent.style.background = 'white';
  modalContent.style.padding = '2em';
  modalContent.style.borderRadius = '10px';
  modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  modalContent.style.textAlign = 'center';
  modalContent.style.position = 'relative';

  const title = document.createElement('h2');
  title.textContent = name;
  title.style.textAlign = 'center';
  modalContent.appendChild(title);

  buttons.forEach(btn => {
    const anchor = document.createElement('a');
    anchor.href = btn.url;
    anchor.target = '_blank';
    anchor.innerHTML = `<button style="margin:1em;">${btn.text}</button>`;
    anchor.onclick = () => {
      document.body.removeChild(modal);
    };
    modalContent.appendChild(anchor);
  });

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '0.2em';
  closeBtn.style.right = '0.2em';
  closeBtn.style.background = 'transparent';
  closeBtn.style.border = 'none';
  closeBtn.style.fontSize = '1.5em';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => {
    document.body.removeChild(modal);
  };
  modalContent.appendChild(closeBtn);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

function addChoiceModalLink(linkId: string, name: string, buttons: { text: string, url: string }[]) {
  const link = document.getElementById(linkId) as HTMLAnchorElement | null;
  if (link) {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showChoiceModal(name, buttons);
    });
  }
};

// Open Street Map search box and button
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


// Define and load the main HTML structure
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>

<h2>Maps and travel</h2>
    <ul class="flex-container">
      <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank" class="flex-item">
        <img src="${openstreetmaplogo}" class="logo vanilla" alt="OpenStreetMap logo" />
      <p>Map of Grampound with Creed.</p>
      </a>

    <li class="flex-item">
        <div id="search-container"></div>
      <p>Search for an address or place in Grampound with Creed.</p>
    </li>

    <li class="flex-item">
    <img src="${busicon}" alt="bus icon" class="icon"><br>
      <div style="margin-top:1em;">
        <label for="bus-toggle" id="bus-toggle-traveline" style="font-weight:bold;">Traveline</label>
        <label class="switch">
          <input type="checkbox" id="bus-toggle">
          <span class="slider"></span>
        </label>
        <span id="bus-toggle-firstbus" style="margin-left:0.5em;">First Bus</span>
        <div id="bus-links" style="margin-top:0.5em;">
          <a href="${travellinetrurourl}" target="_blank"><button>To Truro</button></a>
          <a href="${travellinestaustellurl}" target="_blank"><button>To St Austell</button></a>
        </div>
        <p>Buses from Grampound.</p>
      </div>
    </li>

    <li class="flex-item">
    <img src="${hikericon}" alt="hiker icon" class="icon"><br>
      <a id="fal-footpath" href="#" target="_blank">
        <button>Fal (40 mins)</button>
      </a>
      <a id="creed-circuit" href="#" target="_blank">
        <button>Creed Circuit (1 hr)</button>
      </a>
      <a id="trenowth" href="#" target="_blank">
        <button>Trenowth (1½ hrs)</button>
      </a>
      <p>Circular walks.</p>
    </li>
    </ul>


    <h2>What's on</h2>
    <ul class="flex-container">

      <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank" class="flex-item">
        <img src="${calendarlogo}" class="logo" alt="Grampound calendar logo" />
      <p>Calendar of events.</p>
      </a>

    </ul>

<h2>Photos and more</h2>
    <ul class="flex-container">

      <a id="ghp-link" href="#" target="_blank" class="flex-item">
        <img src="${ghplogo}" class="logo green" alt="Grampound Heritage Project logo" />
      <p>Grampound Heritage Project photo archive.</p>
      </a>

      <a href="https://www.geograph.org.uk/near/SW93484841" target="_blank" class="flex-item">
        <img src="${geographlogo}" class="logo vanilla" alt="Geograph logo" />
      <p>Geograph photographs of Grampound.</p>
      </a>

      <a href="https://stcrida.co.uk/cs.php" target="_blank" class="flex-item">
        <img src="${creedchurchyardlogo}" class="logo green" alt="Creed Churchyard logo" />
      <p>Creed Churchyard search.</p>
      </a>

      </ul>

<h2>Environment</h2>
<p class="left">Updated ${currentDateTime}</p>
    <ul class="flex-container">

      <a href="#" id="weather-links" target="_blank" class="flex-item">
        <p id="weather-info">
          Weather (UK Met Office)
        </p>
      </a>

      <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank" class="flex-item">
        <img src="${airqualitylogo}" class="logo" alt="Air Quality, PurpleAir logo" />
      <p>${nearestPurpleAirSensorwidget}</p>
      <p>Air quality in Cornwall.</p>
      </a>

      <a href="https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound" target="_blank" class="flex-item">
        <div id="water-quality-traffic-light">
          ${waterqualitytrafficlightHTML}
          <img src="${waterqualitylogo}" class="logo" alt="Sewage discharges logo" />
        </div>
      <p>Water quality for the River Fal.</p>
      </a>

      <a href="https://check-for-flooding.service.gov.uk/target-area/114WAFT1W02A00" target="_blank" class="flex-item">
        <button>Go to gov.UK for flood warnings for Grampound.</button>
        <p id="flood-info">
          Flood data loading...
        </p>
      </a>

      </ul>
  
<h2>More info</h2>
<p class="left">About this project and how to contribute.</p>
    <ul class="flex-container">

    <li class="flex-item">
        <button id="why-button">
          Why?
        </button>
        <p id="why-content">Keep hitting the why button to learn more.</p>
      </li>

      <li class="flex-item">
        <button id="message-button">
          Message
        </button>
        <p>Send a message to us or Grampound with Creed Parish Council.</p>
      </li>

      <a href="https://github.com/rdjenkins/gdt/discussions" target="_blank" class="flex-item">
        <img src="${githublogo}" class="logo" alt="GitHub Logo" />
      <p>Find this project on GitHub.</p>
      </a>
      
    </ul>


    <p>Grampound Digital Twin is a project that reports to Grampound with Creed Parish Council.</p>
    <p class="version">Version: ${packageJson.version}</p>
  </div>
`;

// Modal contact form logic
document.addEventListener('DOMContentLoaded', () => {
  const messageBtn = document.getElementById('message-button');
  if (messageBtn) {
    messageBtn.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(0,0,0,0.5)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = '1000';

      const modalContent = document.createElement('div');
      modalContent.style.background = 'white';
      modalContent.style.padding = '2em';
      modalContent.style.borderRadius = '10px';
      modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      modalContent.style.textAlign = 'center';
      modalContent.style.position = 'relative';

      const title = document.createElement('h2');
      title.textContent = 'Contact Grampound Digital Twin';
      title.style.textAlign = 'center';
      modalContent.appendChild(title);

      const description = document.createElement('p');
      description.textContent = 'You may also use this form to report or suggest something to the Parish Council.';
      description.style.textAlign = 'center';
      modalContent.appendChild(description);

      const form = document.createElement('form');
      form.style.display = 'flex';
      form.style.flexDirection = 'column';
      form.style.alignItems = 'center';
      form.style.gap = '1em';

      // Name input
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.name = 'fn';
      nameInput.placeholder = 'Your name';
      nameInput.required = false;
      nameInput.style.width = '100%';
      form.appendChild(nameInput);

      // Email input
      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.name = 'fe';
      emailInput.placeholder = 'Your email (optional)';
      emailInput.required = false;
      emailInput.style.width = '100%';
      form.appendChild(emailInput);

      // Message textarea
      const messageInput = document.createElement('textarea');
      messageInput.name = 'fm';
      messageInput.placeholder = 'Your message';
      messageInput.required = true;
      messageInput.rows = 4;
      messageInput.style.width = '100%';
      form.appendChild(messageInput);

      // Simple arithmetic test for spam prevention
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const testLabel = document.createElement('label');
      testLabel.textContent = `Checking you are human. What is ${num1} + ${num2}? `;
      testLabel.style.marginTop = '1em';
      testLabel.htmlFor = 'arithmetic-test';
      form.appendChild(testLabel);

      const testInput = document.createElement('input');
      testInput.type = 'number';
      testInput.id = 'arithmetic-test';
      testInput.required = true;
      testInput.style.width = '4em';
      form.appendChild(testInput);

      // Submit button
      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.textContent = 'Send';
      submitBtn.style.marginTop = '1em';
      submitBtn.disabled = true;
      form.appendChild(submitBtn);

      // Enable submit only if arithmetic test is correct
      testInput.addEventListener('input', () => {
        submitBtn.disabled = Number(testInput.value) !== num1 + num2;
      });

      // Status message
      const statusMsg = document.createElement('div');
      statusMsg.style.marginTop = '1em';
      statusMsg.style.color = 'green';
      form.appendChild(statusMsg);

      form.onsubmit = async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        statusMsg.textContent = 'Sending...';
        try {
          const res = await fetch('https://photos.grampound.org.uk/repack.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `fn=${encodeURIComponent(nameInput.value)}&fe=${encodeURIComponent(emailInput.value)}&fm=${encodeURIComponent(messageInput.value)}`
          });
          const text = await res.text();
          statusMsg.textContent = 'Message sent! Thank you.';
          console.log('Message sent:', text);
          submitBtn.disabled = false;
          form.reset();
        } catch (err) {
          statusMsg.textContent = 'Error sending message. Please try again.';
          submitBtn.disabled = false;
        }
      };

      modalContent.appendChild(form);

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '0.2em';
      closeBtn.style.right = '0.2em';
      closeBtn.style.background = 'transparent';
      closeBtn.style.border = 'none';
      closeBtn.style.fontSize = '1.5em';
      closeBtn.style.cursor = 'pointer';
      closeBtn.onclick = () => {
        document.body.removeChild(modal);
      };
      modalContent.appendChild(closeBtn);

      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    });
  }
});

addChoiceModalLink('ghp-link', 'Photo Archive', ([
  { text: 'Photo search', url: 'https://photos.grampound.org.uk/photos.php' },
  { text: 'Slide show', url: 'https://photos.grampound.org.uk/slideshow.php' }
]));

addChoiceModalLink('weather-links', 'Forecasts', ([
  { text: 'UK Met Office', url: 'https://weather.metoffice.gov.uk/forecast/gbuqpg6k1#?nearestTo=Grampound%20(Cornwall)' },
  { text: 'YR.no', url: 'https://www.yr.no/en/forecast/daily-table/2-2648227/United%20Kingdom/England/Cornwall/Grampound' }
]));

addChoiceModalLink('creed-circuit', 'Creed Circuit Walk', ([
  { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/creed-circuit-avoiding-most-of-fore-street_955200#15/50.2940/-4.8909' },
  { text: 'Download GPX', url: creedcircuitgpx }
]));

addChoiceModalLink('fal-footpath', 'Fal Footpath Old Hill walk', ([
  { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/fal-footpath-barteliver-wood-bareliver-hill_1295709#16/50.2973/-4.9067' },
  { text: 'Download GPX', url: falfootpathgpx }
]));

addChoiceModalLink('trenowth', 'Trenowth walk', ([
  { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/grampound-walk-pepo-trenowth_947847#14/50.3122/-4.8960' },
  { text: 'Download GPX', url: trenowthwalkgpx }
]));

// Bus toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('bus-toggle') as HTMLInputElement | null;
  const linksDiv = document.getElementById('bus-links');
  const toggleLabelTraveline = document.getElementById('bus-toggle-traveline');
  const togglelabelFirstbus = document.getElementById('bus-toggle-firstbus');
  if (toggle && linksDiv) {
    toggle.addEventListener('change', () => {
      let togglechecked = (toggle && toggle.checked) ? true : false;
      console.log('Bus toggle changed to', togglechecked);
      if (togglechecked) {
        togglelabelFirstbus!.style.fontWeight = 'bold';
        toggleLabelTraveline!.style.fontWeight = 'normal';
        linksDiv.innerHTML = `
          <a href="${firstbustrurourl}" target="_blank"><button>To Truro</button></a>
          <a href="${firstbusstaustellurl}" target="_blank"><button>To St Austell</button></a>
        `;
      } else {
        togglelabelFirstbus!.style.fontWeight = 'normal';
        toggleLabelTraveline!.style.fontWeight = 'bold';
        linksDiv.innerHTML = `
          <a href="${travellinetrurourl}" target="_blank"><button>To Truro</button></a>
          <a href="${travellinestaustellurl}" target="_blank"><button>To St Austell</button></a>
        `;
      }
    });
  }
});

// Add event listener for why-button to update why-content with a random reason
document.addEventListener('DOMContentLoaded', () => {
  const whySentences = [
    "To help us find useful local information quickly.",
    "To demonstrate how open data and digital tools can benefit our community.",
    "To make environmental and travel data more accessible for Grampound.",
    "To encourage us to engage with local resources and events.",
    "To provide a single place for maps, weather, air and water quality, and more.",
    "To support transparency and awareness about local environmental conditions.",
    "To experiment with digital projects for rural areas.",
    "To make it easier to plan journeys and walks around Grampound.",
    "To showcase how technology can connect people with their local area.",
    "To encourage contributions and improvements from anyone who wants to get involved.",
    "To share some excellent digital resources that already exist for Grampound.",
    "To show what is possible with open data and community effort.",
    "To demonstrate how small digital projects can beat 'big tech' for local relevance.",
    "This could be a public touch screen in the village hall or shop.",
    "To help everyone find local info fast.",
    "To show how sharing info online can help our town.",
    "To make weather and nature facts easy to find for Grampound.",
    "To get people excited about local events and places.",
    "To have one website for maps, weather, and how clean our air and water is.",
    "To be honest and open about our local environment.",
    "To try out new tech ideas for places like ours.",
    "To make planning walks and trips around Grampound simple.",
    "To show how tech can help people connect with where they live.",
    "To share other cool websites that already exist for Grampound.",
    "To show what we can do when we share information and work together.",
    "To prove a small local website can be more useful than big websites or apps for our town.",
    "This could also be a public computer screen in the village hall or shop.",
    "To find out what's happening in the village this week.",
    "To prove a local site can be more useful than big tech apps.",
    "To make planning walks, bus trips, and journeys simpler.",
    "To be the one-stop website for everything in Grampound.",
    "To help you find local info quickly and easily.",
    "To show what we can achieve when we share information and work together.",
  ];
  const whyButton = document.getElementById('why-button');
  const whyContent = document.getElementById('why-content');
  let whysentencescopy = [...whySentences];
  let whytext = "";
  shuffleStringArray(whysentencescopy);
  let whybuttons = Array('Why again?', 'But why?', 'Why though?', 'Please, why?', 'Why, why, why?', 'But really?')
  if (whyButton && whyContent) {
    whyButton.addEventListener('click', () => {

      if (whysentencescopy.length > 0) {
        whytext = whysentencescopy.pop() || "";
      } else {
        submitLg('Why sentences exhausted, reshuffling');
        whysentencescopy = [...whySentences];
        shuffleStringArray(whysentencescopy);
        whytext = whysentencescopy.pop() || "";
      }
      whyButton.innerText = whybuttons[Math.floor(Math.random() * whybuttons.length)];
      whyContent.innerText = whytext;
      submitLg('Why button clicked: ', whytext);
    });
  }
});

// Listen for clicks on any hyperlink and log the URL
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const anchor = target.closest('a');
  if (anchor && anchor instanceof HTMLAnchorElement) {
    let u = (anchor.href.endsWith('#')) ? anchor.id + ' choice' : anchor.href;
    submitLg('Hyperlink clicked: ', u);
  }
  if (target.id === 'search-button') {
    submitLg('Search button clicked: ' + (searchBox.value || '').trim());
  }
});

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
      waterQualityDiv.innerHTML = waterqualitytrafficlightHTML + '<div>Get more detail on floodmapper ↗</div>';
    }
  });
});

// Fetch weather data from Open-Meteo
// Example coordinates for Grampound: 50.2993°N, -4.9005°E
// Documentation: https://open-meteo.com/en/docs
// API starting code from: https://open-meteo.com/en/docs/ukmo-api?latitude=50.2993&longitude=-4.9005&timezone=Europe%2FLondon&hourly=&wind_speed_unit=ms&forecast_days=1&current=weather_code,temperature_2m,wind_speed_10m,rain
const params = {
  "latitude": 50.2993,
  "longitude": -4.9005,
  "models": "ukmo_seamless",
  "current": ["weather_code", "temperature_2m", "wind_speed_10m", "rain", "is_day"],
  "timezone": "Europe/London",
  "forecast_days": 1,
  "wind_speed_unit": "ms",
};
const forecasturl = "https://api.open-meteo.com/v1/forecast";
// Wrap the weather fetch and processing in an async IIFE to ensure it runs asynchronously
(async () => {
  const responses = await fetchWeatherApi(forecasturl, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
  );

  const current = response.current()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      weather_code: current.variables(0)!.value(),
      temperature_2m: current.variables(1)!.value(),
      wind_speed_10m: current.variables(2)!.value(),
      rain: current.variables(3)!.value(),
      is_day: current.variables(4)!.value(),
    },
  };


  // Load WMO weather code descriptions from wmo-codes.json and display the appropriate description
  const weatherCode = weatherData.current.weather_code;
  let weather_code_description = '';
  let weather_code_image = '';
  let weather_code_image_background = '';

  if (wmoCodes && typeof weatherCode === 'number') {
    const codeEntry = Object.entries(wmoCodes).find(
      ([code]) => Number(code) === weatherCode
    );
    if (codeEntry) {
      const [, value] = codeEntry;
      if (weatherData.current.is_day === 1) {
        weather_code_description = value.day.description;
        weather_code_image = value.day.image;
        weather_code_image_background = 'lightblue';
      } else {
        weather_code_description = value.night.description;
        weather_code_image = value.night.image;
        weather_code_image_background = 'lightgray';
      }
    }
  }

  // 'weatherData' now contains a simple structure with arrays with datetime and weather data
  console.log(
    `\nCurrent time: ${weatherData.current.time}`,
    `\nCurrent weather_code: ${weatherData.current.weather_code}`,
    `\nCurrent weather description: ${weather_code_description}`,
    `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
    `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
    `\nCurrent rain: ${weatherData.current.rain}`,
    `\nIs it day? ${weatherData.current.is_day === 1 ? 'Yes' : 'No'}`,
  );

  // wind speed as Beaufort scale description
  const wind_description = weatherData.current.wind_speed_10m <= 0.2 ? 'calm' :
    weatherData.current.wind_speed_10m <= 1.5 ? 'light air' :
      weatherData.current.wind_speed_10m <= 3.3 ? 'light breeze' :
        weatherData.current.wind_speed_10m <= 5.4 ? 'gentle breeze' :
          weatherData.current.wind_speed_10m <= 7.9 ? 'moderate breeze' :
            weatherData.current.wind_speed_10m <= 10.7 ? 'fresh breeze' :
              weatherData.current.wind_speed_10m <= 13.8 ? 'strong breeze' :
                weatherData.current.wind_speed_10m <= 17.1 ? 'near gale' :
                  weatherData.current.wind_speed_10m <= 20.7 ? 'gale' :
                    weatherData.current.wind_speed_10m <= 24.4 ? 'severe gale' :
                      weatherData.current.wind_speed_10m <= 28.4 ? 'storm' :
                        weatherData.current.wind_speed_10m <= 32.6 ? 'violent storm' : 'hurricane';

  const rain_description = weatherData.current.rain === 0 ? 'no rain' :
    weatherData.current.rain < 2.5 ? 'light rain' :
      weatherData.current.rain < 7.6 ? 'moderate rain' :
        weatherData.current.rain < 50 ? 'heavy rain' :
          weatherData.current.rain < 100 ? 'very heavy rain' : 'extreme rain';

  const weatherInfo = document.getElementById('weather-info');
  if (weatherInfo) {
    const weather_summary = `${weather_code_description} ${Math.round(weatherData.current.temperature_2m)}°C<br>
    wind ${Math.round(weatherData.current.wind_speed_10m)} m/s (${wind_description})<br>
    rain ${weatherData.current.rain.toFixed(1)} mm (${rain_description})`;
    weatherInfo.innerHTML =
      `<img src="${weather_code_image}" alt="${weather_code_description}" class="logo grey" style="background:${weather_code_image_background};border-radius:10px;" /><br>
    ${weather_summary}`;
    submitLg(`${weather_summary}`);
  }
})();


// Fetch flood data from Open-Meteo
// https://flood-api.open-meteo.com/v1/flood?latitude=50.299266&longitude=-4.903521&daily=river_discharge_mean&timezone=Europe%2FLondon&forecast_days=1
(async () => {
  const params = {
    "latitude": 50.299266,
    "longitude": -4.903521,
    "daily": "river_discharge_mean",
    "forecast_days": 1,
  };
  const url = "https://flood-api.open-meteo.com/v1/flood";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
  );

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const floodData = {
    daily: {
      time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      ),
      river_discharge_mean: daily.variables(0)!.valuesArray(),
    },
  };

  // 'floodData' now contains a simple structure with arrays with datetime and weather data
  console.log("\nDaily river flow data GloFAS", floodData.daily)

  const floodInfo = document.getElementById('flood-info');
  if (floodInfo) {
    const nextFlow = (floodData.daily.river_discharge_mean) ? floodData.daily.river_discharge_mean[0] : -1;
    // thresholds based on data from https://nrfa.ceh.ac.uk/data/search for Fal at Trenowth and Tregony
    const flowDescription = (nextFlow === -1) ? 'No data' :
      (nextFlow < 5) ? 'Low flow' :
        (nextFlow < 10) ? 'Medium flow' :
          (nextFlow < 15) ? 'High flow' : 'Very high flow';
    console.log(`\nNext river flow mean: ${nextFlow} m³/s (${flowDescription})`);
    submitLg(`River flow: ${nextFlow} m³/s (${flowDescription})`);
    floodInfo.innerHTML = (nextFlow === -1) ? 'No river flow data' :
      `Current estimated river flow:<br>${nextFlow.toFixed(2)} m³/s<br>
    (${flowDescription})`;
  }
})();



// Append the PurpleAir script to the document body after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const script = document.createElement('script');
  script.src = 'https://www.purpleair.com/pa.widget.js?key=DX82CA29U5Z4C6HO&module=US_EPA_AQI&conversion=C0&average=10&layer=US_EPA_AQI&container=PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI';
  document.body.appendChild(script);
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
          newSpan.classList.add('purple-air-reading');
          newSpan.textContent = span.textContent;
          newSpan.style.background = 'green';
          newSpan.style.color = 'white';
          newSpan.style.borderRadius = '1000px';
          newSpan.style.padding = '0.5em 0.5em';
          widgetDiv.innerHTML = '';
          widgetDiv.appendChild(newSpan);
        }
        if (!isNaN(pmValue) && pmValue >= 50 && pmValue < 100) {
          // Create a new span element
          const newSpan = document.createElement('span');
          newSpan.classList.add('purple-air-reading');
          newSpan.textContent = span.textContent;
          newSpan.style.background = 'yellow';
          newSpan.style.color = 'black';
          newSpan.style.borderRadius = '1000px';
          newSpan.style.padding = '0.5em 0.5em';
          widgetDiv.innerHTML = '';
          widgetDiv.appendChild(newSpan);
        }
        if (!isNaN(pmValue) && pmValue >= 100) {
          // Create a new span element
          const newSpan = document.createElement('span');
          newSpan.classList.add('purple-air-reading');
          newSpan.textContent = span.textContent;
          newSpan.style.background = 'red';
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