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

addChoiceModalLink('sewage-links', 'Sewage map', ([
    { text: 'Floodmapper', url: 'https://www.floodmapper.co.uk/data-explorer/search-sewage-report/1bfb1dc2-aaf8-11ee-baa2-0242ac140003/Grampound' },
    { text: 'SWW overflow map', url: 'https://www.southwestwater.co.uk/environment/rivers-and-bathing-waters/waterfitlive/storm-overflow-map' }
]));