import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import { rootConfig } from "./configurate";

@Injectable()
export class ConfigService extends NestConfigService<typeof rootConfig, true> {}
