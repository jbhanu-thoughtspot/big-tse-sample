import { Action } from "@thoughtspot/visual-embed-sdk";

export const USERNAME = `demo-user`;
// See https://github.com/thoughtspot/node-token-auth-server-example
// for the implementation of the below endpoint.
export const TOKEN_SERVER =
  "https://node-token-auth-server-example-eta.vercel.app";
export const TOKEN_ENDPOINT = `${TOKEN_SERVER}/api/gettoken/${USERNAME}`;
// If you change this to `demo-user` the request starts failing with 403
export const TOKEN_ENDPOINT_API = `${TOKEN_SERVER}/api/v2/gettoken/ashish.shubham@thoughtspot.com`;

// Cluster details
export const TS_HOST = `embed-1-do-not-delete.thoughtspotdev.cloud`;

// Liveboard
export const LiveboardId = "b93478e2-c634-4934-ac89-d79f223d350e";

// Options for Select filter
export const filterName = "state";
export const filterValues = [
  "michigan",
  "massachusettes",
  "illinois",
  "new hampsire",
  "maryland"
];

// Vizzes to show for 'Selected Vizs' button
export const visibleVizIds = [
  "7b2763b7-300f-49d2-88af-a6754535817f",
  "5c77eea9-e0f8-4b1a-9dc1-573f296129a8"
];

// Options for Actions Disabled
export const actionsToDisable = [
  Action.Subscription,
  Action.Share,
  Action.Save,
  Action.Edit,
  Action.EditTitle,
  Action.Explore,
  Action.Pin,
  Action.SpotIQAnalyze,
  Action.DrillDown
];
export const disabledReason = "Pay $$ for enabling";

// Options for Actions hidden
export const actionsToHide = [Action.Explore, Action.Pin, Action.SpotIQAnalyze];

// Create a custom action and update the name here.
// Selecting the action should only show the current viz.
export const customActionNameForShowThisViz = "only-this-viz";
