import fs from "fs";
import path from "path";

import { NestApplicationOptions } from "@nestjs/common";

import { getEnv } from "@shared/index";
import { Application } from "./application";

function getOptions(): NestApplicationOptions {
  if (getEnv() === "development") {
    return {};
  }

  const CERTS_DIR = path.join(process.cwd(), "certs");
  const key = fs.readFileSync(path.join(CERTS_DIR, ""));
  const cert = fs.readFileSync(path.join(CERTS_DIR, ""));

  return { httpsOptions: { key, cert } };
}

async function main() {
  const options = getOptions();
  const app = new Application(options);

  await app.run();
}

function handleUncaught(reason: Error) {
  console.error("Unhandled error", reason);
  process.exit(1);
}

process.on("uncaughtException", handleUncaught);
process.on("unhandledRejection", handleUncaught);

main();
