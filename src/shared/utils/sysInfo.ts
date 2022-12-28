import os from "os";

import chalk from "chalk";

function sysInfo() {
  const total = os.totalmem();
  const free = os.freemem();

  const used = total - free;

  return {
    CPU: `CPU:\t\tArch: ${chalk.bold(os.arch())}, Cores: ${chalk.bold(
      os.cpus().length,
    )}`,
    MEMORY: `Memory:\t\tused: ${chalk.bold(used)}, total: ${chalk.bold(
      total,
    )}, free: ${chalk.bold(free)}`,
    OS: `OS:\t\t${chalk.bold(os.platform())}(${chalk.bold(os.type())})`,
  };
}

export { sysInfo };
