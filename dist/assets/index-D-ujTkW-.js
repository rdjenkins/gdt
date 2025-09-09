(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const d="/gdt/OpenStreetMap-logo-with-text.svg",p="/gdt/gwchp-logo-coloured-600x600.png",u="/gdt/calendar.svg",g="/gdt/acny.png",m="/gdt/PurpleAir-Cornwall-Map.png",h="/gdt/Water-quality-sewage.png",f="/gdt/creed-churchyard.png",y="/gdt/geograph-logo.svg",_="/gdt/github-mark.svg";let w="<div id='PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'>Loading nearest sensor ...</div>";async function v(){return await(await fetch("https://deanjenkins.me/repack.php?id=grampoundwaterDOM")).text()}let c="";const i=document.createElement("input");i.type="text";i.placeholder="Find an address or place...";const l=document.createElement("button");l.textContent="Search";l.onclick=()=>{const r=`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${i.value} "Grampound with Creed"`)}&zoom=19&minlon=-4.903727173805238&minlat=50.298594007719345&maxlon=-4.900551438331605&maxlat=50.29984131703836#map=17/50.298894/-4.900718`;window.open(r,"_blank")};i.addEventListener("keydown",e=>{e.key==="Enter"&&typeof l.onclick=="function"&&l.click()});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#app");if(e){const r=document.createElement("div");r.style.marginBottom="1em",r.appendChild(i),r.appendChild(l),e.prepend(r)}});document.querySelector("#app").innerHTML=`
  <div>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>

    <ul class="flex-container">
    <li class="flex-item">
      <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank">
        <img src="${d}" class="logo vanilla" alt="OpenStreetMap logo" />
      </a>
      <p>Map of Grampound with Creed.</p>
    </li>

    <li class="flex-item">
        <div id="search-container"></div>
      <p>Search for an address or place in Grampound with Creed.</p>
    </li>

    <li class="flex-item">
      <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank">
        <img src="${u}" class="logo" alt="Grampound calendar logo" />
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
          ${c}
          <img src="${h}" class="logo" alt="Sewage discharges logo" />
        </div>
      </a>
      <p>Water quality for the River Fal.</p>
    </li>

    <li class="flex-item">
      <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank">
        <img src="${m}" class="logo" alt="Air Quality, PurpleAir logo" />
      </a>
      <p>Air quality in Cornwall.</p>
      ${w}
    </li>

    <li class="flex-item">
      <a href="https://github.com/rdjenkins/gdt/" target="_blank">
        <img src="${_}" class="logo" alt="GitHub Logo" />
      </a>
      <p>Find us on GitHub.</p>
    </li>

    </ul>
  </div>
`;document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#search-container");e&&(e.appendChild(i),e.appendChild(l),e.style.marginBottom="1em")});document.addEventListener("DOMContentLoaded",()=>{v().then(e=>{c=e;const r=document.querySelector("#water-quality-traffic-light");r&&(r.innerHTML=c+"<div>Get more detail on floodmapper ↗</div>")})});document.addEventListener("DOMContentLoaded",()=>{const e=document.createElement("script");e.src="https://www.purpleair.com/pa.widget.js?key=DX82CA29U5Z4C6HO&module=US_EPA_AQI&conversion=C0&average=10&layer=US_EPA_AQI&container=PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI",document.body.appendChild(e)});document.addEventListener("DOMContentLoaded",()=>{const e="PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI",r=new MutationObserver(()=>{const n=document.getElementById(e);if(n){const t=n.querySelector('span[style="display: inline-block; font-size: 80px;"]');if(t){const a=parseFloat(t.innerHTML);if(!isNaN(a)&&a<50){const o=document.createElement("span");o.textContent=t.textContent,o.style.background="green",o.style.color="white",o.style.borderRadius="1000px",o.style.padding="0.5em 0.5em",n.innerHTML="",n.appendChild(o)}if(!isNaN(a)&&a>=50&&a<100){const o=document.createElement("span");o.textContent=t.textContent,o.style.background="yellow",o.style.color="white",o.style.borderRadius="1000px",o.style.padding="0.5em 0.5em",n.innerHTML="",n.appendChild(o)}r.disconnect()}}}),s=document.getElementById(e);s&&r.observe(s,{childList:!0,subtree:!0})});
