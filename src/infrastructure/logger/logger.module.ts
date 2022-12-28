import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@server/configs";
import { WinstonModule } from "nest-winston";

import winston from "winston";
import path from "path";

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const loggingConfig = configService.get("loggingConfig");

        const transports = [];

        // Console transporter
        if (loggingConfig.console.enabled) {
          transports.push(
            new winston.transports.Console({
              level: loggingConfig.console.level || "info",
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.splat(),
              ),
            }),
          );
        }

        // File transporter
        if (loggingConfig.file.enabled) {
          const dirPath = loggingConfig.file.dirPath;

          transports.push(
            new winston.transports.File({
              level: loggingConfig.file.level || "info",
              filename: path.resolve(dirPath, "server.log"),
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
                winston.format.splat(),
              ),
              handleExceptions: true,
            }),
          );

          if (loggingConfig.file.exceptionFile) {
            transports.push(
              new winston.transports.File({
                level: "error",
                filename: path.resolve(dirPath, "exceptions.log"),
                format: winston.format.combine(
                  winston.format.timestamp(),
                  winston.format.simple(),
                  winston.format.splat(),
                ),
                handleExceptions: true,
              }),
            );
          }
        }

        return {
          transports,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
