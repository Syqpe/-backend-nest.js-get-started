import { DeepPartial, NODE_ENV } from "@shared/types";

type EnvConfigFactory<K extends string, T> = {
  [P in K]?: DeepPartial<T>;
};

type EnvConfig<T> = EnvConfigFactory<NODE_ENV, T>;

type EnvKeys = keyof EnvConfig<any>;

export type { EnvConfig, EnvKeys };
