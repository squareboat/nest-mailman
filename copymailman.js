const fs = require("fs-extra");
const path = require("path");
var appRoot = require("app-root-path");
const picocolors = require("picocolors");

// Copies the starter mail templates into <app>/resources/views on install.
// It must never fail the install (read-only or non-root Docker images, CI caches),
// so any error only prints how to copy the templates by hand.
// Skip the copy when nest-mailman is only installed through another package
// (e.g. nest-eyewitness): .tsx files in an app without JSX set up break its
// build. npm writes the app's package.json after install scripts run, so a
// fresh `npm i @squareboat/nest-mailman` is not listed there yet. Instead,
// skip only when the app does not list it and another installed package does.
const NAME = "@squareboat/nest-mailman";
const dependsOnMailman = (pkg) =>
  !!(pkg && ((pkg.dependencies || {})[NAME] || (pkg.devDependencies || {})[NAME]));

function readJson(file) {
  try {
    return fs.readJsonSync(file);
  } catch (e) {
    return null;
  }
}

function onlyInstalledThroughAnotherPackage() {
  if (dependsOnMailman(readJson(path.join(appRoot.path, "package.json")))) return false;
  const modules = path.join(appRoot.path, "node_modules");
  let entries = [];
  try {
    entries = fs.readdirSync(modules);
  } catch (e) {
    return false;
  }
  for (const entry of entries) {
    const dirs = entry.startsWith("@")
      ? (fs.readdirSync(path.join(modules, entry)) || []).map((d) => path.join(entry, d))
      : [entry];
    for (const dir of dirs) {
      if (dir === NAME) continue;
      const pkg = readJson(path.join(modules, dir, "package.json"));
      if (pkg && (pkg.dependencies || {})[NAME]) return true;
    }
  }
  return false;
}

function handle() {
  if (onlyInstalledThroughAnotherPackage()) return;
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

try {
  handle();
} catch (e) {
  // never fail the install
}
