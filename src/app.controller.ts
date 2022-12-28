import { Controller, Get, Inject } from "@nestjs/common";
import { Logger, LOGGER_MODULE_PROVIDER } from "@server/infrastructure";

@Controller("/")
export class AppController {
  constructor(
    @Inject(LOGGER_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get("hello")
  hello() {}
}
