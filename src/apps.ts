import { Capacitor } from "@capacitor/core"
import GooglePlayIcon from "/GetItOnGooglePlay_Badge_Web_color_English.svg"

export function showApps() {

     if (!Capacitor.isNativePlatform()) {
            return `
    <div id="app-links" class="flex-item">
    <p>Get the App</p>
        <p>
            <a href="https://play.google.com/store/apps/details?id=me.deanjenkins.grampoundDigitalTwin" target="_blank"><img src="${GooglePlayIcon}"></a>
        </p>
    </div>
    `
     } else {
        return ``
     }
}