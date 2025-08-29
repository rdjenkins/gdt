(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const s="/gdt/OpenStreetMap-logo-with-text.svg",c="/gdt/gwchp-logo-coloured-600x600.png",n="/gdt/calendar.svg",p="/gdt/acny.png",g="/gdt/PurpleAir-Cornwall-Map.png",i="/gdt/Water-quality-sewage.png";document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
      <img src="${s}" class="logo vanilla" alt="OpenStreetMap logo" />
    </a>
    <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
      <img src="${n}" class="logo" alt="Grampound calendar logo" />
    </a>
    <a href="https://www.achurchnearyou.com/search/?acny_search_place=Grampound%2C+Truro%2C+UK&lat=50.2992589&lon=-4.8984499&place=Grampound%2C+Truro+TR2%2C+UK&postcode=TR2&text=" target="_blank">
      <img src="${p}" class="logo" alt="A Church Near You logo" />
    </a>
    <a href="https://photos.grampound.org.uk/" target="_blank">
      <img src="${c}" class="logo green" alt="Grampound Heritage Project logo" />
    </a>
    <a href="https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound" target="_blank">
      <img src="${i}" class="logo" alt="Sewage discharges logo" />
    </a>
    <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank">
      <img src="${g}" class="logo" alt="Air Quality, PurpleAir logo" />
    </a>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>
  </div>
`;
