import { showToast } from "./utils";

async function fetchWaterQualityTrafficLight() {
    const response = await fetch('https://photos.grampound.org.uk/repack.php?id=grampoundwaterDOM')
    .catch((reason) => {
        console.log('No response from sewage traffic light URL: ' + reason)
    })
    if (!response) {
        console.log('No sewage traffic light - aborting')
        return ""
    }
    const TEXT = await response.text();
    return TEXT;
}

let waterQualityTrafficLightHTML = ""

export function waterQualityTrafficLight() {
    return `` // something empty to start with - then fill it up below if successful
}

// Fetch the water quality traffic light HTML and update the content
document.addEventListener('DOMContentLoaded', () => {
    fetchWaterQualityTrafficLight().then((html) => {
        waterQualityTrafficLightHTML = html;
        const waterQualityDiv = document.querySelector('#water-quality-traffic-light');
        if (waterQualityDiv) {
            waterQualityDiv.innerHTML = waterQualityTrafficLightHTML + '<div style="margin-left: 10px;">Get more detail on Floodmapper<br>or SWW ↗</div>';
            if (isRedAlert(waterQualityTrafficLightHTML)) {
                showToast('⚠️ Sewage alert in River Fal')
            }
        }
    });
});

function isRedAlert(waterQualityTrafficLightHTML: string): boolean {
    // Find the first red div using regular expression
    const regex = /<div[^>]*style="[^"]*background-color:red[^"]*opacity:(\d*\.?\d*)[^"]*"/;
    const match = waterQualityTrafficLightHTML.match(regex);

    if (match && match[1] !== undefined) {
        // Extract opacity value
        const opacity = parseFloat(match[1]);
        
        // Check if opacity is 1
        return opacity === 1;
    }

    return false; // Return false if a red div is not found or opacity is not set
}
