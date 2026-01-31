import trafficLogo from '/traffic.svg'
import { addChoiceModalLink, showToast, submitLog } from "./utils"

const TRAFFIC_INCIDENCES_ID = 'traffic-incidents' // id of traffic incidents HTML element
// returns '', 'error', '0' (no incidents) or '1' (incidents found)
const policeURL = 'https://photos.grampound-pc.gov.uk/repack.php?id=trafficCheck'

export function showTraffic() {
    return `
    <a href="#" id="traffic-links" target="_blank" class="flex-item">
            <img src="${trafficLogo}" class="logo" alt="Sewage discharges logo" />
        <p>Traffic updates for Cornwall</p>
        <div id="${TRAFFIC_INCIDENCES_ID}"></div>
    </a>
    `
}

async function getTrafficIncidents() {
    try {
        const response = await fetch(policeURL)
        .catch((reason) => {
            console.log('No response from police traffic URL: ' + reason)
        })
        if (!response) {
            console.log('No traffic alert data - aborting')
            return ""
        }
        const html = await response.text();
        console.log('fetched police traffic updates');

        if (html === '' || html.includes("error") ) {
            submitLog('Error fetching police traffic updates')
            return
        }
        if (html === '0') {
            console.log('No police traffic updates found')
            const incidentDiv = document.getElementById(TRAFFIC_INCIDENCES_ID);
            if (incidentDiv) {
                incidentDiv.innerHTML = '<span style="color:green;font-weight:bold;">No traffic incidents</span>'
            }
        }
        if (html === '1') {
            const incidentDiv = document.getElementById(TRAFFIC_INCIDENCES_ID);
            if (incidentDiv) {
                incidentDiv.innerHTML = '<span style="color:orange;font-weight:bold;">⚠️ Traffic incidents</span>'
            }
            showToast('⚠️ Police traffic incidents found')
        }
    } catch (error) {
        console.error('Error fetching police traffic updates:', error);
    }
};

(async () => {
    getTrafficIncidents()
})();


addChoiceModalLink('traffic-links', 'Traffic updates', ([
    { text: 'Police incidents', url: 'https://news.devon-cornwall.police.uk/traffic-watch/' },
    { text: 'Planned roadworks & events', url: 'https://api-gb.one.network/embedded/?lon=-4.90025&lat=50.29854&zoom=13&options={%22organisationID%22%3A1025%2C%22embedded%22%3Atrue%2C%22data%22%3A{%22layersActive%22%3A[%22INCIDENTS_LIVE_INCIDENT%22%2C%22INCIDENTS_LIVE_ACCIDENT%22%2C%22INCIDENTS_LIVE_TRAFFIC_CONGESTION%22%2C%22INCIDENTS_LIVE_HEALTH_EMERGENCY%22%2C%22INCIDENTS_LIVE_ROADCLOSURE%22%2C%22INCIDENTS_LIVE_LANECLOSURE%22%2C%22INCIDENTS_LIVE_HGVCLOSURE%22%2C%22INCIDENTS_LIVE_INFRASTRUCTURE_ISSUE%22%2C%22TM_LAYER_ROADCLOSURE_LIVE%22%2C%22TM_LAYER_DIVERSIONROUTE_LIVE%22%2C%22TM_LAYER_HGVDIVERSIONROUTE_LIVE%22%2C%22TM_LAYER_TEMPORARYONEWAY_LIVE%22%2C%22TM_LAYER_BRIDGECLOSURE_LIVE%22%2C%22TM_LAYER_LANECLOSURE_LIVE%22%2C%22TM_LAYER_ROADAHEADCLOSED_LIVE%22%2C%22TM_LAYER_ACCESS_ONLY_LIVE%22%2C%22TM_LAYER_GRITTING_LIVE%22%2C%22TM_LAYER_WIDENED_FOOTPATH_LIVE%22%2C%22TM_LAYER_FOOTWAYCLOSURE_LIVE%22%2C%22TM_LAYER_TOWAWAYZONE_LIVE%22%2C%22TM_LAYER_CLEARWAY_LIVE%22%2C%22TM_LAYER_NOUTURN_LIVE%22%2C%22TM_LAYER_NOLEFTTURN_LIVE%22%2C%22TM_LAYER_NORIGHTTURN_LIVE%22%2C%22TM_LAYER_NOVEHICLEACCESS_LIVE%22%2C%22TM_LAYER_REVERSALONEWAY_LIVE%22%2C%22TM_LAYER_TEMPORARYSPEEDLIMIT_LIVE%22%2C%22TM_LAYER_HEIGHTRESTRICTION_LIVE%22%2C%22TM_LAYER_WEIGHTRESTRICTION_LIVE%22%2C%22TM_LAYER_WIDTHRESTRICTION_LIVE%22%2C%22TM_LAYER_LENGTHRESTRICTION_LIVE%22%2C%22TM_LAYER_TEMPPARKINGRESTRICTION_LIVE%22%2C%22TM_LAYER_SUSPENSION_BUSWAY_LIVE%22%2C%22TM_LAYER_SUSPENSIONONEWAY_LIVE%22%2C%22TM_LAYER_SUSPENSIONPARKINGRESTRICTION_LIVE%22%2C%22TM_LAYER_SUSPENSIONWEIGHTRESTRICTION_LIVE%22%2C%22TM_LAYER_PREFERRED_ACCESS_LIVE%22%2C%22TM_LAYER_EMERGENCY_ACCESS_ROUTE_LIVE%22%2C%22TM_LAYER_PEDESTRIAN_ZONE_LIVE%22%2C%22TM_LAYER_CLOSURE_CROSSING_LIVE%22%2C%22TM_LAYER_CYCLE_LANE_LIVE%22%2C%22TM_LAYER_TWOWAYSIGNALS_LIVE%22%2C%22TM_LAYER_MULTIWAYSIGNALS_LIVE%22%2C%22TM_LAYER_STOPANDGO_LIVE%22%2C%22TM_LAYER_GIVEANDTAKE_LIVE%22%2C%22TM_LAYER_PRIORITYSIGNS_LIVE%22%2C%22TM_LAYER_CONVOYWORKING_LIVE%22%2C%22TM_LAYER_WORKSSTOP_LIVE%22%2C%22ROADWORKS_CURRENT%22%2C%22TM_LAYER_ENTITY_AGRICULTURAL_SHOW_LIVE%22%2C%22TM_LAYER_ENTITY_AIR_SHOW_LIVE%22%2C%22TM_LAYER_ENTITY_CARNIVAL_PARADE_STREET_LIVE%22%2C%22TM_LAYER_ENTITY_CHRISTMAS_EVENT_LIVE%22%2C%22TM_LAYER_ENTITY_CRUISE_SHIP_LIVE%22%2C%22TM_LAYER_ENTITY_CYCLING_LIVE%22%2C%22TM_LAYER_ENTITY_ENTERTAINMENT_EVENT_LIVE%22%2C%22TM_LAYER_ENTITY_FESTIVAL_LIVE%22%2C%22TM_LAYER_ENTITY_FILMING_LIVE%22%2C%22TM_LAYER_ENTITY_FOOTBALL_LIVE%22%2C%22TM_LAYER_ENTITY_FUNERAL_LIVE%22%2C%22TM_LAYER_ENTITY_HORSE_RACING_LIVE%22%2C%22TM_LAYER_ENTITY_MARKET_LIVE%22%2C%22TM_LAYER_ENTITY_MOTOR_SPORT_EVENT_LIVE%22%2C%22TM_LAYER_ENTITY_POLLING_STATION_LIVE%22%2C%22TM_LAYER_ENTITY_REMEMBRANCE_PARADE_LIVE%22%2C%22TM_LAYER_ENTITY_ROYAL_EVENT_LIVE%22%2C%22TM_LAYER_ENTITY_RUGBY_LIVE%22%2C%22TM_LAYER_ENTITY_RUNNING_LIVE%22%2C%22TM_LAYER_ENTITY_SPORT_EVENT_LIVE%22%2C%22TM_LAYER_ENTITY_OTHER_PUBLIC_EVENTS_LIVE%22]}%2C%22embedID%22%3A%22B9I9JDD9J9%22%2C%22system%22%3A{%22delayedLoad%22%3Afalse%2C%22historicWorksEnabled%22%3Afalse%2C%22tileServer%22%3A%22%24{region}-prd-%24{source}%24{randomizer}.one.network%22}%2C%22dateRange%22%3A%22today%22}' },
    { text: 'Google traffic', url: 'https://www.google.com/maps/@50.3053698,-4.9023496,12z/data=!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D' }
]));