import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Md5 } from 'ts-md5';
import defaultConfig from './config.json'

function MD5(str: string) {
    return Md5.hashStr(str);
}

async function updateConfiguration(remoteConfig: JSON, url: string) {
    const filename = MD5(url) + '.json';
    console.log("Saving new config. " + filename)
    await Filesystem.writeFile({
        path: filename,
        data: JSON.stringify(remoteConfig),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
    });
}

export async function loadConfig(url: string, version: number, defaultData: string | JSON) {
    checkForUpdates(url, version) // send this off first (async)

    // load offline version
    try {
        const result = await Filesystem.readFile({
            path: MD5(url) + '.json',
            directory: Directory.Data,
            encoding: Encoding.UTF8,
        });
        console.log("returning local stored config")
        return JSON.parse(result.data as string)
    } catch (error) {
        console.log("No local config, fall back to built-in version.");
        if (typeof defaultData === 'string') {
            return JSON.parse(defaultData)
        } else {
            return defaultData
        }
    }
}

async function checkForUpdates(url: string, version: number = 1) {
    try {
        const response = await fetch(url);
        const remoteConfig = await response.json();

        const localVersion = version; // Built-in version number of the app
        if (remoteConfig.version > localVersion) {
            console.log("New config available: " + remoteConfig.version)
            await updateConfiguration(remoteConfig, url);
        }
    } catch (error) {
        console.log("Error fetching configuration: ", error);
    }
}

// example usage
/*
const motdURL = 'https://photos.grampound.org.uk/repack.php?id=motd'
const motdURLversion = 1;
const motdDefault = `{"version":1,"text":"Where there's a will, there's a way."}`

export function getMotd() {
    return `<span id="motd"></span>`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadConfig(motdURL, motdURLversion, motdDefault).then((data) => {
        const motdDiv = document.querySelector('#motd');
        if (motdDiv) {
            motdDiv.innerHTML = data.text
        }
    })
})
*/

var configuration: any = undefined

export async function config(linkId: string) {
    if (configuration === undefined) {
        configuration = await loadConfig('https://photos.grampound-pc.gov.uk/repack.php?id=config', 1, JSON.stringify(defaultConfig))
        return configuration.data.find((item: { linkId: string }) => item.linkId === linkId)
    } else {
        return configuration.data.find((item: { linkId: string }) => item.linkId === linkId)
    }
}


