import { EnvConfig } from "../types";

interface StorageConfig {
  sessions: {
    cookie: {
      // session expiration is set by default to one week
      maxAge: number;

      // httpOnly flag makes sure the cookie is only accessed
      // through the HTTP protocol and not JS/browser
      httpOnly: boolean;

      // secure cookie should be turned to true to provide additional
      // layer of security so that the cookie is set only when working
      // in HTTPS mode.
      secure: boolean;
    };

    // Cookie key name
    name: string;

    // Mongo store collection name
    collection: string;
  };

  db: {
    uri: string;

    options: {
      user: string;
      pass: string;
      keepAlive: number;
      useNewUrlParser: boolean;
    };
  };

  redis: {
    enabled: boolean;
    uri: string;
    options: object;
  };
}

const storageConfig: EnvConfig<StorageConfig> = {
  development: {
    sessions: {
      cookie: {
        // session expiration is set by default to one week
        maxAge: 7 * 24 * (60 * 60 * 1000),

        // httpOnly flag makes sure the cookie is only accessed
        // through the HTTP protocol and not JS/browser
        httpOnly: true,

        // secure cookie should be turned to true to provide additional
        // layer of security so that the cookie is set only when working
        // in HTTPS mode.
        secure: false,
      },

      // Cookie key name
      name: "sessionId",

      // Mongo store collection name
      collection: "sessions",
    },

    db: {
      uri: process.env.MONGO_URI || `mongodb://localhost/`,
      options: {
        user: "",
        pass: "",
        keepAlive: 1,
        useNewUrlParser: true,
      },
    },

    redis: {
      enabled: false,
      uri: process.env.REDIS_URI || "redis://localhost:6379",
      options: null,
    },
  },
  production: {
    // production configs
  },
};

export type { StorageConfig };
export { storageConfig };
