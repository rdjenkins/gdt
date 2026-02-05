import trafficLogo from '/traffic.svg'
import { addChoiceModalLink, showToast, submitLog } from "./utils"

const TRAFFIC_INCIDENCES_ID = 'traffic-incidents' // id of traffic incidents HTML element
// returns '', 'error', '0' (no incidents) or '1' (incidents found)
const policeURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=trafficCheck'

export function showTraffic() {
    return `
    <a href="#" id="traffic-links" target="_blank" class="flex-item">
            <img src="${trafficLogo}" class="logo" alt="Sewage discharges logo" />
        <p>Traffic updates for Cornwall</p>
        <div id="${TRAFFIC_INCIDENCES_ID}"></div>
    </a>
    `
}

async function getTrafficIncidents() {
    try {
        const response = await fetch(policeURL)
        .catch((reason) => {
            console.log('No response from police traffic URL: ' + reason)
        })
        if (!response) {
            console.log('No traffic alert data - aborting')
            return ""
        }
        const html = await response.text();
        console.log('fetched police traffic updates');

        if (html === '' || html.includes("error") ) {
            submitLog('Error fetching police traffic updates')
            return
        }
        if (html === '0') {
            console.log('No police traffic updates found')
            const incidentDiv = document.getElementById(TRAFFIC_INCIDENCES_ID);
            if (incidentDiv) {
                incidentDiv.innerHTML = '<span style="color:green;font-weight:bold;">No traffic incidents</span>'
            }
        }
        if (html === '1') {
            const incidentDiv = document.getElementById(TRAFFIC_INCIDENCES_ID);
            if (incidentDiv) {
                incidentDiv.innerHTML = '<span style="color:orange;font-weight:bold;">⚠️ Traffic incidents</span>'
            }
            showToast('⚠️ Police traffic incidents found')
        }
    } catch (error) {
        console.error('Error fetching police traffic updates:', error);
    }
};

(async () => {
    getTrafficIncidents()
})();


addChoiceModalLink('traffic-links');