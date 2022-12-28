import { Controller, Get, Inject } from "@nestjs/common";
import { ConfigService } from "@server/configs";
import { Logger, LOGGER_MODULE_PROVIDER } from "@server/infrastructure";
import { SecondService } from "./second.service";

@Controller("second")
export class SecondController {
  constructor(
    private readonly secondService: SecondService,
    private readonly configService: ConfigService,
    @Inject(LOGGER_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get("hello")
  hello() {
    this.logger.info("SecondController: GET");
    return this.secondService.sayHello();
  }
}
