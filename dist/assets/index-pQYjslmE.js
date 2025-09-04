(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const i="/gdt/OpenStreetMap-logo-with-text.svg",p="/gdt/gwchp-logo-coloured-600x600.png",d="/gdt/calendar.svg",u="/gdt/acny.png",g="/gdt/PurpleAir-Cornwall-Map.png",m="/gdt/Water-quality-sewage.png",n=document.createElement("input");n.type="text";n.placeholder="Find an address or place...";const a=document.createElement("button");a.textContent="Search";a.onclick=()=>{const r=`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${n.value} "Grampound with Creed"`)}&zoom=19&minlon=-4.903727173805238&minlat=50.298594007719345&maxlon=-4.900551438331605&maxlat=50.29984131703836#map=17/50.298894/-4.900718`;window.open(r,"_blank")};n.addEventListener("keydown",t=>{t.key==="Enter"&&typeof a.onclick=="function"&&a.click()});document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");if(t){const r=document.createElement("div");r.style.marginBottom="1em",r.appendChild(n),r.appendChild(a),t.prepend(r)}});document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
      <img src="${i}" class="logo vanilla" alt="OpenStreetMap logo" />
    </a>
    <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
      <img src="${d}" class="logo" alt="Grampound calendar logo" />
    </a>
    <a href="https://www.achurchnearyou.com/search/?acny_search_place=Grampound%2C+Truro%2C+UK&lat=50.2992589&lon=-4.8984499&place=Grampound%2C+Truro+TR2%2C+UK&postcode=TR2&text=" target="_blank">
      <img src="${u}" class="logo" alt="A Church Near You logo" />
    </a>
    <a href="https://photos.grampound.org.uk/" target="_blank">
      <img src="${p}" class="logo green" alt="Grampound Heritage Project logo" />
    </a>
    <a href="https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound" target="_blank">
      <img src="${m}" class="logo" alt="Sewage discharges logo" />
    </a>
    <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank">
      <img src="${g}" class="logo" alt="Air Quality, PurpleAir logo" />
    </a>
    <div id="search-container"></div>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>
  </div>
`;document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#search-container");t&&(t.appendChild(n),t.appendChild(a),t.style.marginBottom="1em")});
