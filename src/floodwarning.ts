import { submitLog } from './utils'

const FLOOD_TARGET_AREA_URL = 'https://check-for-flooding.service.gov.uk/target-area/114WAFT1W02A00'
const FLOOD_INFO_ID = 'flood-info' // the id of the HTML element where the flood info will go.
const FLOOD_WARNING_BUTTON_ID = 'flood-warning-button'

export function showFloodWarning() {
    return `
    <a href="${FLOOD_TARGET_AREA_URL}" target="_blank" class="flex-item">
        <button id="${FLOOD_WARNING_BUTTON_ID}">Go to gov.UK for flood warnings for Grampound.</button>
        <p id="${FLOOD_INFO_ID}">
            River data loading...
        </p>
    </a>
    `
}

// Fetch and append flood gauge widget
// repack sets a little warning html if there is a warning
(async () => {
    try {
        const response = await fetch('https://photos.grampound.org.uk/repack.php?id=EAfloodgaugeWidget');
        const html = await response.text();
        const floodButton = document.getElementById(FLOOD_WARNING_BUTTON_ID);
        if (floodButton && html.trim() !== '') {
            floodButton.innerHTML = 'Check for Gov.uk flood alerts<br><br>' + html;
        }
        const textOnly = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        if (textOnly === '') {
            submitLog('EA flood gauge: ', 'none');
        } else {
            submitLog('EA flood gauge: ', textOnly);
        }
    } catch (error) {
        console.error('Error fetching flood gauge widget:', error);
    }
})();

(async () => {
    // getting the EA API via repack means it is fetched and cached nicely
    const TrenowthURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=EAriverlevel&sensor=trenowth'
    const TregonyURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=EAriverlevel&sensor=tregony'
    const TrenowthResponse = await fetch(TrenowthURL) // TODO make these two parallel
    const TrenowthRiverLevel = await TrenowthResponse.json()
    const TregonythResponse = await fetch(TregonyURL)
    const TregonyRiverLevel = await TregonythResponse.json()
    const floodInfo = document.getElementById(FLOOD_INFO_ID);

    var output = 'River Fal height'
    var valid = false

    if (TrenowthRiverLevel && typeof TrenowthRiverLevel.riverHeight === 'number' && typeof TrenowthRiverLevel.riverHeightHigh === 'number') {
        if (TrenowthRiverLevel.riverHeight >= TrenowthRiverLevel.riverHeightHigh) {
            output = output + '<br><span style="color:red">Trenowth ' + TrenowthRiverLevel.riverHeight + ' m (HIGH)</span>'
        } else {
            output = output + '<br>Trenowth ' + TrenowthRiverLevel.riverHeight + ' m'
        }
        valid = true
    }
    if (TregonyRiverLevel && typeof TregonyRiverLevel.riverHeight === 'number' && typeof TrenowthRiverLevel.riverHeightHigh === 'number') {
        if (TrenowthRiverLevel.riverHeight >= TregonyRiverLevel.riverHeightHigh) {
            output = output + '<br><span style="color:red">Tregony ' + TregonyRiverLevel.riverHeight + ' m (HIGH)</span>'
        } else {
            output = output + '<br>Tregony ' + TregonyRiverLevel.riverHeight + ' m'
        }
        valid = true
    }

    const textOnly = output.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    if (valid) {
        if (floodInfo) {
            floodInfo.innerHTML = output
            submitLog(textOnly);
        } else {
            console.log(output);
        }
    } else {
        if (floodInfo) {
            floodInfo.innerHTML = 'River level data not available'
            submitLog(`invalid river level data`);
        }
        console.error('Invalid river level data');
    }
})();