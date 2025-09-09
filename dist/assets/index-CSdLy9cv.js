(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const p="/gdt/OpenStreetMap-logo-with-text.svg",d="/gdt/gwchp-logo-coloured-600x600.png",g="/gdt/calendar.svg",u="/gdt/acny.png",h="/gdt/PurpleAir-Cornwall-Map.png",m="/gdt/Water-quality-sewage.png",f="/gdt/creed-churchyard.png",y="/gdt/geograph-logo.svg",w="/gdt/github-mark.svg";let _=`<div id='PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'>Loading PurpleAir Widget...</div>
<script src='https://www.purpleair.com/pa.widget.js?key=DX82CA29U5Z4C6HO&module=US_EPA_AQI&conversion=C0&average=10&layer=US_EPA_AQI&container=PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'><\/script>`;async function v(){return await(await fetch("https://deanjenkins.me/repack.php?id=grampoundwaterDOM")).text()}let i="";const l=document.createElement("input");l.type="text";l.placeholder="Find an address or place...";const o=document.createElement("button");o.textContent="Search";o.onclick=()=>{const r=`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${l.value} "Grampound with Creed"`)}&zoom=19&minlon=-4.903727173805238&minlat=50.298594007719345&maxlon=-4.900551438331605&maxlat=50.29984131703836#map=17/50.298894/-4.900718`;window.open(r,"_blank")};l.addEventListener("keydown",t=>{t.key==="Enter"&&typeof o.onclick=="function"&&o.click()});document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");if(t){const r=document.createElement("div");r.style.marginBottom="1em",r.appendChild(l),r.appendChild(o),t.prepend(r)}});document.querySelector("#app").innerHTML=`
  <div>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>

    <ul class="flex-container">
    <li class="flex-item">
      <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
        <img src="${p}" class="logo vanilla" alt="OpenStreetMap logo" />
      </a>
      <p>Map of Grampound with Creed.</p>
    </li>

    <li class="flex-item">
        <div id="search-container"></div>
      <p>Search for an address or place in Grampound with Creed.</p>
    </li>

    <li class="flex-item">
      <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
        <img src="${g}" class="logo" alt="Grampound calendar logo" />
      </a>
      <p>Village Hall calendar of events.</p>
    </li>

    <li class="flex-item">
      <a href="https://www.achurchnearyou.com/search/?acny_search_place=Grampound%2C+Truro%2C+UK&lat=50.2992589&lon=-4.8984499&place=Grampound%2C+Truro+TR2%2C+UK&postcode=TR2&text=" target="_blank">
        <img src="${u}" class="logo" alt="A Church Near You logo" />
      </a>
      <p>Church services in Grampound with Creed.</p>
    </li>

    <li class="flex-item">
      <a href="https://photos.grampound.org.uk/" target="_blank">
        <img src="${d}" class="logo green" alt="Grampound Heritage Project logo" />
      </a>
      <p>Grampound Heritage Project photo archive.</p>
    </li>

    <li class="flex-item">
      <a href="https://www.geograph.org.uk/mapper/combined.php#15/50.3010/-4.9012" target="_blank">
        <img src="${y}" class="logo vanilla" alt="Geograph logo" />
      </a>
      <p>Geograph photographs of Grampound.</p>
    </li>

    <li class="flex-item">
      <a href="https://stcrida.co.uk/cs.php" target="_blank">
        <img src="${f}" class="logo green" alt="Creed Churchyard logo" />
      </a>
      <p>Creed Churchyard search.</p>
    </li>

    <li class="flex-item">
      <a href="https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound" target="_blank">
        <div id="water-quality-traffic-light">
          ${i}
          <img src="${m}" class="logo" alt="Sewage discharges logo" />
        </div>
      </a>
      <p>Water quality for the River Fal.</p>
    </li>

    <li class="flex-item">
      <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank">
        <img src="${h}" class="logo" alt="Air Quality, PurpleAir logo" />
      </a>
      <p>Air quality in Cornwall.</p>
      ${_}
    </li>

    <li class="flex-item">
      <a href="https://github.com/rdjenkins/gdt/" target="_blank">
        <img src="${w}" class="logo" alt="GitHub Logo" />
      </a>
      <p>Find us on GitHub.</p>
    </li>

    </ul>
  </div>
`;document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#search-container");t&&(t.appendChild(l),t.appendChild(o),t.style.marginBottom="1em")});document.addEventListener("DOMContentLoaded",()=>{v().then(t=>{i=t;const r=document.querySelector("#water-quality-traffic-light");r&&(r.innerHTML=i+"<div>Get more detail on floodmapper ↗</div>")})});
