import { fork } from "child_process";
import { join } from "path";

export class SandboxService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public run(code: string, context?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const events = [];
      const child = fork(join(process.cwd(), "executor.js"), [], {
        stdio: "pipe"
      });

      child.on("error", reject);

      try {
        child.stderr.setEncoding("utf8");
        child.stderr.on("data", data => {
          events.push({ Message: data, Kind: "stderr", Delay: 0 });
        });
        child.stdout.setEncoding("utf8");
        child.stdout.on("data", data => {
          events.push({ Message: data, Kind: "stdout", Delay: 0 });
        });

        const watcher = setTimeout(
          () => child.kill(),
          Number(process.env.RUN_TIMEOUT || 10000)
        );

        child.on("close", () => {
          clearTimeout(watcher);
          resolve(events);
        });

        child.send({ code, context });
      } catch (err) {
        child.kill();
        throw err;
      }
    });
  }
}
