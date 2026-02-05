import { waterQualityTrafficLight } from "./water"
import waterQualityLogo from '/Water-quality-sewage.png'
import { addChoiceModalLink } from "./utils"

export function showSewage() {
    return `
    <a href="#" id="sewage-links" target="_blank" class="flex-item">
        <div id="water-quality-traffic-light">
            ${waterQualityTrafficLight()}
            <img src="${waterQualityLogo}" class="logo" alt="Sewage discharges logo" />
        </div>
        <p>Water quality for the River Fal.</p>
    </a>
    `
}

addChoiceModalLink('sewage-links')