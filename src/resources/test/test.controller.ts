import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from "@nestjs/common";
import { TestService } from "./test.service";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
import { ConfigService } from "@server/configs";
import { Logger, LOGGER_MODULE_PROVIDER } from "@server/infrastructure";

@Controller("test")
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly configService: ConfigService,
    @Inject(LOGGER_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get("hello")
  hello() {
    this.logger.info("TestController: GET");
    return "Hello!";
  }

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.testService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.testService.remove(+id);
  }
}
