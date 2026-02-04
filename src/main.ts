import { checkNoticePermissions } from './notices'
import './style.css'
import openStreetMapLogo from '/OpenStreetMap-logo-with-text.svg'
import calendarLogo from '/calendar.svg'
import creedChurchyardLogo from '/creed-churchyard.png'
import geographLogo from '/geograph-logo.svg'
import githubLogo from '/github-mark.svg'
import packageJson from '../package.json'
import { showBuses } from './buses'
import { showWalks } from './walks'
import { showPhotoArchive } from './photoArchive'
import { showWhyButton } from './why_button'
import { showPurpleAir } from './purpleair'
import { showMessenger } from './messenger'
import { showWeather } from './weather' // show weather content
import { showFloodWarning } from './floodwarning' // show a flood warning (from the EA) if there is one
import { showSewage } from './sewage'
import { showSearchContainer } from './mapsearch' // show the custom OSM map search
import { showTraffic } from './traffic'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { showApps } from './apps'
import { showAstro } from './astro'

console.log('GDT Version:', packageJson.version);


const CURRENT_DATE_TIME = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour12: false })


// TODO consider how to do the styling so the show...() modules could style themselves in other projects

// Define and load the main HTML structure
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="main">
    <a class="reload" href="./"><h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p></a>
    ${checkNoticePermissions()}

<h2>Maps and travel</h2>
  <ul class="flex-container">
    <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank" class="flex-item">
      <img src="${openStreetMapLogo}" class="logo vanilla" alt="OpenStreetMap logo" />
      <p>Map of Grampound with Creed.</p>
    </a>

    ${showSearchContainer()}

    ${showBuses()}

    ${showWalks()}

    ${showTraffic()}
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

      ${showPhotoArchive()}

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

      ${showWeather()}

      ${showPurpleAir()}

      ${showSewage()}

      ${showFloodWarning()}

      ${showAstro()}

    </ul>
  
<h2>More info</h2>
    <ul class="flex-container">

      ${showWhyButton()}

      ${showMessenger()}

      <a href="https://github.com/rdjenkins/gdt" target="_blank" class="flex-item">
  <img src="${githubLogo}" class="logo" alt="GitHub Logo" />
      <p>Find this project on GitHub.</p>
      </a>
      
      ${showApps()}
    </ul>

    <div class="acknowledge">
      <a href="#licenses-content" id="licenses">Important information <span class="licenses-more-icon">▼</span></a>
      <div id="licenses-content" class="hidden">
        <p><b>Acknowledgements</b></p>
        <table class="responsive-table">
          <tr>
            <td>Flood alert and river level data</td>
            <td><a href="https://environment.data.gov.uk/flood-monitoring/doc/reference" target="_blank">Environment Agency Real Time flood-monitoring API</a></td>
          </tr>
          <tr>
            <td>Weather alert</td>
            <td><a href="https://weather.metoffice.gov.uk/guides/rss" target="_blank">Met Office</a></td>
          </tr>
          <tr>
            <td>Weather summary</td>
            <td><a href="https://open-meteo.com/en/docs" target="_blank">Open-Meteo</a></td>
          </tr>
          <tr>
            <td>Sewage data</td>
            <td><a href="https://www.floodmapper.co.uk/" target="_blank">Floodmapper</a></td>
          </tr>
          <tr>
            <td>Air quality</td>
            <td><a href="https://www2.purpleair.com/" target="_blank">PurpleAir sensor network</a></td>
          </tr>
          <tr>
            <td>Open StreetMap data</td>
            <td><a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a></td>
          </tr>
          <tr>
            <td>Aurora data</td>
            <td><a href="https://aurorawatch.lancs.ac.uk/" target="_blank">Aurorawatch UK, Lancaster University</a></td>
          </tr>
         <tr>
            <td>Development</td>
            <td><a href="https://deanjenkins.me/#gdtapp" target="_blank">Developer's website</a></td>
          </tr>
        </table>

        <div id="disclaimer">
          <p><b>Disclaimer</b></p>
          <p>Grampound Digital Twin does not represent any
            government agency and is not intended to replace official information.
          </p>

          <p>It provides information from, and links to, publicly available UK government data including:
            <a href="https://environment.data.gov.uk/flood-monitoring/doc/reference">Environment Agency
            Real Time flood-monitoring API</a> for flood alert and river level data,
            UK <a href="https://weather.metoffice.gov.uk/guides/rss">Met Office</a> for weather
            alerts for the South West,
            and planned roadworks from <a href="https://www.cornwall.gov.uk/transport-parking-and-streets/roads-highways-and-pavements/roadworks/">Cornwall
            Council</a>.
          </p>
        </div>

      </div>


    </div>

    <p class="version">Version: ${packageJson.version}</p>

  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('licenses')?.addEventListener('click', (e) => {
    e.preventDefault();
    const content = document.getElementById('licenses-content');
    content?.classList.toggle('hidden');
    const icon = document.querySelector('.licenses-more-icon');
    if (content && icon) {
      if (content.classList.contains('hidden')) {
        icon.textContent = '▼';
      } else {
        icon.textContent = '▲';
      }
    }
  });
});

// for PWA elements
window.addEventListener('load', () => {
  defineCustomElements(window)
})
