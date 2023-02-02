import datahubAxiosUtils from "@utils/datahub-axios-utils";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIYvDHavnpPjQChRCsM2lN9z2MivezzaI",
  authDomain: "wallet-ivirse-notifications.firebaseapp.com",
  projectId: "wallet-ivirse-notifications",
  storageBucket: "wallet-ivirse-notifications.appspot.com",
  messagingSenderId: "996373916403",
  appId: "1:996373916403:web:53a537a8f3926dbb182586",
  measurementId: "G-BFWLQVHYR3",
};

const supportFirebase = !window?.ReactNativeWebView && isSupported();

// Initialize Firebase
const firebaseApp = supportFirebase ? initializeApp(firebaseConfig) : null;
const firebaseMessaging = supportFirebase ? getMessaging(firebaseApp) : null;
// const analytics = getAnalytics(firebaseApp);

export const requestPermissions = async () => {
  let isAllowed = await isSupported();
  if (isAllowed && supportFirebase) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
      }
    });
  }
};

export const isFirebaseSupported = async () => {
  isSupported().then((res) => {
    return res;
  });
};

// isSupported = () => {
//   return false;
// };

export const getFirebaseToken = () => {
  return new Promise(async (resolve, reject) => {
    let isAllowed = await isSupported();
    if (isAllowed && supportFirebase) {
      getToken(firebaseMessaging, {
        vapidKey:
          "BCufwnsIoKuw-_tlwl4tiKSPQsUnEaNjzD41V7xpdhH-jDnZvdmFbLYaOYufqqeO-gf_1wl5MvJc_Hkypw7F98E",
      })
        .then((currentToken) => {
          if (currentToken) {
            datahubAxiosUtils["notiToken"] = currentToken;
          } else {
            
          }
          resolve(currentToken);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject("FCM not supported!");
    }
  });
};

export const onMessageListener = () => {
  return new Promise(async (resolve, reject) => {
    let isAllowed = await isSupported();
    if (isAllowed && supportFirebase) {
      onMessage(firebaseMessaging, (payload) => {
        resolve(payload);
      });
    } else {
      reject("FCM not supported!");
    }
  });
};
