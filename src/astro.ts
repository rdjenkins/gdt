import { addChoiceModalLink } from "./utils"

const astroURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=astro&number=3' // 5 days
const auroraURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=aurora'
const ASTRO_EVENTS = 'astroevents'
const AURORA_STATUS = 'aurorastatus'


export function showAstro() {
    return `
    <a href="#" id="astro-links" target="_blank" class="flex-item">
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
            } 
            if (aurora.statusId === 'red') {
                auroraText = '<b>RED, VISIBLE</b>';
                auroraTextColour = 'red'
                auroraBackgroundColour = 'ivory'
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


window.onload = () => {
    getAlmanacEvents()
    getAuroraEvents()
};

addChoiceModalLink('astro-links', 'Aurora and Astronomy links', ([
    { text: 'Aurora Activity', url: 'https://aurorawatch.lancs.ac.uk/' },
    { text: 'Eclipses', url: 'https://www.timeanddate.com/eclipse/in/@2648227' },
    { text: 'Night Sky', url: 'https://www.timeanddate.com/astronomy/night/@2648227'},
    { text: 'Greenwich Observatory', url: 'https://www.rmg.co.uk/stories/space-astronomy/astronomy'}
]));