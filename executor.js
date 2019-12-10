// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NodeVM } = require("vm2");

process.on("uncaughtException", err => {
  process.stderr.write(err.toString());
  process.exit(1);
});

process.on("message", ({ code = "", context = {} }) => {
  const fn = new NodeVM({
    require: false,
    console: "inherit"
  }).run(code);

  if (!(fn instanceof Function)) {
    throw new Error("module.exports is not a function.");
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  (async () => {
    process.send((await fn(context)) || null);
    process.exit(0);
  })();
});
