import { addChoiceModalLink, showToast } from "./utils"

const astroURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=astro&number=3' // 5 days
const auroraURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=aurora'
const ASTRO_EVENTS = 'astroevents'
const AURORA_STATUS = 'aurorastatus'
const ASTRO_WIDGET_ID = 'astro-links'


export function showAstro() {
    return `
    <a href="#" id="${ASTRO_WIDGET_ID}" target="_blank" class="flex-item">
        <button id="${AURORA_STATUS}">AuroraWatch</button>
        <p>Astronomy for Grampound</p>
        <div id="${ASTRO_EVENTS}"></div>
    </a>
    `
}

async function getAuroraEvents() {
    try {
        const response = await fetch(auroraURL)
        .catch((reason) => {
            console.log('No response from aurora URL: ' + reason)
        })
        if (!response) {
            console.log('No aurora data - aborting')
            return ""
        }
        const aurora = await response.json();
        console.log('fetched aurora data');
        
        let auroraText = '';
        let auroraTextColour = 'black'
        let auroraBackgroundColour = 'gray'
        if (aurora.statusId) {
            if (aurora.statusId === 'yellow') {
                auroraText = 'Yellow, Not visible';
                auroraTextColour = 'yellow'
                auroraBackgroundColour = 'grey'
            }
            if (aurora.statusId === 'green') {
                auroraText = 'Green, Not visible';
                auroraTextColour = 'green'
                auroraBackgroundColour = 'lightgrey'
            }
            if (aurora.statusId === 'amber') {
                auroraText = '<b>Amber, VISIBLE on camera<b>';
                auroraTextColour = 'orange'
                auroraBackgroundColour = 'ivory'
                showToast('Aurora alert: Amber, visible on camera', ASTRO_WIDGET_ID)
            } 
            if (aurora.statusId === 'red') {
                auroraText = '<b>RED, VISIBLE</b>';
                auroraTextColour = 'red'
                auroraBackgroundColour = 'ivory'
                showToast('Aurora alert: RED, visible', ASTRO_WIDGET_ID)
            }
            const auroraeventDiv = document.getElementById(AURORA_STATUS);
            if (auroraeventDiv) {
                auroraeventDiv.innerHTML = 'Aurora<br><div style="padding: 5px; border-radius: 5px; background-color: ' + auroraBackgroundColour + '; color: ' + auroraTextColour + '">' + auroraText + '</div>'
            }
        }
    } catch (error) {
        console.error('Error fetching aurora events:', error);
    }
};

async function getAlmanacEvents() {
    try {
        const response = await fetch(astroURL)
        .catch((reason) => {
            console.log('No response from astro URL: ' + reason)
        })
        if (!response) {
            console.log('No astro data - aborting')
            return ""
        }
        const astro = await response.json();
        console.log('fetched astro data: ' + astro.length + ' events');

        
        if (astro.length > 0) {
            const astroText = astro.join('<br>')
            const astroeventDiv = document.getElementById(ASTRO_EVENTS);
            if (astroeventDiv) {
                astroeventDiv.innerHTML = '<span style="font-size: small;">' + astroText + '</span>'
            }
        } else {
            const astroeventDiv = document.getElementById(ASTRO_EVENTS);
            if (astroeventDiv) {
                astroeventDiv.innerHTML = '<span style="font-size: small;">No events in the next few days. Check again later.</span>'
            }}
    } catch (error) {
        console.error('Error fetching astro events:', error);
    }
};


// An IIFE (Immediately Invoked Function Expression) is more reliable than window.onload inside a Vite app
(async () => {
    getAlmanacEvents()
    getAuroraEvents()
})();

addChoiceModalLink('astro-links')