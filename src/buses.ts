import busIcon from '/ISO_7001_PI_TF_006.svg' // Original from https://commons.wikimedia.org/wiki/File:ISO_7001_PI_TF_006.svg
import { addChoiceModalLink } from './utils'

let firstBusTruroUrl = "https://www.firstbus.co.uk/cornwall/plan-journey/journey-planner/#/results?fromAddress=Grampound,%20Truro,%20UK&fromLat=50.2992589&fromLng=-4.8984499&fromPlaceId=ChIJaavkWhhra0gR-WQ7KozZobc&toAddress=Truro,%20UK&toLat=50.263195&toLng=-5.051041&toPlaceId=ChIJdRpa1XwQa0gRtAcdle9HY2E"
let firstBusStAustellUrl = "https://www.firstbus.co.uk/cornwall/plan-journey/journey-planner/#/results?fromAddress=Grampound, Truro, UK&fromLat=50.2992589&fromLng=-4.8984499&fromPlaceId=ChIJaavkWhhra0gR-WQ7KozZobc&toAddress=St Austell, Saint Austell, UK&toLat=50.3403779&toLng=-4.7834252&toPlaceId=ChIJYwb4Jy1Aa0gRiCTxrSBmq2c"
let travelineTruroUrl = "https://nationaljourneyplanner.travelinesw.com/swe/trip?formik=destination%3D30004840%26mtcb0%3Dfalse%26mtcb9%3Dfalse%26origin%3D30006418&lng=en&trip=multiModalitySelected%3Dpt"
let travelineStAustellUrl = "https://nationaljourneyplanner.travelinesw.com/swe/trip?formik=destination%3D30004707%26mtcb0%3Dfalse%26mtcb9%3Dfalse%26origin%3D30006418&lng=en&trip=multiModalitySelected%3Dpt"
let tfcTruroUrl = 'https://www.transportforcornwall.co.uk/directions?origin%5Bname%5D=Grampound&origin%5Blocation%5D%5Blat%5D=50.29898&origin%5Blocation%5D%5Blon%5D=-4.900275&destination%5Bname%5D=Truro&destination%5Blocation%5D%5Blat%5D=50.263317&destination%5Blocation%5D%5Blon%5D=-5.051811&time%5Bwhen%5D=now'
let tfcStAustellUrl = 'https://www.transportforcornwall.co.uk/directions?origin%5Bname%5D=Grampound&origin%5Blocation%5D%5Blat%5D=50.29898&origin%5Blocation%5D%5Blon%5D=-4.900275&destination%5Bname%5D=St+Austell&destination%5Blocation%5D%5Blat%5D=50.33814&destination%5Blocation%5D%5Blon%5D=-4.794184&time%5Bwhen%5D=now'


export function showBuses() {
    return `
        <li class="flex-item">
        <img src="${busIcon}" alt="bus icon" class="icon"><br>
        <div style="margin-top:1em;">
            <div id="bus-links" style="margin-top:0.5em;">
                <a id='bus-link-truro' href="#" target="_blank"><button>To Truro</button></a>
                <a id='bus-link-st-austell' href="#" target="_blank"><button>To St Austell</button></a>
            </div>
            <p>Buses from Grampound.</p>
        </div>
        </li>
    `
}

addChoiceModalLink('bus-link-truro', 'Bus times to Truro', ([
    { text: 'Transport for Cornwall', url: tfcTruroUrl },
    { text: 'First Bus', url: firstBusTruroUrl },
    { text: 'Traveline SW', url: travelineTruroUrl }
]));

addChoiceModalLink('bus-link-st-austell', 'Bus times to St Austell', [
    { text: 'Transport for Cornwall', url: tfcStAustellUrl },
    { text: 'First Bus', url: firstBusStAustellUrl },
    { text: 'Traveline SW', url: travelineStAustellUrl }
]);

