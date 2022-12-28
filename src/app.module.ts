import { Controller, Module } from "@nestjs/common";

import { TestModule } from "./resources";
import { ConfigModule } from "@server/configs";
import { LoggerModule } from "@server/infrastructure";
import { AppController } from "./app.controller";

@Module({
  imports: [TestModule, ConfigModule, LoggerModule],
  controllers: [AppController],
})
export class AppModule {}
