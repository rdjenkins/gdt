import { fetchWeatherApi } from 'openmeteo'
import { submitLog } from './utils'

const FLOOD_INFO_ID = 'flood-info' // the id of the HTML element where the flood info will go.

export function showFloodWarning() {
    return `
        <button id="flood-warning-button">Go to gov.UK for flood warnings for Grampound.</button>
        <p id="${FLOOD_INFO_ID}">
            Flood data loading...
        </p>`
}

// Fetch and append flood gauge widget
// repack sets a little warning html if there is a warning
(async () => {
    try {
        const response = await fetch('https://photos.grampound.org.uk/repack.php?id=EAfloodgaugeWidget');
        const html = await response.text();
        const floodButton = document.getElementById('flood-warning-button');
        if (floodButton && html.trim() !== '') {
            floodButton.innerHTML = 'Check for Gov.uk flood alerts<br><br>' + html;
            const textOnly = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            submitLog('EA flood gauge: ', textOnly);
        }
    } catch (error) {
        console.error('Error fetching flood gauge widget:', error);
    }
})();

// Fetch flood data from Open-Meteo
// https://flood-api.open-meteo.com/v1/flood?latitude=50.299266&longitude=-4.903521&daily=river_discharge_mean&timezone=Europe%2FLondon&forecast_days=1
(async () => {
    const params = {
        "latitude": 50.299266,
        "longitude": -4.903521,
        "daily": "river_discharge_mean",
        "forecast_days": 1,
    };
    const url = "https://flood-api.open-meteo.com/v1/flood";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const floodData = {
        daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            river_discharge_mean: daily.variables(0)!.valuesArray(),
        },
    };

    // 'floodData' now contains a simple structure with arrays with datetime and weather data
    console.log("\nDaily river flow data GloFAS", floodData.daily)

    const floodInfo = document.getElementById(FLOOD_INFO_ID);
    if (floodInfo) {
        const nextFlow = (floodData.daily.river_discharge_mean) ? floodData.daily.river_discharge_mean[0] : -1;
        // thresholds based on data from https://nrfa.ceh.ac.uk/data/search for Fal at Trenowth and Tregony
        const flowDescription = (nextFlow === -1) ? 'No data' :
            (nextFlow < 5) ? 'Low flow' :
                (nextFlow < 10) ? 'Medium flow' :
                    (nextFlow < 15) ? 'High flow' : 'Very high flow';
        console.log(`\nNext river flow mean: ${nextFlow} m³/s (${flowDescription})`);
        submitLog(`River flow: ${nextFlow} m³/s (${flowDescription})`);
        floodInfo.innerHTML = (nextFlow === -1) ? 'No river flow data' :
            `Current estimated river flow:<br>${nextFlow.toFixed(2)} m³/s<br>
    (${flowDescription})`;
    }
})();