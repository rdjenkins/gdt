(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const t of o.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&a(t)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();const n="/OpenStreetMap-logo-with-text.svg",c="/gwchp-logo-coloured-600x600.png",s="/calendar.svg",i="/acny.png";document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://photos.grampound.org.uk/" target="_blank">
      <img src="${c}" class="logo green" alt="Grampound Heritage Project logo" />
    </a>
    <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
      <img src="${n}" class="logo vanilla" alt="OpenStreetMap logo" />
    </a>
    <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
      <img src="${s}" class="logo" alt="Grampound calendar logo" />
    </a>
    <a href="https://www.achurchnearyou.com/search/?acny_search_place=Grampound%2C+Truro%2C+UK&lat=50.2992589&lon=-4.8984499&place=Grampound%2C+Truro+TR2%2C+UK&postcode=TR2&text=" target="_blank">
      <img src="${i}" class="logo" alt="A Church Near You logo" />
    </a>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>
  </div>
`;
