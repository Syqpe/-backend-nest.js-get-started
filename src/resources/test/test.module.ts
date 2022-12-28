import { Module } from "@nestjs/common";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";
import { SecondModule } from "../second/second.module";

@Module({
  imports: [SecondModule],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
