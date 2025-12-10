import './style.css'
import openStreetMapLogo from '/OpenStreetMap-logo-with-text.svg'
import ghpLogo from '/gwchp-logo-coloured-600x600.png'
import calendarLogo from '/calendar.svg'
import creedChurchyardLogo from '/creed-churchyard.png'
import geographLogo from '/geograph-logo.svg'
import githubLogo from '/github-mark.svg'
import packageJson from '../package.json'
import { addChoiceModalLink } from './utils' // event listeners also setup these modules
import { showBuses } from './buses'
import { showWalks } from './walks'
import { showWhyButton } from './why_button'
import { showPurpleAir } from './purpleair'
import { showMessageButton } from './messenger'
import { showWeather } from './weather' // show weather content
import { showFloodWarning } from './floodwarning' // show a flood warning (from the EA) if there is one
import { showSewage } from './sewage'
import { showSearchContainer } from './mapsearch' // show the custom OSM map search

console.log('GDT Version:', packageJson.version);


const CURRENT_DATE_TIME = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour12: false })


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
      <img src="${openStreetMapLogo}" class="logo vanilla" alt="OpenStreetMap logo" />
      <p>Map of Grampound with Creed.</p>
    </a>

    <li class="flex-item">
      ${showSearchContainer()}
    </li>

    <li class="flex-item">
      ${showBuses()}
    </li>

    <li class="flex-item">
      ${showWalks()}
    </li>
  </ul>


    <h2>What's on</h2>
    <ul class="flex-container">

      <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank" class="flex-item">
  <img src="${calendarLogo}" class="logo" alt="Grampound calendar logo" />
      <p>Calendar of events.</p>
      </a>

    </ul>

<h2>Photos and more</h2>
    <ul class="flex-container">

      <a id="ghp-link" href="#" target="_blank" class="flex-item">
  <img src="${ghpLogo}" class="logo green" alt="Grampound Heritage Project logo" />
      <p>Grampound Heritage Project photo archive.</p>
      </a>

      <a href="https://www.geograph.org.uk/near/SW93484841" target="_blank" class="flex-item">
  <img src="${geographLogo}" class="logo vanilla" alt="Geograph logo" />
      <p>Geograph photographs of Grampound.</p>
      </a>

      <a href="https://stcrida.co.uk/cs.php" target="_blank" class="flex-item">
  <img src="${creedChurchyardLogo}" class="logo green" alt="Creed Churchyard logo" />
      <p>Creed Churchyard search.</p>
      </a>

      </ul>

<h2>Environment</h2>
<p class="left">Updated ${CURRENT_DATE_TIME}</p>
    <ul class="flex-container">

      <a href="#" id="weather-links" target="_blank" class="flex-item">
        ${showWeather()}
      </a>

      <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank" class="flex-item">
        ${showPurpleAir()}
      </a>

      <a href="#" id="sewage-links" target="_blank" class="flex-item">
        ${showSewage()}
      </a>

      <a href="https://check-for-flooding.service.gov.uk/target-area/114WAFT1W02A00" target="_blank" class="flex-item">
        ${showFloodWarning()}
      </a>

      </ul>
  
<h2>More info</h2>
<p class="left">About this project and how to contribute.</p>
    <ul class="flex-container">

    <li class="flex-item">
      ${showWhyButton()}
      </li>

      <li class="flex-item">
      ${showMessageButton()}
        <p>Send a message to us or Grampound with Creed Parish Council.</p>
      </li>

      <a href="https://github.com/rdjenkins/gdt/discussions" target="_blank" class="flex-item">
  <img src="${githubLogo}" class="logo" alt="GitHub Logo" />
      <p>Find this project on GitHub.</p>
      </a>
      
    </ul>

    <p>Grampound Digital Twin is a project that reports to Grampound with Creed Parish Council.</p>
    <p class="version">Version: ${packageJson.version}</p>
  </div>
`;

addChoiceModalLink('ghp-link', 'Photo Archive', ([
  { text: 'Photo search', url: 'https://photos.grampound.org.uk/photos.php' },
  { text: 'Slide show', url: 'https://photos.grampound.org.uk/slideshow.php' }
]));







