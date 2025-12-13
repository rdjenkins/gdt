// code for PurpleAir widget functionality
import { submitLog } from "./utils"
import airQualityLogo from '/PurpleAir-Cornwall-Map.png'


var PURPLE_AIR_CHOICE = "Grampound"
const PURPLEAIR_TRURO_ID = 'PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'
const PURPLEAIR_TRURO_URL = 'https://www.purpleair.com/pa.widget.js?key=DX82CA29U5Z4C6HO&module=US_EPA_AQI&conversion=C0&average=10&layer=US_EPA_AQI&container=PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'
const PURPLEAIR_GRAMPOUND_ID = 'PurpleAirWidget_288300_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'
const PURPLEAIR_GRAMPOUND_URL = 'https://www.purpleair.com/pa.widget.js?key=GK7Z257AJL4IWPJC&module=US_EPA_AQI&conversion=C0&average=10&layer=US_EPA_AQI&container=PurpleAirWidget_288300_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI'
if (PURPLE_AIR_CHOICE === "Grampound") {
    var NEAREST_PURPLEAIR_SENSOR_WIDGET = `<div id='` + PURPLEAIR_GRAMPOUND_ID + `'>Loading nearest sensor ...</div>`
    var NEAREST_PURPLEAIR_SENSOR_WIDGET_ID = PURPLEAIR_GRAMPOUND_ID
    var NEAREST_PURPLEAIR_SENSOR_URL = PURPLEAIR_GRAMPOUND_URL
} else {
    var NEAREST_PURPLEAIR_SENSOR_WIDGET = `<div id='` + PURPLEAIR_TRURO_ID + `'>Loading nearest sensor ...</div>`
    var NEAREST_PURPLEAIR_SENSOR_WIDGET_ID = PURPLEAIR_TRURO_ID
    var NEAREST_PURPLEAIR_SENSOR_URL = PURPLEAIR_TRURO_URL
}

function purpleAirSensorWidget() {
    return NEAREST_PURPLEAIR_SENSOR_WIDGET
}

export function showPurpleAir() {
    return `
    <a href="https://map.purpleair.com/air-quality-standards-us-epa-aqi?opt=%2F1%2Flp%2Fa10%2Fp604800%2FcC0#8.63/50.2076/-5.023" target="_blank" class="flex-item">
        <img src="${airQualityLogo}" class="logo" alt="Air Quality, PurpleAir logo" />
        <p>${purpleAirSensorWidget()}</p>
        <p>Air quality in Cornwall.</p>
    </a>
    `
}

// Append the PurpleAir script to the document body after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.id = NEAREST_PURPLEAIR_SENSOR_WIDGET_ID + '_script'
    script.src = NEAREST_PURPLEAIR_SENSOR_URL;
    document.body.appendChild(script);
});

document.addEventListener('DOMContentLoaded', () => {
    //const targetId = 'PurpleAirWidget_262781_module_US_EPA_AQI_conversion_C0_average_10_layer_US_EPA_AQI';
    const targetId = NEAREST_PURPLEAIR_SENSOR_WIDGET_ID;
    let sent = false;
    const observer = new MutationObserver(() => {
        const widgetDiv = document.getElementById(targetId);
        if (widgetDiv) {
            // Try to find the span by its text content and approximate style, since mobile may render differently
            let span = Array.from(widgetDiv.querySelectorAll('span')).find(s => {
                const text = s.textContent?.trim() || '';
                // Check if the text is a number and the font size is large
                const isNumber = !isNaN(parseFloat(text));
                const fontSize = window.getComputedStyle(s).fontSize;
                return isNumber && parseFloat(fontSize) >= 50;
            });
            if (span) {
                console.log('PurpleAir Pm2.5 span found');
                const pmValue = parseFloat(span.innerHTML);
                if (!isNaN(pmValue) && pmValue < 50) {
                    // Create a new span element
                    const newSpan = document.createElement('span');
                    newSpan.classList.add('purple-air-reading');
                    newSpan.textContent = span.textContent;
                    newSpan.style.background = 'green';
                    newSpan.style.color = 'white';
                    newSpan.style.borderRadius = '1000px';
                    newSpan.style.padding = '0.5em 0.5em';
                    widgetDiv.innerHTML = '';
                    widgetDiv.appendChild(newSpan);
                }
                if (!isNaN(pmValue) && pmValue >= 50 && pmValue < 100) {
                    // Create a new span element
                    const newSpan = document.createElement('span');
                    newSpan.classList.add('purple-air-reading');
                    newSpan.textContent = span.textContent;
                    newSpan.style.background = 'yellow';
                    newSpan.style.color = 'black';
                    newSpan.style.borderRadius = '1000px';
                    newSpan.style.padding = '0.5em 0.5em';
                    widgetDiv.innerHTML = '';
                    widgetDiv.appendChild(newSpan);
                }
                if (!isNaN(pmValue) && pmValue >= 100) {
                    // Create a new span element
                    const newSpan = document.createElement('span');
                    newSpan.classList.add('purple-air-reading');
                    newSpan.textContent = span.textContent;
                    newSpan.style.background = 'red';
                    newSpan.style.color = 'white';
                    newSpan.style.borderRadius = '1000px';
                    newSpan.style.padding = '0.5em 0.5em';
                    widgetDiv.innerHTML = '';
                    widgetDiv.appendChild(newSpan);
                }
                if (sent === false) { // only send once
                    submitLog(`Nearest PurpleAir sensor Pm2.5 value: ${pmValue}`);
                    sent = true;
                }
                //observer.disconnect();
            } else {
                // This below doesn't work if the Purple Air is delayed slightly.
                //widgetDiv.innerHTML = "<button>Visit Purple Air Map</button>"
                //                observer.disconnect() // TODO how would we then try another one?
                //if (document.getElementById(NEAREST_PURPLEAIR_SENSOR_WIDGET_ID + '_script')) {
                //    document.getElementById(NEAREST_PURPLEAIR_SENSOR_WIDGET_ID + '_script')?.remove
                //}
                // TODO also the PurpleAir script just keeps trying and changing this area of HTML
                //submitLog(`PurpleAir response does not show an obvious Pm2.5 figure`)
            }
        }
    });

    const widgetDiv = document.getElementById(targetId);
    if (widgetDiv) {
        observer.observe(widgetDiv, { childList: true, subtree: true });
    } else {
        console.error(`PurpleAir widget not found.`);
    }
});