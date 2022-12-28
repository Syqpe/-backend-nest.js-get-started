import path from "path";

import { EnvConfig } from "../types";

//  Levels
//    error: 0,
//    warn: 1,
//    info: 2,
//    http: 3,
//    verbose: 4,
//    debug: 5,
//    silly: 6

type Levels =
  | "error"
  | "warn"
  | "info"
  | "http"
  | "verbose"
  | "debug"
  | "silly";

type LoggingConfig = {
  console: {
    enabled: boolean;
    level: Levels;
  };

  file: {
    enabled: boolean;
    level: Levels;
    dirPath: string;
    exceptionFile: boolean;
  };

  services: {
    graylog: {
      enabled: boolean;
    };

    papertrail: {
      enabled: boolean;
      host: string;
      port: string;
    };

    logentries: {
      enabled: boolean;
      token: string;
    };

    loggly: {
      enabled: boolean;
      token: string;
      subdomain: string;
    };

    logsene: {
      enabled: boolean;
      token: string;
    };

    logzio: {
      enabled: boolean;
      token: string;
    };
  };
};

const loggingConfig: EnvConfig<LoggingConfig> = {
  development: {
    console: {
      enabled: true,
      level: "debug",
    },

    file: {
      enabled: true,
      level: "debug",
      dirPath: path.resolve(__dirname, "../../../logs"),
      exceptionFile: true,
    },
  },
  production: {
    // production configs
  },
};

export type { LoggingConfig };
export { loggingConfig };
