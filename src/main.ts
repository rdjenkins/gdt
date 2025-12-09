import './style.css'
import openStreetMapLogo from '/OpenStreetMap-logo-with-text.svg'
import ghpLogo from '/gwchp-logo-coloured-600x600.png'
import calendarLogo from '/calendar.svg'
import airQualityLogo from '/PurpleAir-Cornwall-Map.png'
import waterQualityLogo from '/Water-quality-sewage.png'
import creedChurchyardLogo from '/creed-churchyard.png'
import geographLogo from '/geograph-logo.svg'
import githubLogo from '/github-mark.svg'
import busIcon from '/ISO_7001_PI_TF_006.svg' // Original from https://commons.wikimedia.org/wiki/File:ISO_7001_PI_TF_006.svg
import hikerIcon from '/hiker.svg' // Original from https://commons.wikimedia.org/wiki/File:Big_guy_637%27s_hiking_icon.svg
import packageJson from '../package.json'
import creedCircuitGpx from '/creed_circuit_avoiding_most_of_fore_street.gpx?url'
import falFootpathGpx from '/fal_footpath__barteliver_wood__bareliver_hill.gpx?url'
import trenowthWalkGpx from '/grampound_walk_pepo_trenowth.gpx?url'
import { addChoiceModalLink } from './utils' // event listeners also setup these modules
import { showWhyButton } from './why_button'
import { purpleAirSensorWidget } from './purpleair'
import { showMessageButton } from './messenger'
import { showWeather } from './weather' // show weather content
import { showFloodWarning } from './floodwarning' // show a flood warning (from the EA) if there is one
import { waterQualityTrafficLight } from './water' // get the water quality traffic light for Grampound
import { showSearchContainer } from './mapsearch' // show the custom OSM map search

console.log('GDT Version:', packageJson.version);


const CURRENT_DATE_TIME = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', hour12: false })

let firstBusTruroUrl = "https://www.firstbus.co.uk/cornwall/plan-journey/journey-planner/#/results?fromAddress=Grampound,%20Truro,%20UK&fromLat=50.2992589&fromLng=-4.8984499&fromPlaceId=ChIJaavkWhhra0gR-WQ7KozZobc&toAddress=Truro,%20UK&toLat=50.263195&toLng=-5.051041&toPlaceId=ChIJdRpa1XwQa0gRtAcdle9HY2E"
let firstBusStAustellUrl = "https://www.firstbus.co.uk/cornwall/plan-journey/journey-planner/#/results?fromAddress=Grampound, Truro, UK&fromLat=50.2992589&fromLng=-4.8984499&fromPlaceId=ChIJaavkWhhra0gR-WQ7KozZobc&toAddress=St Austell, Saint Austell, UK&toLat=50.3403779&toLng=-4.7834252&toPlaceId=ChIJYwb4Jy1Aa0gRiCTxrSBmq2c"
let travelineTruroUrl = "https://nationaljourneyplanner.travelinesw.com/swe/trip?formik=destination%3D30004840%26mtcb0%3Dfalse%26mtcb9%3Dfalse%26origin%3D30006418&lng=en&trip=multiModalitySelected%3Dpt"
let travelineStAustellUrl = "https://nationaljourneyplanner.travelinesw.com/swe/trip?formik=destination%3D30004707%26mtcb0%3Dfalse%26mtcb9%3Dfalse%26origin%3D30006418&lng=en&trip=multiModalitySelected%3Dpt"
let tfcTruroUrl = 'https://www.transportforcornwall.co.uk/directions?origin%5Bname%5D=Grampound&origin%5Blocation%5D%5Blat%5D=50.29898&origin%5Blocation%5D%5Blon%5D=-4.900275&destination%5Bname%5D=Truro&destination%5Blocation%5D%5Blat%5D=50.263317&destination%5Blocation%5D%5Blon%5D=-5.051811&time%5Bwhen%5D=now'
let tfcStAustellUrl = 'https://www.transportforcornwall.co.uk/directions?origin%5Bname%5D=Grampound&origin%5Blocation%5D%5Blat%5D=50.29898&origin%5Blocation%5D%5Blon%5D=-4.900275&destination%5Bname%5D=St+Austell&destination%5Blocation%5D%5Blat%5D=50.33814&destination%5Blocation%5D%5Blon%5D=-4.794184&time%5Bwhen%5D=now'



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
  <img src="${busIcon}" alt="bus icon" class="icon"><br>
      <div style="margin-top:1em;">
        <div id="bus-links" style="margin-top:0.5em;">
          <a id='bus-link-truro' href="#" target="_blank"><button>To Truro</button></a>
          <a id='bus-link-st-austell' href="#" target="_blank"><button>To St Austell</button></a>
        </div>
        <p>Buses from Grampound.</p>
      </div>
    </li>

  <li class="flex-item">
  <img src="${hikerIcon}" alt="hiker icon" class="icon"><br>
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
        <img src="${airQualityLogo}" class="logo" alt="Air Quality, PurpleAir logo" />
      <p>${purpleAirSensorWidget()}</p>
      <p>Air quality in Cornwall.</p>
      </a>

      <a href="#" id="sewage-links" target="_blank" class="flex-item">
        <div id="water-quality-traffic-light">
          ${waterQualityTrafficLight()}
          <img src="${waterQualityLogo}" class="logo" alt="Sewage discharges logo" />
        </div>
      <p>Water quality for the River Fal.</p>
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

addChoiceModalLink('weather-links', 'Forecasts', ([
  { text: 'UK Met Office', url: 'https://weather.metoffice.gov.uk/forecast/gbuqpg6k1#?nearestTo=Grampound%20(Cornwall)' },
  { text: 'YR.no', url: 'https://www.yr.no/en/forecast/daily-table/2-2648227/United%20Kingdom/England/Cornwall/Grampound' }
]));

addChoiceModalLink('sewage-links', 'Sewage map', ([
  { text: 'Floodmapper', url: 'https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound' },
  { text: 'SWW overflow map', url: 'https://www.southwestwater.co.uk/environment/rivers-and-bathing-waters/waterfitlive/storm-overflow-map' }
]));

addChoiceModalLink('creed-circuit', 'Creed Circuit Walk', ([
  { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/creed-circuit-avoiding-most-of-fore-street_955200#15/50.2940/-4.8909' },
  { text: 'Download GPX', url: creedCircuitGpx }
]));

addChoiceModalLink('fal-footpath', 'Fal Footpath Old Hill walk', ([
  { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/fal-footpath-barteliver-wood-bareliver-hill_1295709#16/50.2973/-4.9067' },
  { text: 'Download GPX', url: falFootpathGpx }
]));

addChoiceModalLink('trenowth', 'Trenowth walk', ([
  { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/grampound-walk-pepo-trenowth_947847#14/50.3122/-4.8960' },
  { text: 'Download GPX', url: trenowthWalkGpx }
]));

addChoiceModalLink('bus-link-truro', 'Bus times to Truro', ([
  { text: 'Transport for Cornwall', url: tfcTruroUrl },
  { text: 'First Bus', url: firstBusTruroUrl },
  { text: 'Traveline SW', url: travelineTruroUrl }
]));

addChoiceModalLink('bus-link-st-austell', 'Bus times to St Austell', [
  { text: 'Transport for Cornwall', url: tfcStAustellUrl },
  { text: 'First Bus', url: firstBusStAustellUrl },
  { text: 'Traveline SW', url: travelineStAustellUrl }
]);







