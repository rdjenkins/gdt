import { LocalNotifications } from '@capacitor/local-notifications';
import { sleep, submitLog } from './utils';
import { FCM } from '@capacitor-community/fcm';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

/*
export const hapticsVibrate = async () => {
  if (Capacitor.isNativePlatform()) {
    await Haptics.vibrate();
  }
};
*/

export const hapticsImpactLight = async () => {
  if (Capacitor.isNativePlatform()) {
    await Haptics.impact({ style: ImpactStyle.Light });
  }
};


export const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};


/*
const hapticsSelectionStart = async () => {
  await Haptics.selectionStart();
};

const hapticsSelectionChanged = async () => {
  await Haptics.selectionChanged();
};

const hapticsSelectionEnd = async () => {
  await Haptics.selectionEnd();
};
*/

//  const topic = 'gdt'; // topic for push notifications
const topic = 'gdt'; // topic for push notifications
const noticeArea = 'noticeArea'

export function checkNoticePermissions() {
    return `
    <button id='notifyButton' style="margin-bottom:10px" class="widgetlink" title="Notices will help keep you updated.">add notices</button>
    <div id='${noticeArea}'></div>
    `
}

function thankyou() {
  const dataPackage = {
        package: "Welcome to the Digital Twin! Your environment alerts are now active."
  };

  LocalNotifications.schedule({
    notifications: [
        {
          title: "Thank you",
          body: "Alerts Active: You will now receive notifications from Grampound Digital Twin!",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: '',
          attachments: [],
          actionTypeId: "",
          extra: dataPackage
        }
      ]
  });

  // This runs when the user taps the notification
  LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      const data = notification.notification.extra;    
      if (data && data.package) {
          displayNotification(data.package,'lightgreen',true);
      }
  });
}

function showNoticeModal(button: HTMLButtonElement) {
    const modal = document.createElement('div');
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
    title.textContent = `Enable Digital Twin's Community Alerts`;
    title.style.textAlign = 'center';
    modalContent.appendChild(title);

    let content = document.createElement('div');
    content.innerHTML = `
                        <p>Get real-time alerts for river level, air quality, environmental and travel information. You can change this anytime in Settings.</p>

                        <button class="modal-ok widgetlink">Notify Me</button>
                        <button class="modal-close widgetlink">Maybe Later</button>
                `;
    modalContent.appendChild(content);
    modal.appendChild(modalContent)
    document.body.appendChild(modal);
    hapticsImpactMedium();

    modal.querySelector('.modal-close')?.addEventListener('click', () => {
        hapticsImpactLight()
        modal.remove()
      });
    modal.querySelector('.modal-ok')?.addEventListener('click', () => {
        hapticsImpactLight()
        modal.remove();
        button.click();
      });
}

document.addEventListener('DOMContentLoaded', async () => {
    const notifyButton = document.getElementById('notifyButton') as HTMLButtonElement;
    if (!Capacitor.isNativePlatform()) {
        if (notifyButton) {
            notifyButton.remove()
        }
        console.log('Notifications not supported on web platform');
        return;
    }
    const permStatus = await LocalNotifications.checkPermissions();
    if (notifyButton) {
        if (permStatus.display === 'prompt') {
            showNoticeModal(notifyButton);
            notifyButton.addEventListener('click', async () => {
                if (permStatus.display !== 'granted') {
                    await LocalNotifications.requestPermissions();
                    registerNotifications()
                    const newpermStatus = await LocalNotifications.checkPermissions();
                    if (newpermStatus.display === 'granted') {
                        notifyButton.remove()
                        thankyou()
                    }
                }
            })
        }

        if (permStatus.display === 'denied') {
            submitLog('notifications previously denied')
            notifyButton.remove()
        }

        if (permStatus.display === 'granted') {
            notifyButton.remove()
        }
    }
})

let notificationClickListener: (() => void) | null = null;
let notices_showing = 0
var lastnotice: string 

export async function displayNotification(content: string, color: string = 'lightgreen', scroll: boolean = false, target: string = 'nowhere', TTL = 1000 * 60) {
  // reasonable colors: lightgreen, lightskyblue, lightgray
  if (content === lastnotice) { return } // ignore if it is a repeat (poor air quality for example)
  if (notices_showing > 3 && scroll !== true) { // 4 will show! (plus local or remote notifications)
    await sleep(65 * 1000); 
  }
  lastnotice = content
  const notificationDisplay = document.getElementById(noticeArea)
  const notificationTarget = document.getElementById(target)
  if (notificationDisplay) {
    var notficationDisplayNotice = document.createElement('div');
    notficationDisplayNotice.setAttribute('class','notificationPackage')
    notficationDisplayNotice.style.backgroundColor = color 
    notificationDisplay.appendChild(notficationDisplayNotice);
    notices_showing = notices_showing + 1
    if (notificationClickListener) {
      notficationDisplayNotice.removeEventListener('click', notificationClickListener);
    }
    notficationDisplayNotice.innerHTML = '<span class="XnotificationPackage" Xstyle="background-color: ' + color + ';">' + content + '</span> ';
    if (scroll && notificationDisplay.parentElement) {
        notificationDisplay.parentElement.scrollIntoView();
    }
    hapticsImpactLight();
    notificationClickListener = () => {
      if (notificationTarget) {
        notificationTarget.scrollIntoView({ behavior: 'smooth' });
      }
    };
    notficationDisplayNotice.addEventListener('click', notificationClickListener);
    setTimeout(() => {
      notficationDisplayNotice.style.opacity = '0';
      notficationDisplayNotice.style.transition = 'opacity 0.5s ease';

      setTimeout(() => {
        notficationDisplayNotice.remove();
        notices_showing = notices_showing - 1
      }, 500); 
    }, TTL);
  }
}

//document.addEventListener('DOMContentLoaded', async () => {
  //displayNotification('Hello World! <a href="#?cheese">Click here</a>', 'lightskyblue')
//})

async function addListeners() {
  await PushNotifications.addListener('registration', token => { // is this needed now?
    submitLog('Registration token: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
//    submitLog('GDTTEST Push notification received: ', notification.title + ': ' + notification.body);
    const color = notification.data.color ? notification.data.color : 'lightgreen';
    if (notification.data.package) {
        displayNotification(notification.data.package, color);
    }
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
//    submitLog('Push notification action performed: actionID=' + notification.actionId + ' inputValue= ' + notification.inputValue);
      const color = notification.notification.data.color ? notification.notification.data.color : 'lightgreen';
      if (notification.notification.data.package) {
          displayNotification(notification.notification.data.package, color, true);
      }
  });
}

// function to register for push notifications
async function registerNotifications() {
  try {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  // Now, subscribe to the topic using @capacitor-community/fcm after APNs registration completes
  const regListener = await PushNotifications.addListener('registration', async token => {
    submitLog('Push registration token: ' + token.value);
    try {
      await FCM.subscribeTo({ topic: topic });
      console.log(`subscribed to topic "${topic}"`);
    } catch (err) {
      console.log('Error subscribing to topic:', err);
    }
    regListener.remove();
  });

  await PushNotifications.register();

} catch (e) {
  console.log('Error registering for push notifications (probably running in a browser)')
}
}

async function getDeliveredNotifications() {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}

(async () => {
  try {
    await addListeners()
    await getDeliveredNotifications()
  } catch (e) {
    console.log ('Error adding push notifications (probably running in a browser)');
  }
})()
