import "./styles.css";
import "antd/dist/antd.dark.css";
import { init, AuthType } from "@thoughtspot/visual-embed-sdk";
import { HashRouter, useRoutes } from "react-router-dom";
import { notification } from "antd";
import { routes } from "./routes";
import { Nav } from "./components/nav/nav";
import { TS_HOST } from "./constants";
import { APIProvider } from "./api-client";

// Initialize ThoughtSpot Visual embed sdk
const authStatus = init({
  thoughtSpotHost: TS_HOST,
  authType: AuthType.Passthrough
  // customCssUrl: "cdn.jsdelivr.net/gh/thoughtspot/custom-css-demo/dark3.css"
});

authStatus.on("SUCCESS", () => {
  notification.info({
    message: "Auth successful",
    duration: 2,
    placement: "bottomRight"
  });
});
authStatus.on("FAILURE", (reason) => {
  notification.error({
    message: "Auth Failed due to " + reason,
    duration: 2,
    placement: "bottomRight"
  });
});
authStatus.on("LOGOUT", () => {
  notification.info({
    message: "Successfully logged out",
    duration: 2,
    placement: "bottomRight"
  });
});

function AppView() {
  const element = useRoutes(routes);
  return (
    <div className="App">
      <Nav />
      {element}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <APIProvider>
        <AppView />
      </APIProvider>
    </HashRouter>
  );
}
