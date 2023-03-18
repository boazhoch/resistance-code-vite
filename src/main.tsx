// init.js
window.global ||= window;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";

//@ts-ignore
import config from "./aws-exports";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  productionRedirectSignIn,
  localRedirectSignIn = "http://localhost:3000/",
] = config.oauth.redirectSignIn.split(",");

const [
  productionRedirectSignOut,
  localRedirectSignOut = "http://localhost:3000/",
] = config.oauth.redirectSignOut.split(",");

const updatedConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};

Amplify.configure(updatedConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
