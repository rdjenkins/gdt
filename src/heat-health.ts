import { addChoiceModalLink, showToast } from "./utils"

const HEAT_HEALTH_ALERT_REPACK_URL = 'https://photos.grampound-pc.gov.uk/repack.php?id=heat-health-alert-sw'
const HEAT_HEALTH_ALERT_WIDGET_ID = 'heat-health-alert-links'
const HEAT_HEALTH_ALERT_DIV = 'heat-health-alert-div'

export function showHeatHealthAlert() {
    return `
    <a href="#" id="${HEAT_HEALTH_ALERT_WIDGET_ID}" target="_blank" class="flex-item">
        <button>Visit UKHSA Heat Health</button>
        <br><br>
        <div id="${HEAT_HEALTH_ALERT_DIV}">Heat Health in the South West</div>
    </a>
    `
}

async function getHeatHealthAlert() {
    try {
        const response = await fetch(HEAT_HEALTH_ALERT_REPACK_URL)
        .catch((reason) => {
            console.log('No response from heat health alert URL: ' + reason)
        })
        if (!response) {
            console.log('No heat health alert data - aborting')
            return ""
        }
        const json = await response.json();
        console.log('fetched heat health alert', json);

        if (json === '' || json.error) {
            console.log('No heat health alert data found')
            return
        }
        if (json.alertLevel) {
            console.log("First word of alert " + json.alertLevel.toLowerCase().split(' ')[0]);
            const firstWord = json.alertLevel.toLowerCase().split(' ')[0];
            // 'amber' doesn't exist as a HTML colour so using orange instead.
            const alertColor = firstWord === 'amber' ? 'orange' : firstWord === 'yellow' ? 'orange' : 'red';
            const alertDiv = document.getElementById(HEAT_HEALTH_ALERT_DIV);
            if (alertDiv) {
                alertDiv.innerHTML = `<span style="color:${alertColor};font-weight:bold;">${json.alertLevel}</span><br>${json.alertMessage ? json.alertMessage : ''}`
            }
            // 'orange' or 'red' toast looks awful.
            showToast('⚠️ Heat Health Alert', HEAT_HEALTH_ALERT_WIDGET_ID, alertColor === 'red' ? 'salmon' : 'yellow')
        } else {
            const alertDiv = document.getElementById(HEAT_HEALTH_ALERT_DIV);
            if (alertDiv) {
                alertDiv.innerHTML = '<span style="color:green;font-weight:bold;">No heat health alert</span>'
            }
        }
    } catch (error) {
        console.error('Error fetching heat health alert:', error)
    }
}

(async () => {
    getHeatHealthAlert()
})();

addChoiceModalLink(HEAT_HEALTH_ALERT_WIDGET_ID);