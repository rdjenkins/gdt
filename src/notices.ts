import { LocalNotifications } from '@capacitor/local-notifications';
import { submitLog } from './utils';
import { FCM } from '@capacitor-community/fcm';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

//  const topic = 'gdt'; // topic for push notifications
const topic = 'gdt'; // topic for push notifications
const noticeArea = 'noticeArea'

export function checkNoticePermissions() {
    return `
    <button id='notifyButton' title="Notices will help keep you updated.">add notices</button>
    <div id='${noticeArea}'></div>
    `
}

function thankyou() {
    LocalNotifications.schedule({
        notifications: [
            {
                title: "Thank you",
                body: "Thank you for allowing notices from Grampound Digital Twin!",
                id: 1,
                schedule: { at: new Date(Date.now() + 1000 * 5) },
                sound: '',
                attachments: [],
                actionTypeId: "",
                extra: null
            }
        ]
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
    title.textContent = 'Can the Digital Twin send you notifications?';
    title.style.textAlign = 'center';
    modalContent.appendChild(title);

    let content = document.createElement('div');
    content.innerHTML = `
                        <p>Notices will help keep you up to date.</p>

                        <button class="modal-ok">OK keep me posted!</button>
                        <button class="modal-close">No, not now</button>
                `;
    modalContent.appendChild(content);
    modal.appendChild(modalContent)
    document.body.appendChild(modal);

    modal.querySelector('.modal-close')?.addEventListener('click', () => {
        modal.remove();
                });
    modal.querySelector('.modal-ok')?.addEventListener('click', () => {
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

async function displayNotification(content: string, color: string = 'lightgreen', scroll: boolean = false) {
  // reasonable colors: lightgreen, lightskyblue, lightgray
  const notificationDisplay = document.getElementById(noticeArea)
  if (notificationDisplay) {
        notificationDisplay.innerHTML = '<p class="notificationPackage" style="background-color: ' + color + ';">' + content + '</p>';
    if (scroll && notificationDisplay.parentElement) {
        notificationDisplay.parentElement.scrollIntoView();
    }
  }
}

//document.addEventListener('DOMContentLoaded', async () => {
  //displayNotification('Hello World! <a href="#?cheese">Click here</a>', 'lightskyblue')
//})

async function addListeners() {
  await PushNotifications.addListener('registration', token => {
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

  await PushNotifications.register();

  // Now, subscribe to the topic using @capacitor-community/fcm
  FCM.subscribeTo({ topic: topic })
    .then(r => console.log(`subscribed to topic "${topic}"` + r))
    .catch(err => console.log(err));

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
