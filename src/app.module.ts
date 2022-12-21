import { Module } from "@nestjs/common";

import { TestModule } from "./resources";
import { ConfigModule } from "@server/configs";

@Module({
  imports: [TestModule, ConfigModule],
})
export class AppModule {}
