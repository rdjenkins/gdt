import hikerIcon from '/hiker.svg'
import { addChoiceModalLink } from './utils'

export function showWalks() {
    return `
    <li class="flex-item">
    <img src="${hikerIcon}" alt="hiker icon" class="icon"><br>
    <a id="fal-footpath" href="#" target="_blank">
        <button>Fal (40 mins)</button>
    </a>
    <a id="creed-circuit" href="#" target="_blank">
        <button>Creed Circuit (1 hr)</button>
    </a>
    <a id="trenowth" href="#" target="_blank">
        <button>Trenowth (1½ hrs)</button>
    </a>
    <p>Circular walks.</p>
    </li>
    `
}

addChoiceModalLink('creed-circuit')

addChoiceModalLink('fal-footpath')

addChoiceModalLink('trenowth')