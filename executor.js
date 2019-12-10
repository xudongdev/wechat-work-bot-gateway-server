// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NodeVM } = require("vm2");

process.on("uncaughtException", err => {
  process.stderr.write(err.toString());
  process.exit(1);
});

process.on("message", ({ code }) => {
  new NodeVM({
    sandbox: {},
    require: false,
    console: "inherit"
  }).run(code);

  // eslint-disable-next-line no-process-exit
  process.exit(0);
});
