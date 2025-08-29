import './style.css'
import openstreetmaplogo from '/OpenStreetMap-logo-with-text.svg'
import ghplogo from '/gwchp-logo-coloured-600x600.png'
import calendarlogo from '/calendar.svg'
import acnylogo from '/acny.png'
import airqualitylogo from '/PurpleAir-Cornwall-Map.png'
import waterqualitylogo from '/Water-quality-sewage.png'

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
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>
  </div>
`
