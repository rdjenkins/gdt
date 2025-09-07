(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const i="/gdt/OpenStreetMap-logo-with-text.svg",p="/gdt/gwchp-logo-coloured-600x600.png",d="/gdt/calendar.svg",g="/gdt/acny.png",u="/gdt/PurpleAir-Cornwall-Map.png",h="/gdt/Water-quality-sewage.png",m="/gdt/creed-churchyard.png",f="/gdt/geograph-logo.svg",y="/gdt/github-mark.svg",l=document.createElement("input");l.type="text";l.placeholder="Find an address or place...";const r=document.createElement("button");r.textContent="Search";r.onclick=()=>{const a=`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${l.value} "Grampound with Creed"`)}&zoom=19&minlon=-4.903727173805238&minlat=50.298594007719345&maxlon=-4.900551438331605&maxlat=50.29984131703836#map=17/50.298894/-4.900718`;window.open(a,"_blank")};l.addEventListener("keydown",t=>{t.key==="Enter"&&typeof r.onclick=="function"&&r.click()});document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");if(t){const a=document.createElement("div");a.style.marginBottom="1em",a.appendChild(l),a.appendChild(r),t.prepend(a)}});document.querySelector("#app").innerHTML=`
  <div>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>

    <ul class="flex-container">
    <li class="flex-item">
      <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
        <img src="${i}" class="logo vanilla" alt="OpenStreetMap logo" />
      </a>
      <p>Map of Grampound with Creed.</p>
    </li>

    <li class="flex-item">
        <div id="search-container"></div>
      <p>Search for an address or place in Grampound with Creed.</p>
    </li>

    <li class="flex-item">
      <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
        <img src="${d}" class="logo" alt="Grampound calendar logo" />
      </a>
      <p>Village Hall calendar of events.</p>
    </li>

    <li class="flex-item">
      <a href="https://www.achurchnearyou.com/search/?acny_search_place=Grampound%2C+Truro%2C+UK&lat=50.2992589&lon=-4.8984499&place=Grampound%2C+Truro+TR2%2C+UK&postcode=TR2&text=" target="_blank">
        <img src="${g}" class="logo" alt="A Church Near You logo" />
      </a>
      <p>Church services in Grampound with Creed.</p>
    </li>

    <li class="flex-item">
      <a href="https://photos.grampound.org.uk/" target="_blank">
        <img src="${p}" class="logo green" alt="Grampound Heritage Project logo" />
      </a>
      <p>Grampound Heritage Project photo archive.</p>
    </li>

    <li class="flex-item">
      <a href="https://www.geograph.org.uk/mapper/combined.php#15/50.3010/-4.9012" target="_blank">
        <img src="${f}" class="logo vanilla" alt="Geograph logo" />
      </a>
      <p>Geograph photographs of Grampound.</p>
    </li>

    <li class="flex-item">
      <a href="https://stcrida.co.uk/cs.php" target="_blank">
        <img src="${m}" class="logo green" alt="Creed Churchyard logo" />
      </a>
      <p>Creed Churchyard search.</p>
    </li>

    <li class="flex-item">
      <a href="https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound" target="_blank">
        <img src="${h}" class="logo" alt="Sewage discharges logo" />
      </a>
      <p>Water quality for the River Fal.</p>
    </li>

    <li class="flex-item">
      <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank">
        <img src="${u}" class="logo" alt="Air Quality, PurpleAir logo" />
      </a>
      <p>Air quality in Cornwall.</p>
    </li>

    <li class="flex-item">
      <a href="https://github.com/rdjenkins/gdt/discussions" target="_blank">
        <img src="${y}" class="logo" alt="GitHub Discussions Logo" />
      </a>
      <p>Join the discussion about this project on GitHub.</p>
    </li>

    </ul>
  </div>
`;document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#search-container");t&&(t.appendChild(l),t.appendChild(r),t.style.marginBottom="1em")});
