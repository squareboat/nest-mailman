const fs = require("fs-extra");
const path = require("path");
var appRoot = require("app-root-path");
const picocolors = require("picocolors");

// Copies the starter mail templates into <app>/resources/views on install.
// It must never fail the install (read-only or non-root Docker images, CI caches),
// so any error only prints how to copy the templates by hand.
function handle() {
  const source = path.join(__dirname, "views");
  const target = path.join(appRoot.path, "resources", "views");
  if (fs.existsSync(target)) {
    console.log(picocolors.blue(`➡️ ${target} already exists. Returning...`));
    console.log(picocolors.blue(`➡️ To copy the templates again, copy ${source} to ${target}`));
    return;
  }

  try {
    fs.copySync(source, target, { overwrite: false });
    console.log(picocolors.green(`🚀 Copied mail templates to ${target}`));
  } catch (e) {
    console.warn(picocolors.yellow(`⚠️ @squareboat/nest-mailman could not copy its templates to ${target}: ${e.message}`));
    console.warn(picocolors.yellow(`   Copy ${source} to ${target} yourself if you use the built-in templates.`));
  }
}

handle();
