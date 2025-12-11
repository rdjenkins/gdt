import hikerIcon from '/hiker.svg'
import creedCircuitGpx from '/creed_circuit_avoiding_most_of_fore_street.gpx?url'
import falFootpathGpx from '/fal_footpath__barteliver_wood__bareliver_hill.gpx?url'
import trenowthWalkGpx from '/grampound_walk_pepo_trenowth.gpx?url'
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

addChoiceModalLink('creed-circuit', 'Creed Circuit Walk', ([
    { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/creed-circuit-avoiding-most-of-fore-street_955200#15/50.2940/-4.8909' },
    { text: 'Download GPX', url: creedCircuitGpx }
]));

addChoiceModalLink('fal-footpath', 'Fal Footpath Old Hill walk', ([
    { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/fal-footpath-barteliver-wood-bareliver-hill_1295709#16/50.2973/-4.9067' },
    { text: 'Download GPX', url: falFootpathGpx }
]));

addChoiceModalLink('trenowth', 'Trenowth walk', ([
    { text: 'View on Map', url: 'https://umap.openstreetmap.fr/en/map/grampound-walk-pepo-trenowth_947847#14/50.3122/-4.8960' },
    { text: 'Download GPX', url: trenowthWalkGpx }
]));