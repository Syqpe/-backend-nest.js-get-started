import { NODE_ENV } from "../types";

function getEnv(): NODE_ENV {
  switch (process.env.NODE_ENV) {
    case "local":
    case "development":
      return NODE_ENV.DEVELOPMENT;
    default:
      return NODE_ENV.PRODUCTION;
  }
}

export { getEnv };
