(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const p="/gdt/OpenStreetMap-logo-with-text.svg",d="/gdt/gwchp-logo-coloured-600x600.png",u="/gdt/calendar.svg",g="/gdt/acny.png",m="/gdt/PurpleAir-Cornwall-Map.png",h="/gdt/Water-quality-sewage.png",f="/gdt/creed-churchyard.png",y="/gdt/geograph-logo.svg",_="/gdt/github-mark.svg";let w="<div id='PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'>Loading nearest sensor ...</div>";async function v(){return await(await fetch("https://deanjenkins.me/repack.php?id=grampoundwaterDOM")).text()}let c="";const i=document.createElement("input");i.type="text";i.placeholder="Find an address or place...";const l=document.createElement("button");l.textContent="Search";l.onclick=()=>{const o=`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${i.value} "Grampound with Creed"`)}&zoom=19&minlon=-4.903727173805238&minlat=50.298594007719345&maxlon=-4.900551438331605&maxlat=50.29984131703836#map=17/50.298894/-4.900718`;window.open(o,"_blank")};i.addEventListener("keydown",e=>{e.key==="Enter"&&typeof l.onclick=="function"&&l.click()});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#app");if(e){const o=document.createElement("div");o.style.marginBottom="1em",o.appendChild(i),o.appendChild(l),e.prepend(o)}});document.querySelector("#app").innerHTML=`
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
      <a href="https://umap.openstreetmap.fr/en/map/grampound-walk-pepo-trenowth_947847#14/50.3122/-4.8960" target="_blank">
        <button>Pepo Trenowth (1½ hrs)</button>
      </a>
      <a href="https://umap.openstreetmap.fr/en/map/creed-circuit-avoiding-most-of-fore-street_955200#15/50.2940/-4.8909" target="_blank">
        <button>Creed Circuit (1 hr)</button>
      </a>
      <p>Circular walks near Grampound.</p>
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
      <p>${w}</p>
      <p>Air quality in Cornwall.</p>
    </li>

    <li class="flex-item">
      <a href="https://github.com/rdjenkins/gdt/discussions" target="_blank">
        <img src="${_}" class="logo" alt="GitHub Logo" />
      </a>
      <p>Find this project on GitHub.</p>
    </li>

    </ul>
  </div>
`;document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector("#search-container");e&&(e.appendChild(i),e.appendChild(l),e.style.marginBottom="1em")});document.addEventListener("DOMContentLoaded",()=>{v().then(e=>{c=e;const o=document.querySelector("#water-quality-traffic-light");o&&(o.innerHTML=c+"<div>Get more detail on floodmapper ↗</div>")})});document.addEventListener("DOMContentLoaded",()=>{const e=document.createElement("script");e.src="https://www.purpleair.com/pa.widget.js?key=DX82CA29U5Z4C6HO&module=US_EPA_AQI&conversion=C0&average=10&layer=US_EPA_AQI&container=PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI",document.body.appendChild(e)});document.addEventListener("DOMContentLoaded",()=>{const e="PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI",o=new MutationObserver(()=>{const n=document.getElementById(e);if(n){const t=n.querySelector('span[style="display: inline-block; font-size: 80px;"]');if(t){const r=parseFloat(t.innerHTML);if(!isNaN(r)&&r<50){const a=document.createElement("span");a.textContent=t.textContent,a.style.background="green",a.style.color="white",a.style.borderRadius="1000px",a.style.padding="0.5em 0.5em",n.innerHTML="",n.appendChild(a)}if(!isNaN(r)&&r>=50&&r<100){const a=document.createElement("span");a.textContent=t.textContent,a.style.background="yellow",a.style.color="white",a.style.borderRadius="1000px",a.style.padding="0.5em 0.5em",n.innerHTML="",n.appendChild(a)}console.log(`Nearest PurpleAir sensor Pm2.5 value: ${r}`)}}}),s=document.getElementById(e);s&&o.observe(s,{childList:!0,subtree:!0})});
