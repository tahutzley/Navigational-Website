import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain="dev-iswwv88g6t0cxnct.us.auth0.com"
    clientId="mm81JLljmsxeA96aaHemTjEjsvXBJCBJ"
    cacheLocation="localstorage"
    useRefreshTokens={true}
    // @ts-expect-error blah
    redirectUri={`${window.location.origin}/dashboard`}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
);
