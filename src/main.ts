import './style.css'
import openstreetmaplogo from '/OpenStreetMap-logo-with-text.svg'
import ghplogo from '/gwchp-logo-coloured-600x600.png'
import calendarlogo from '/calendar.svg'
import acnylogo from '/acny.png'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://photos.grampound.org.uk/" target="_blank">
      <img src="${ghplogo}" class="logo green" alt="Grampound Heritage Project logo" />
    </a>
    <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
      <img src="${openstreetmaplogo}" class="logo vanilla" alt="OpenStreetMap logo" />
    </a>
    <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
      <img src="${calendarlogo}" class="logo" alt="Grampound calendar logo" />
    </a>
    <a href="https://www.achurchnearyou.com/search/?acny_search_place=Grampound%2C+Truro%2C+UK&lat=50.2992589&lon=-4.8984499&place=Grampound%2C+Truro+TR2%2C+UK&postcode=TR2&text=" target="_blank">
      <img src="${acnylogo}" class="logo" alt="A Church Near You logo" />
    </a>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>
  </div>
`
