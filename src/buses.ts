import busIcon from '/ISO_7001_PI_TF_006.svg' // Original from https://commons.wikimedia.org/wiki/File:ISO_7001_PI_TF_006.svg
import { addChoiceModalLink } from './utils'

export function showBuses() {
    return `
        <li class="flex-item">
        <img src="${busIcon}" alt="bus icon" class="icon"><br>
        <div style="margin-top:1em;">
            <div id="bus-links" style="margin-top:0.5em;">
                <a id='bus-link-truro' style="widgetlink" href="#" target="_blank"><button>To Truro</button></a>
                <a id='bus-link-st-austell' style="widgetlink" href="#" target="_blank"><button>To St Austell</button></a>
            </div>
            <p>Buses from Grampound.</p>
        </div>
        </li>
    `
}

addChoiceModalLink('bus-link-truro');

addChoiceModalLink('bus-link-st-austell');

