(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const m="/gdt/OpenStreetMap-logo-with-text.svg",h="/gdt/gwchp-logo-coloured-600x600.png",f="/gdt/calendar.svg",y="/gdt/PurpleAir-Cornwall-Map.png",w="/gdt/Water-quality-sewage.png",_="/gdt/creed-churchyard.png",v="/gdt/geograph-logo.svg",C="/gdt/github-mark.svg",b="0.3.4",x={version:b};console.log("GDT Version:",x.version);let k="<div id='PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'>Loading nearest sensor ...</div>";async function L(){return await(await fetch("https://deanjenkins.me/repack.php?id=grampoundwaterDOM")).text()}let d="";const i=document.createElement("input");i.type="text";i.placeholder="Find an address or place...";const l=document.createElement("button");l.textContent="Search";l.id="search-button";l.onclick=()=>{const r=`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${i.value} "Grampound with Creed"`)}&zoom=19&minlon=-4.903727173805238&minlat=50.298594007719345&maxlon=-4.900551438331605&maxlat=50.29984131703836#map=17/50.298894/-4.900718`;window.open(r,"_blank")};i.addEventListener("keydown",t=>{t.key==="Enter"&&typeof l.onclick=="function"&&l.click()});document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#app");if(t){const r=document.createElement("div");r.style.marginBottom="1em",r.appendChild(i),r.appendChild(l),t.prepend(r)}});document.querySelector("#app").innerHTML=`
  <div>
    <h1>Grampound</h1>
    <p class="subtitle">
    digital twin project
    </p>

<h2>Maps</h2>
    <ul class="flex-container">
      <a href="https://www.openstreetmap.org/#map=19/50.298719/-4.903400" target="_blank" class="flex-item">
        <img src="${m}" class="logo vanilla" alt="OpenStreetMap logo" />
      <p>Map of Grampound with Creed.</p>
      </a>

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
    </ul>

    <h2>What's on</h2>
    <ul class="flex-container">

      <a href="https://grampoundvillagehall.org.uk/calendar.php" target="_blank" class="flex-item">
        <img src="${f}" class="logo" alt="Grampound calendar logo" />
      <p>Calendar of events.</p>
      </a>

    </ul>

<h2>Photos and more</h2>
    <ul class="flex-container">

      <a href="https://photos.grampound.org.uk/" target="_blank" class="flex-item">
        <img src="${h}" class="logo green" alt="Grampound Heritage Project logo" />
      <p>Grampound Heritage Project photo archive.</p>
      </a>

      <a href="https://www.geograph.org.uk/mapper/combined.php#15/50.3010/-4.9012" target="_blank" class="flex-item">
        <img src="${v}" class="logo vanilla" alt="Geograph logo" />
      <p>Geograph photographs of Grampound.</p>
      </a>

      <a href="https://stcrida.co.uk/cs.php" target="_blank" class="flex-item">
        <img src="${_}" class="logo green" alt="Creed Churchyard logo" />
      <p>Creed Churchyard search.</p>
      </a>

      </ul>

<h2>Environment</h2>
    <ul class="flex-container">

      <a href="https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound" target="_blank" class="flex-item">
        <div id="water-quality-traffic-light">
          ${d}
          <img src="${w}" class="logo" alt="Sewage discharges logo" />
        </div>
      <p>Water quality for the River Fal.</p>
      </a>

      <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank" class="flex-item">
        <img src="${y}" class="logo" alt="Air Quality, PurpleAir logo" />
      <p>${k}</p>
      <p>Air quality in Cornwall.</p>
      </a>

      </ul>
  
<h2>More info</h2>
    <ul class="flex-container">
      <a href="https://github.com/rdjenkins/gdt/discussions" target="_blank" class="flex-item">
        <img src="${C}" class="logo" alt="GitHub Logo" />
      <p>Find this project on GitHub.</p>
      </a>

      
    </ul>
  </div>
`;document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#search-container");t&&(t.appendChild(i),t.appendChild(l),t.style.marginBottom="1em")});document.addEventListener("DOMContentLoaded",()=>{L().then(t=>{d=t;const r=document.querySelector("#water-quality-traffic-light");r&&(r.innerHTML=d+"<div>Get more detail on floodmapper ↗</div>")})});async function p(t,r=""){let s="";return s=await(await fetch("https://deanjenkins.me/repack.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`lg=${encodeURIComponent(t)}&u=${encodeURIComponent(r)}`})).text(),console.log("GDT Logging:",s),s}document.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.purpleair.com/pa.widget.js?key=DX82CA29U5Z4C6HO&module=US_EPA_AQI&conversion=C0&average=10&layer=US_EPA_AQI&container=PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI",document.body.appendChild(t)});document.addEventListener("click",t=>{const r=t.target,s=r.closest("a");s&&s instanceof HTMLAnchorElement&&p("Hyperlink clicked: ",s.href),r.id==="search-button"&&p("Search button clicked: "+(i.value||"").trim())});document.addEventListener("DOMContentLoaded",()=>{const t="PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI";let r=!1;const s=new MutationObserver(()=>{const o=document.getElementById(t);if(o){let n=Array.from(o.querySelectorAll("span")).find(a=>{const e=a.textContent?.trim()||"",u=!isNaN(parseFloat(e)),g=window.getComputedStyle(a).fontSize;return u&&parseFloat(g)>=60});if(n){console.log("PurpleAir Pm2.5 span found");const a=parseFloat(n.innerHTML);if(!isNaN(a)&&a<50){const e=document.createElement("span");e.classList.add("purple-air-reading"),e.textContent=n.textContent,e.style.background="green",e.style.color="white",e.style.borderRadius="1000px",e.style.padding="0.5em 0.5em",o.innerHTML="",o.appendChild(e)}if(!isNaN(a)&&a>=50&&a<100){const e=document.createElement("span");e.classList.add("purple-air-reading"),e.textContent=n.textContent,e.style.background="yellow",e.style.color="white",e.style.borderRadius="1000px",e.style.padding="0.5em 0.5em",o.innerHTML="",o.appendChild(e)}if(!isNaN(a)&&a>=100){const e=document.createElement("span");e.classList.add("purple-air-reading"),e.textContent=n.textContent,e.style.background="red",e.style.color="white",e.style.borderRadius="1000px",e.style.padding="0.5em 0.5em",o.innerHTML="",o.appendChild(e)}r===!1&&(p(`Nearest PurpleAir sensor Pm2.5 value: ${a}`),r=!0)}}}),c=document.getElementById(t);c?s.observe(c,{childList:!0,subtree:!0}):console.error("PurpleAir widget not found.")});
