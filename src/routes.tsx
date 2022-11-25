import { Home } from "./components/home/home";
import { Liveboard } from "./components/liveboard/liveboard";
import { Viz } from "./components/viz/viz";
import { TableViz } from "./components/viz/table-viz";
import { Search } from "./components/search/search";
import { FullApp } from "./components/full/full";
import { Api } from "./components/api/api";

export const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/liveboard",
    element: <Liveboard />
  },
  {
    path: "/viz",
    element: <Viz />
  },
  {
    path: "/viz-table",
    element: <TableViz />
  },
  {
    path: "/full",
    element: <FullApp />
  },
  {
    path: "/api",
    element: <Api />
  }
];
