import { useEffect } from 'react';

const OneSignalInit = () => {
  useEffect(() => {
    const initOneSignal = () => {
      const OneSignal = window.OneSignal || [];
      OneSignal.push(function () {
        OneSignal.init({
          appId: "6d100325-7ee4-4914-aeff-b8b7af4a1b5b", // Replace with your OneSignal App ID
          safari_web_id: "web.onesignal.auto.3575d4da-2056-4635-b3df-37db701214ed", // Replace with your Safari Web ID
          notifyButton: {
            enable: true,
          },
        });
      });
    };

    // Load the OneSignal script
    const script = document.createElement('script');
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
    script.async = true;
    script.defer = true;
    script.onload = initOneSignal;
    document.head.appendChild(script);
  }, []);

  return null;
};

export default OneSignalInit;
