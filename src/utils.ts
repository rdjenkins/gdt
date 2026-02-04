import { Toast } from '@capacitor/toast';
import { config } from './update';

const URL_PARAMS = new URLSearchParams(window.location.search)
const NO_LOG = (URL_PARAMS.has('nolog')) ? true : false
const QR = (URL_PARAMS.has('QR')) ? true : false
const m = (URL_PARAMS.has('m')) ? URL_PARAMS.get('m') : ''

// Function to submit anonymous logs to the server to see which functions are being used
export async function submitLog(lg: string, u: string = ''): Promise<string> {

    if (NO_LOG) {
        console.log('GDT Logging disabled:', lg || ' ', u || ' ');
        return ''; // return empty string not logging anything
    }
    let theResponse = '';
    const RESPONSE = await fetch('https://photos.grampound.org.uk/repack.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `lg=${encodeURIComponent(lg)}&u=${encodeURIComponent(u)}`,
    })
    .catch((reason) => {
        console.log('Aborting log call: ' + reason)
    })
    if (!RESPONSE) {
        return 'Cancelled'
    }
    theResponse = await RESPONSE.text()
    console.log('GDT Logging:', theResponse);
    return theResponse;
}

if (QR) {
    submitLog('QR accessed');
}

// Listen for clicks on any hyperlink and log the URL
document.addEventListener('click', (event) => {
    let target = event.target as HTMLElement;
    let anchor = target.closest('a');
    if (anchor && anchor instanceof HTMLAnchorElement) {
        let u = (anchor.href.endsWith('#')) ? anchor.id + ' choice' : anchor.href;
        submitLog('Hyperlink clicked: ', u);
    }
});

function showChoiceModal(name: string, buttons: { text: string, url: string }[]) {
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';

    let modalContent = document.createElement('div');
    modalContent.style.background = 'white';
    modalContent.style.padding = '2em';
    modalContent.style.margin = '1em';
    modalContent.style.borderRadius = '10px';
    modalContent.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    modalContent.style.textAlign = 'center';
    modalContent.style.position = 'relative';

    let title = document.createElement('h2');
    title.textContent = name;
    title.style.textAlign = 'center';
    modalContent.appendChild(title);

    buttons.forEach(btn => {
        let anchor = document.createElement('a');
        anchor.href = btn.url;
        anchor.target = '_blank';
        anchor.innerHTML = `<button style="margin:1em;">${btn.text}</button>`;
        anchor.onclick = () => {
            document.body.removeChild(modal);
        };
        modalContent.appendChild(anchor);
    });

    let closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '0.2em';
    closeBtn.style.right = '0.2em';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '1.5em';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
    modalContent.appendChild(closeBtn);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// TODO move to using the built in config.json data when we've worked out how to handle the dynamic buttons
export async function addChoiceModalLink(linkId: string, name: string, buttons: { text: string; url: string }[], dynamicButtons: { text: string; url: string }[] = Array()) {
    // check for updated config data over-riding the built in button choices
    var configData = await config(linkId)
    if (configData) {
        linkId = (configData.linkId) ? configData.linkId : linkId
        name = (configData.name) ? configData.name : name
        buttons = (configData.buttons) ? [...configData.buttons, ...dynamicButtons] : [...buttons, ...dynamicButtons]
    } else {
        console.log('New config definition for ' + `{"linkId": ${JSON.stringify(linkId)}, "name": ${JSON.stringify(name)}, "buttons": ${JSON.stringify(buttons)}}`)
    }
    let listenerSetup = false;
    const setupListener = () => {
        // Return early if listener is already set up for this linkId
        if (listenerSetup) return;

        const link = document.getElementById(linkId) as HTMLAnchorElement | null;
        if (link) {
            //console.log('adding ' + linkId);
            link.addEventListener('click', (event) => {
                event.preventDefault();
                showChoiceModal(name, buttons);
            });
            listenerSetup = true; // Mark the listener as set up
        } else {
            console.warn('Link not found: ' + linkId);
        }
    };

    if (document.readyState === 'complete') {
        setupListener();
    } else {
        // Use a polling mechanism to check for complete status
        const checkReadyState = () => {
            if (document.readyState === 'complete') {
                setupListener();
            } else {
                setTimeout(checkReadyState, 100); // Check again after a short delay
            }
        };

        // Initiate the check
        checkReadyState();

        // Also ensure listener is added after DOMContentLoaded
        document.addEventListener('DOMContentLoaded', setupListener);
    }
}

export function formatDateWithSuffix(date: Date): string {
    const day = date.getDate();
    const suffix = day % 10 === 1 && day !== 11 ? 'st' :
        day % 10 === 2 && day !== 12 ? 'nd' :
            day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    const formatted = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    return formatted.replace(/(\d+)/, `$1${suffix}`);
}

// Toast messages
const toastQueue: string[] = [];
let isShowingToast = false;

async function processQueue() {
    if (isShowingToast || toastQueue.length === 0) return;

    isShowingToast = true;
    const message = toastQueue.shift();

    await Toast.show({
        text: message ?? '',
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    isShowingToast = false;
    processQueue();
}

export async function showToast(message = '') {
    if (message === '') { return }
    toastQueue.push(message);
    processQueue();
}

if (m !== '' && m !== null) {
    showToast(m)
}

// for embedding on other websites as an iframe
// the code would be e.g. <script src="https://deanjenkins.me/gdt.js?APIkey=GwCPC"></script>
// which injects the code to call this app
//   and the postmessage functionality to adjust the iframe height size
function sendScrollHeight() {
    const scrollHeight = document.body.scrollHeight;
    window.parent.postMessage({ height: scrollHeight }, '*');
}

document.addEventListener('DOMContentLoaded', () => {
    sendScrollHeight();
    setTimeout(sendScrollHeight, 100); // Additional timeout
});

window.onresize = () => {
    sendScrollHeight();
};

window.onscroll = () => {
    sendScrollHeight();
};

// Observe changes in the body
const observer = new MutationObserver(sendScrollHeight);
observer.observe(document.body, { childList: true, subtree: true });



// If the digital twin has been unattended for sometime then it should reload to keep up to date.
let timer: number;
let timedOut = false; // Variable to track timer expiration
const reloadTime = 15 * 60 * 1000; // Time in milliseconds (15 minutes)

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {
        // Start timer when the page is hidden
        //console.log("Human has gone away.");
        timedOut = false; // Reset timedOut to false
        timer = window.setTimeout(() => {
            //console.log("Timer expired.");
            timedOut = true; // Set timedOut to true when the timer expires
        }, reloadTime);
    } else if (document.visibilityState === 'visible') {
        // Clear the timer when the page becomes visible
        //console.log("Human is here.");
        clearTimeout(timer);
        
        // Check if the timer expired to decide on reload
        if (timedOut) {
            //console.log("Reloading the page.");
            location.reload();
        }
    }
});

