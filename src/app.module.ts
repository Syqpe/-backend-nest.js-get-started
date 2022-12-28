import { Controller, Module } from "@nestjs/common";

import { TestModule } from "./resources";
import { ConfigModule } from "@server/configs";
import { LoggerModule } from "@server/infrastructure";

@Module({
  imports: [TestModule, ConfigModule, LoggerModule],
})
export class AppModule {}
