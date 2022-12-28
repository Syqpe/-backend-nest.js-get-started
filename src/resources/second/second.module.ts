import { Module, Global } from "@nestjs/common";
import { SecondService } from "./second.service";
import { SecondController } from "./second.controller";

@Module({
  controllers: [SecondController],
  providers: [SecondService],
  exports: [SecondService],
})
export class SecondModule {}
