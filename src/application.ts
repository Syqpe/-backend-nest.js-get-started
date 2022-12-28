import {
  INestApplication,
  NestApplicationOptions,
  Logger as NestLogger,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ConfigService } from "@server/configs/index";
import { Logger, LOGGER_MODULE_NEST_PROVIDER } from "@server/infrastructure";
import chalk from "chalk";
import os from "os";

export class Application {
  private app: INestApplication;

  private logger: Logger;

  constructor(private options: NestApplicationOptions = {}) {
    this.logsOnError = this.logsOnError.bind(this);
  }

  private logsOnError() {
    NestLogger.flush();
  }

  private exit() {
    this.logger.log(
      chalk.bold(
        "\t\t---------------------[ Server stopped ]---------------------------",
      ),
      "Exit",
    );

    process.exit(0);
  }

  async run() {
    process.on("uncaughtException", this.logsOnError);
    process.on("unhandledRejection", this.logsOnError);

    this.app = await this.createApplication(this.options);

    await this.initLogger();
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

  private async initLogger() {
    this.logger = this.app.get(LOGGER_MODULE_NEST_PROVIDER);

    this.app.useLogger(this.logger);
  }

  private async initServer() {
    const configService = this.app.get(ConfigService);
    const appConfig = configService.get("appConfig");
    const storageConfig = configService.get("storageConfig");

    this.logger.log(
      chalk.bold(
        "\t\t---------------------[ Server starting ]---------------------------",
      ),
      "initServer",
    );
    this.logger.log(
      `Environment:\t${chalk.underline.bold(process.env.NODE_ENV)}`,
      "initServer",
    );
    this.logger.log("IP:\t\t" + appConfig.ip, "initServer");
    this.logger.log("Port:\t\t" + appConfig.port, "initServer");
    this.logger.log("Database:\t\t" + storageConfig.db.uri, "initServer");
    this.logger.log(
      "Redis:\t\t" +
        (storageConfig.redis.enabled ? storageConfig.redis.uri : "Disabled"),
      "initServer",
    );

    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;
    const sysInfo = {
      CPU: `CPU:\t\tArch: ${chalk.bold(os.arch())}, Cores: ${chalk.bold(
        os.cpus().length,
      )}`,
      MEMORY: `Memory:\t\tused: ${chalk.bold(used)}, total: ${chalk.bold(
        total,
      )}, free: ${chalk.bold(free)}`,
      OS: `OS:\t\t${chalk.bold(os.platform())}(${chalk.bold(os.type())})`,
    };

    this.logger.log(sysInfo.CPU, "initServer");
    this.logger.log(sysInfo.MEMORY, "initServer");
    this.logger.log(sysInfo.OS, "initServer");

    await this.app.listen(appConfig.port, appConfig.ip, () => {
      this.logger.log(
        chalk.bold(
          "\t\t---------------------[ Server started ]---------------------------",
        ),
        "initServer",
      );
    });

    process.on("SIGINT", this.exit).on("SIGTERM", this.exit);
  }
}
