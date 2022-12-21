import { EnvConfig } from "./env";

type ConfigObject = Record<string, unknown>;

type ConfigDefinition<T extends ConfigObject> = {
  [P in keyof T]: EnvConfig<T[P]>;
};

type ConfigType<T> = T extends EnvConfig<infer P>
  ? P
  : T extends ConfigDefinition<infer E>
  ? E
  : never;

export type { ConfigDefinition, ConfigType };
