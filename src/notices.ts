import { LocalNotifications } from '@capacitor/local-notifications';

// could this be loaded from the server?
LocalNotifications.schedule({
    notifications: [
        {
            title: "Test notice",
            body: "This is a test notice.",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 5) },
            sound: '',
            attachments: [],
            actionTypeId: "",
            extra: null
        }
    ]
});