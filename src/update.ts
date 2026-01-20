import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

async function updateConfiguration(remoteConfig: JSON) {
    console.log("Saving new config.")
    await Filesystem.writeFile({
        path: 'motd.json',
        data: JSON.stringify(remoteConfig),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
    });
}

async function loadConfig() {
    try {
        const result = await Filesystem.readFile({
            path: 'motd.json',
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
        console.log("returning local stored config")
        return JSON.parse(result.data as string)
    } catch (error) {
        console.log("Loading local config failed, fall back to built-in version.");
        return JSON.parse(`{"version":1,"text":"Where there's a will, there's a way."}`)
    }
}

async function checkForUpdates() {
    try {
        const response = await fetch('https://photos.grampound.org.uk/repack.php?id=motd');
        const remoteConfig = await response.json();

        const localVersion = '1'; // Built-in version number of the app
        if (remoteConfig.version > localVersion) {
            console.log("New config available: " + remoteConfig.version)
            await updateConfiguration(remoteConfig);
        }
    } catch (error) {
        console.error("Error fetching configuration: ", error);
    }
}

export function getMotd() {
    checkForUpdates()
    return `<span id="motd"></span>`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadConfig().then((data) => {
        const motdDiv = document.querySelector('#motd');
        if (motdDiv) {
            motdDiv.innerHTML = data.text
        }
    })
})