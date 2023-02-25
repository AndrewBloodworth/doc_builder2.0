import { API_ROUTE } from "../../server/types";
import { WithPrefix } from "../types";

export default (route: API_ROUTE) => {
  const basePath =
    route === API_ROUTE.AUTH ? route : `${API_ROUTE.API}${route}`;

  return (path?: WithPrefix<"/" | "?">): string =>
    basePath + (path ? path : "");
};
