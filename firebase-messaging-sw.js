importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );

  const { title, body, icon } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon,
  });
});
