import "../styles/globals.css";
import "react-multi-carousel/lib/styles.css";
import { Provider } from "react-redux";
import store from "../store";
import RegisterModal from "../components/RegisterModal";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import NextNProgress from 'nextjs-progressbar';
import OTPModal from "../components/OTPModal";
import LoginModal from "../components/LoginModal";
import Head from "next/head";
import CallbackButton from "../components/CallbackButton";
import ContactForm from "../components/ContactForm";
import BulkPurchaseForm from "../components/BulkPurchaseForm";
import BulkOrder from "../components/BulkOrderButton";
import OfferPopup from "../components/OfferPopup";
import Salesiq from "./salesiq";
import VisitfactoryForm from "../components/VisitFactoryForm";
import { Analytics } from '@vercel/analytics/react';
import BotsonicWidget from "./BotsonicWidget";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
      </Head>

      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5N8GHVR');
      `}
      </Script>
     
      <SessionProvider session={session}>
        <Provider store={store}>
          {/* <HeaderOffer /> */}
          <NextNProgress color="#ff6536" height={2} />
          <Component {...pageProps} />
          <Analytics />
          <CallbackButton />
          <OTPModal />
          <RegisterModal />
          <LoginModal />
          {/* <BulkOrder /> */}
          <BulkPurchaseForm />
          <VisitfactoryForm />
          <ContactForm />
          <Toaster />
          <OfferPopup /> 
          
        </Provider>
        <BotsonicWidget />
        <Salesiq widgetCode={`siqb3d4f0089a7adff1de220b6da34ba3f7fec23a78f8033952b387cfe070dd67106a07d4fb5adcfc010f50c0aaa101ce39`}
          domain={`https://salesiq.zoho.in/widget`}
        />
      </SessionProvider>
    </>
  );
}

export default MyApp;
