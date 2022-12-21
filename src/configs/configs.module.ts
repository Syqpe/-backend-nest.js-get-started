import { Module, Global } from "@nestjs/common";
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from "@nestjs/config";

import { getEnv } from "@server/shared";
import { getNestedEnvConfig } from "./utils";
import { rootConfig } from "./configurate";
import { ConfigService } from "./configs.service";

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [
        () => {
          return getNestedEnvConfig(rootConfig, { env: getEnv() });
        },
      ],
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useExisting: NestConfigService,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
