import { DeepPartial } from "@shared/types/common";

import { ConfigDefinition, EnvConfig, EnvKeys } from "../types";
import { NODE_ENV } from "@server/shared";

interface GetEnvConfigOptions {
  env: Exclude<EnvKeys, "common">;
}

const configMap: Record<GetEnvConfigOptions["env"], EnvKeys[]> = {
  development: [NODE_ENV.DEVELOPMENT],
  production: [NODE_ENV.PRODUCTION],
};

export function getEnvConfig<T>(
  config: EnvConfig<T>,
  options: GetEnvConfigOptions,
): T {
  const { env } = options;
  const stages = configMap[env];
  const partialConfigs: Array<T | DeepPartial<T>> = [];

  if (!stages) {
    throw new Error(`Unexpected config map for ${env} environment.`);
  }

  for (const stage of stages) {
    const stageConfig = config[stage];

    if (stageConfig) {
      partialConfigs.push(stageConfig);
    }
  }

  const resultConfig = Object.assign([], partialConfigs).reduce(
    (obj, partialConfig) => Object.assign({}, obj, partialConfig),
    {},
  );

  return resultConfig;
}

export function getNestedEnvConfig<T extends Record<string, any>>(
  configs: ConfigDefinition<T>,
  options: GetEnvConfigOptions,
): T {
  const result = {} as T;

  for (const key of Object.keys(configs) as Array<keyof T>) {
    const envConfig = configs[key];

    result[key] = getEnvConfig(envConfig, options);
  }

  return result;
}
