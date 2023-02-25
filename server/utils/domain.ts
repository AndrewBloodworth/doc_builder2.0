import { Environment } from "../types";

export default (pathname?: `/${string}`) => {
  const origin =
    process.env.NODE_ENV === Environment.PRODUCTION
      ? String(process.env.PROD_BASE_URL)
      : String(process.env.DEV_BASE_URL);
  return { href: origin + pathname, origin, host: origin.split("://").pop() };
};
