import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Md5 } from 'ts-md5';
import defaultConfig from './config.json'

var checkingUpdates = false;
var configuration: any = undefined
var configVersion = 1

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

async function loadConfig(url: string, version: number, defaultData: string | JSON) {
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
            let parsedData = JSON.parse(defaultData)
            if (parsedData.version) {
                console.log('default data version: ' + parsedData.version)
            } else {
                console.log('default data has no version number')
            }
            return parsedData
        } else {
            return defaultData // when might this happen?
        }
    }
}

async function checkForUpdates(url: string, version: number = 1) {
    if (checkingUpdates) { return; } // only check online once per app load (unless there's an error)
    checkingUpdates = true;
    try {
        const response = await fetch(url);
        const remoteConfig = await response.json();

        const localVersion = version; // Built-in version number of the app
        if (remoteConfig.version > localVersion) {
            console.log("New config available: " + remoteConfig.version)
            await updateConfiguration(remoteConfig, url);
        } else {
            console.log("Config is up to date. Version: " + remoteConfig.version)
        }
    } catch (error) {
        console.log("Error fetching configuration: ", error);
        checkingUpdates = false;
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

let configPromise: Promise<any> | null = null;

export async function config(linkId: string) {
    if (!configPromise) {
        configPromise = loadConfig('https://photos.grampound-pc.gov.uk/repack.php?id=config', configVersion, JSON.stringify(defaultConfig));
    }
    
    configuration = await configPromise;
    return configuration.data.find((item: { linkId: string }) => item.linkId === linkId);
}


