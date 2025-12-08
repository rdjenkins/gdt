async function fetchWaterQualityTrafficLight() {
    const response = await fetch('https://photos.grampound.org.uk/repack.php?id=grampoundwaterDOM');
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
            waterQualityDiv.innerHTML = waterQualityTrafficLightHTML + '<div>Get more detail on Floodmapper<br>or SWW ↗</div>';
        }
    });
});