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

console.log('GDT Version:', packageJson.version);

let nearestPurpleAirSensorwidget = `<div id='PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'>Loading nearest sensor ...</div>`
let currentDateTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour12: false });
const urlparams = new URLSearchParams(window.location.search);
const nolog = (urlparams.has('nolog')) ? true : false;
let waterqualitytrafficlightHTML = "";

async function waterqualitytrafficlight() {
  const response = await fetch('https://deanjenkins.me/repack.php?id=grampoundwaterDOM');
  const text = await response.text();
  return text;
}

// Function to submit anonymous logs to the server to see which functions are being used
async function submitLg(lg: string, u: string = ''): Promise<string> {
  if (nolog) {
    console.log('GDT Logging disabled');
    return 'nolog';
  }
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
      <a href="https://www.firstbus.co.uk/cornwall/plan-journey/journey-planner/#/results?fromAddress=Grampound,%20Truro,%20UK&fromLat=50.2992589&fromLng=-4.8984499&fromPlaceId=ChIJaavkWhhra0gR-WQ7KozZobc&toAddress=Truro,%20UK&toLat=50.263195&toLng=-5.051041&toPlaceId=ChIJdRpa1XwQa0gRtAcdle9HY2E" target="_blank">
        <button>To Truro</button>
      </a>
      <a href="https://www.firstbus.co.uk/cornwall/plan-journey/journey-planner/#/results?fromAddress=Grampound, Truro, UK&fromLat=50.2992589&fromLng=-4.8984499&fromPlaceId=ChIJaavkWhhra0gR-WQ7KozZobc&toAddress=St Austell, Saint Austell, UK&toLat=50.3403779&toLng=-4.7834252&toPlaceId=ChIJYwb4Jy1Aa0gRiCTxrSBmq2c" target="_blank">
        <button>To St Austell</button>
      </a>
      <p>Buses from Grampound.</p>
    </li>

    <li class="flex-item">
    <img src="${hikericon}" alt="hiker icon" class="icon"><br>
      <a href="https://umap.openstreetmap.fr/en/map/grampound-walk-pepo-trenowth_947847#14/50.3122/-4.8960" target="_blank">
        <button>Trenowth (1½ hrs)</button>
      </a>
      <a href="https://umap.openstreetmap.fr/en/map/creed-circuit-avoiding-most-of-fore-street_955200#15/50.2940/-4.8909" target="_blank">
        <button>Creed Circuit (1 hr)</button>
      </a>
      <p>Circular walks near Grampound.</p>
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

      <a href="https://photos.grampound.org.uk/" target="_blank" class="flex-item">
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

      <a href="https://weather.metoffice.gov.uk/forecast/gbuqpg6k1#?nearestTo=Grampound%20(Cornwall)" target="_blank" class="flex-item">
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
<p class="left">Find out more about this project and how to contribute.</p>
    <ul class="flex-container">

    <li class="flex-item">
        <button id="why-button">
          Why?
        </button>
        <p id="why-content">Keep hitting the why button to learn more.</p>
      </li>

      <a href="https://github.com/rdjenkins/gdt/discussions" target="_blank" class="flex-item">
        <img src="${githublogo}" class="logo" alt="GitHub Logo" />
      <p>Find this project on GitHub.</p>
      </a>
      
    </ul>

    <p class="version">Version: ${packageJson.version}</p>
  </div>
`

// Add event listener for why-button to update why-content with a random reason
let last_idx = -1;
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
  ];
  const whyButton = document.getElementById('why-button');
  const whyContent = document.getElementById('why-content');
  if (whyButton && whyContent) {
    whyButton.addEventListener('click', () => {
      let idx: number;
      if (whySentences.length > 1) {
        do {
          idx = Math.floor(Math.random() * whySentences.length);
        } while (idx === last_idx);
      } else {
        idx = 0;
      }
      last_idx = idx;
      whyContent.textContent = whySentences[idx];
      whyButton.innerText = 'Why again?';
    });
  }
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
    `<img src="${weather_code_image}" alt="${weather_code_description}" style="background:${weather_code_image_background};border-radius:10px;" /><br>
    ${weather_summary}`;
    submitLg(`${weather_summary}`);
  }
})();


// Fetch flood data from Open-Meteo
(async () => {
  const params = {
	"latitude": 50.2993,
	"longitude": -4.9005,
	"daily": "river_discharge",
	"forecast_days": 7,
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
		river_discharge: daily.variables(0)!.valuesArray(),
	},
};

// 'floodData' now contains a simple structure with arrays with datetime and weather data
console.log("\nDaily river flow data GloFAS", floodData.daily)

const floodInfo = document.getElementById('flood-info');
if (floodInfo) {
  const nextFlow = (floodData.daily.river_discharge) ? floodData.daily.river_discharge[0] : -1;
  // thresholds based on data from https://nrfa.ceh.ac.uk/data/search for Fal at Trenowth and Tregony
  const flowDescription = (nextFlow === -1) ? 'No data' :
    (nextFlow < 5) ? 'Low flow' :
    (nextFlow < 10) ? 'Medium flow' :
    (nextFlow < 15) ? 'High flow' : 'Very high flow';
  console.log(`\nNext river flow: ${nextFlow} m³/s (${flowDescription})`);
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
        if (!isNaN(pmValue) && pmValue >=50 && pmValue < 100) {
          // Create a new span element
          const newSpan = document.createElement('span');
          newSpan.classList.add('purple-air-reading');
          newSpan.textContent = span.textContent;
          newSpan.style.background = 'yellow';
          newSpan.style.color = 'white';
          newSpan.style.borderRadius = '1000px';
          newSpan.style.padding = '0.5em 0.5em';
          widgetDiv.innerHTML = '';
          widgetDiv.appendChild(newSpan);
        }
        if (!isNaN(pmValue) && pmValue >=100) {
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