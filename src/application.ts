import {
  INestApplication,
  NestApplicationOptions,
  Logger as NestLogger,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ConfigService } from "@server/configs/index";

export class Application {
  private app: INestApplication;

  constructor(private options: NestApplicationOptions = {}) {
    this.logsOnError = this.logsOnError.bind(this);
  }

  private logsOnError() {
    NestLogger.flush();
  }

  async run() {
    process.on("uncaughtException", this.logsOnError);
    process.on("unhandledRejection", this.logsOnError);

    this.app = await this.createApplication(this.options);

    await this.initServer();

    process.off("uncaughtException", this.logsOnError);
    process.off("unhandledRejection", this.logsOnError);
  }

  private async createApplication(options: NestApplicationOptions) {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
      ...options,
    });

    return app;
  }

  private async initServer() {
    const configService = this.app.get(ConfigService);
    const appConfig = configService.get("appConfig");

    await this.app.listen(appConfig.port);
  }
}
