import { showToast, submitLog } from './utils'

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

// draw a river column datadashboard showing the proportion it is between low and high water
function colMaker(fillHeight = 50, width = 8, height = 22) {
    fillHeight = Math.round((height - 2) * (fillHeight / 100))
    return `
    <svg width="${width}px" height = "${height}px" xmlns = "http://www.w3.org/2000/svg" >
        <rect x="0" y="0" width="${width}" height="${height}" fill="#e0e0e0" stroke="#000" stroke-width="1" />
        <rect x="1" y="${height - fillHeight - 1}" width = "${width - 2}" height="${fillHeight}" fill="#385E8B" />
    </svg>
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
            showToast('Flood warning')
        }
    } catch (error) {
        console.error('Error fetching flood gauge widget:', error);
    }
})();

(async () => {
    // getting the EA API via repack means it is fetched and cached nicely
    const TrenowthURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=EAriverlevel&sensor=trenowth'
    const TregonyURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=EAriverlevel&sensor=tregony'
    let TrenowthRiverLevel, TregonyRiverLevel;
    try {
        const [TrenowthResponse, TregonyResponse] = await Promise.all([
            fetch(TrenowthURL),
            fetch(TregonyURL)
        ]);
        TrenowthRiverLevel = await TrenowthResponse.json();
        TregonyRiverLevel = await TregonyResponse.json();
    } catch (error) {
        console.error('Error fetching river level data:', error);
    }

    const floodInfo = document.getElementById(FLOOD_INFO_ID);

    var output = 'River Fal height'
    var valid = false

    if (TrenowthRiverLevel && typeof TrenowthRiverLevel.riverHeight === 'number' && typeof TrenowthRiverLevel.riverHeightHigh === 'number' && typeof TrenowthRiverLevel.riverHeightLow === 'number') {
        if (TrenowthRiverLevel.riverHeight >= TrenowthRiverLevel.riverHeightHigh) {
            output = output + '<br><span style="color:red">Trenowth ' + TrenowthRiverLevel.riverHeight + ' m (HIGH)</span>'
            showToast('River Fal level HIGH at Trenowth')
        } else if (TrenowthRiverLevel.riverHeight <= TrenowthRiverLevel.riverHeightLow) {
            output = output + '<br><span style="color:red">Trenowth ' + TrenowthRiverLevel.riverHeight + ' m (LOW)</span>'
            showToast('River Fal level LOW at Trenowth')
        } else {
            var range = (TrenowthRiverLevel.riverHeightHigh - TrenowthRiverLevel.riverHeightLow)
            if (range === 0) { range = 0.0001 }
            var aboveLow = (TrenowthRiverLevel.riverHeight - TrenowthRiverLevel.riverHeightLow)
            var TrenowthProportion = Math.round(100 * (aboveLow / range))
            output = output + '<br>Trenowth ' + TrenowthRiverLevel.riverHeight.toFixed(2) + ' m' + colMaker(TrenowthProportion)
        }
        valid = true
    }
    if (TregonyRiverLevel && typeof TregonyRiverLevel.riverHeight === 'number' && typeof TregonyRiverLevel.riverHeightHigh === 'number' && typeof TregonyRiverLevel.riverHeightLow === 'number') {
        if (TregonyRiverLevel.riverHeight >= TregonyRiverLevel.riverHeightHigh) {
            output = output + '<br><span style="color:red">Tregony ' + TregonyRiverLevel.riverHeight + ' m (HIGH)</span>'
            showToast('River Fal level HIGH at Tregony')
        } else if (TregonyRiverLevel.riverHeight <= TregonyRiverLevel.riverHeightLow) {
            output = output + '<br><span style="color:red">Tregony ' + TregonyRiverLevel.riverHeight + ' m (LOW)</span>'
            showToast('River Fal level LOW at Tregony')
        } else {
            var range = (TregonyRiverLevel.riverHeightHigh - TregonyRiverLevel.riverHeightLow)
            if (range === 0) { range = 0.0001 }
            var aboveLow = (TregonyRiverLevel.riverHeight - TregonyRiverLevel.riverHeightLow)
            var TregonyProportion = Math.round(100 * (aboveLow / range))
            output = output + '<br>Tregony ' + TregonyRiverLevel.riverHeight.toFixed(2) + ' m' + colMaker(TregonyProportion)
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