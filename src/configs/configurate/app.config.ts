import { EnvConfig } from "../types";

interface AppConfig {
  title: string;
  version: string;
  description: string;
  keywords: Array<string>;
  url: string;
  contactEmail: string;

  ip: string;
  port: number;

  rootPath: string;
}

const ip = process.env.NODE_IP || "0.0.0.0",
  port = parseInt(process.env.PORT, 10) || 3000,
  rootPath = global.rootPath;

const appConfig: EnvConfig<AppConfig> = {
  development: {
    title: "Nest.js",
    version: "0.0.1",
    description: "Template for Nest.js",
    keywords: ["template", "nest.js", "js"],
    url: `http://localhost:${port}/`,
    contactEmail: "kasaba001gmai.com",

    ip,
    port,

    rootPath,
  },
  production: {
    // production configs
  },
};

export type { AppConfig };
export { appConfig };
