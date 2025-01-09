// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIvqA1NnEXY1VnkxSI6sV1LD_SYT7CDzo",
  authDomain: "test-9bb85.firebaseapp.com",
  projectId: "test-9bb85",
  storageBucket: "test-9bb85.appspot.com",
  messagingSenderId: "6451795601",
  appId: "1:6451795601:web:85ba3803ba6a034281d130",
  measurementId: "G-NC0P8HGT2Q",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();
const status = document.getElementById("status");

function createStatusMessage(message, isError = false) {
  status.innerHTML = `
      <span>${message}</span>
      ${
        !isError
          ? '<button class="close-button" onclick="dismissStatus()">×</button>'
          : ""
      }
    `;
  status.className = isError ? "error" : "success";
}

window.dismissStatus = function () {
  status.innerHTML = "";
  status.className = "";
};

async function initPushNotifications() {
  try {
    if (!("serviceWorker" in navigator)) {
      throw new Error("Service Worker not supported");
    }

    // Register service worker
    let registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    console.log("Service Worker registered:", registration);

    // Request permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Permission denied");
    }

    // Get FCM token
    const token = await messaging.getToken({
      vapidKey:
        "BI5BwY9UI8INy8sW60lo8NuPXdHRfCQwuVZhBnuDCAmQIQvgGG6NCBuysfOuTxEBSq0Z9M6LTrE-sp8od8LTm8k",
      serviceWorkerRegistration: registration,
    });

    createStatusMessage("Push notifications enabled!");
    console.log("FCM Token:", token);

    // Handle foreground messages
    messaging.onMessage((payload) => {
      console.log("Message received:", payload);

      const { title, body, icon } = payload.notification;

      // Show browser notification
      new Notification(title, { body, icon });

      // Update the website's notification list
      addNotificationToSite(title, body);
    });

    return token;
  } catch (error) {
    createStatusMessage(`Error: ${error.message}`, true);
    console.error("Error:", error);
  }
}

// Function to add a notification to the site
function addNotificationToSite(title, body) {
  const notificationsList = document.getElementById("notifications-list");
  const notificationItem = document.createElement("li");
  notificationItem.innerHTML = `
      <strong>${title}</strong>
      <p>${body}</p>
    `;
  notificationsList.prepend(notificationItem); // Add the notification to the top of the list
}

// Initialize push notifications
initPushNotifications();
