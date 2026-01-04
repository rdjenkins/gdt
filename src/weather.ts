import { fetchWeatherApi } from 'openmeteo'
import wmoCodes from './wmo-codes.json' // local copies of images to avoid hotlinking
import { submitLog, formatDateWithSuffix } from './utils'
import { addChoiceModalLink, showToast } from './utils'

const WEATHER_INFO_ID = 'weather-info' // id of weather info HTML element
const WEATHER_WARNING_ID = 'weather-warning' // if any

export function showWeather() {
    return `
    <a href="#" id="weather-links" target="_blank" class="flex-item">
        <p id="${WEATHER_INFO_ID}">
            Weather (UK Met Office)
        </p>
        <span id="${WEATHER_WARNING_ID}"></span>
    </a>
    `
}

// Fetch weather data from Open-Meteo
// Example coordinates for Grampound: 50.2993°N, -4.9005°E
// Documentation: https://open-meteo.com/en/docs
// API starting code from: https://open-meteo.com/en/docs/ukmo-api?latitude=50.2993&longitude=-4.9005&timezone=Europe%2FLondon&hourly=&wind_speed_unit=ms&forecast_days=1&current=weather_code,temperature_2m,wind_speed_10m,rain
const params = {
    "latitude": 50.2993,
    "longitude": -4.9005,
    "models": "ukmo_seamless",
    "current": ["weather_code", "temperature_2m", "wind_speed_10m", "rain", "is_day"],
    "timezone": "Europe/London",
    "forecast_days": 1,
    "wind_speed_unit": "ms",
};
const forecasturl = "https://api.open-meteo.com/v1/forecast";
// Wrap the weather fetch and processing in an async IIFE to ensure it runs asynchronously
(async () => {
    const responses = await fetchWeatherApi(forecasturl, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

    const current = response.current()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            weather_code: current.variables(0)!.value(),
            temperature_2m: current.variables(1)!.value(),
            wind_speed_10m: current.variables(2)!.value(),
            rain: current.variables(3)!.value(),
            is_day: current.variables(4)!.value(),
        },
    };


    // Load WMO weather code descriptions from wmo-codes.json and display the appropriate description
    const weatherCode = weatherData.current.weather_code;
    let weather_code_description = '';
    let weather_code_image = '';
    let weather_code_image_background = '';

    if (wmoCodes && typeof weatherCode === 'number') {
        const codeEntry = Object.entries(wmoCodes).find(
            ([code]) => Number(code) === weatherCode
        );
        if (codeEntry) {
            const [, value] = codeEntry;
            if (weatherData.current.is_day === 1) {
                weather_code_description = value.day.description;
                weather_code_image = value.day.image;
                weather_code_image_background = 'lightblue';
            } else {
                weather_code_description = value.night.description;
                weather_code_image = value.night.image;
                weather_code_image_background = 'lightgray';
            }
        }
    }

    // 'weatherData' now contains a simple structure with arrays with datetime and weather data
    console.log(
        `\nCurrent time: ${weatherData.current.time}`,
        `\nCurrent weather_code: ${weatherData.current.weather_code}`,
        `\nCurrent weather description: ${weather_code_description}`,
        `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
        `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
        `\nCurrent rain: ${weatherData.current.rain}`,
        `\nIs it day? ${weatherData.current.is_day === 1 ? 'Yes' : 'No'}`,
    );

    // wind speed as Beaufort scale description
    const wind_description = weatherData.current.wind_speed_10m <= 0.2 ? 'calm' :
        weatherData.current.wind_speed_10m <= 1.5 ? 'light air' :
            weatherData.current.wind_speed_10m <= 3.3 ? 'light breeze' :
                weatherData.current.wind_speed_10m <= 5.4 ? 'gentle breeze' :
                    weatherData.current.wind_speed_10m <= 7.9 ? 'moderate breeze' :
                        weatherData.current.wind_speed_10m <= 10.7 ? 'fresh breeze' :
                            weatherData.current.wind_speed_10m <= 13.8 ? 'strong breeze' :
                                weatherData.current.wind_speed_10m <= 17.1 ? 'near gale' :
                                    weatherData.current.wind_speed_10m <= 20.7 ? 'gale' :
                                        weatherData.current.wind_speed_10m <= 24.4 ? 'severe gale' :
                                            weatherData.current.wind_speed_10m <= 28.4 ? 'storm' :
                                                weatherData.current.wind_speed_10m <= 32.6 ? 'violent storm' : 'hurricane';

    const rain_description = weatherData.current.rain === 0 ? 'no rain' :
        weatherData.current.rain < 2.5 ? 'light rain' :
            weatherData.current.rain < 7.6 ? 'moderate rain' :
                weatherData.current.rain < 50 ? 'heavy rain' :
                    weatherData.current.rain < 100 ? 'very heavy rain' : 'extreme rain';

    const weatherInfo = document.getElementById(WEATHER_INFO_ID);
    if (weatherInfo) {
        const weather_summary = `${weather_code_description} ${Math.round(weatherData.current.temperature_2m)}°C<br>
    wind ${Math.round(weatherData.current.wind_speed_10m)} m/s (${wind_description})<br>
    rain ${weatherData.current.rain.toFixed(1)} mm (${rain_description})`;
        weatherInfo.innerHTML =
            `<img src="${weather_code_image}" alt="${weather_code_description}" class="logo grey" style="background:${weather_code_image_background};border-radius:10px;" /><br>
    ${weather_summary}`;
        submitLog(`${weather_summary}`);
    }
})();

const STANDARD_LINKS = [
    { text: 'UK Met Office', url: 'https://weather.metoffice.gov.uk/forecast/gbuqpg6k1#?nearestTo=Grampound%20(Cornwall)' },
    { text: 'YR.no', url: 'https://www.yr.no/en/forecast/daily-table/2-2648227/United%20Kingdom/England/Cornwall/Grampound' }
];

// Fetch and display weather warnings
(async () => {
    try {
        const response = await fetch('https://photos.grampound-pc.gov.uk/repack.php?id=weatherWarningRSS');
        const warnings = await response.json();

        if (warnings.length > 0) {
            const weatherWarning = document.getElementById(WEATHER_WARNING_ID);
            if (weatherWarning) {
                if (warnings.length === 1) {
                    weatherWarning.innerHTML += '<span style="color:orange;font-weight:bold;">⚠️ Weather Warning</span>';
                      showToast('⚠️ Weather Warning');
                } else {
                    weatherWarning.innerHTML += `<span style="color:orange;font-weight:bold;">⚠️ ${warnings.length} Weather Warnings</span>`;
                    showToast(`${warnings.length} ⚠️ Weather Warnings`);
                }
            }

            const warningLinks = warnings
                .sort(([, , , dateA]: [string, string, string, string], [, , , dateB]: [string, string, string, string]) =>
                    new Date(dateA).getTime() - new Date(dateB).getTime()
                )
                .map(([title, url, , date]: [string, string, string, string]) => ({
                    text: `(${formatDateWithSuffix(new Date(date))}) ${title}`,
                    url: url
                }));

            addChoiceModalLink('weather-links', 'Forecasts', [
                ...STANDARD_LINKS,
                ...warningLinks
            ]);
        } else {
            addChoiceModalLink('weather-links', 'Forecasts', STANDARD_LINKS);
        }
    } catch (error) {
        console.error('Error fetching weather warnings:', error);
        addChoiceModalLink('weather-links', 'Forecasts', STANDARD_LINKS);
    }
})();
