const chalk = require("chalk");
const process = require("process");
const semver = require("semver");
const fs = require("fs");

const mainPackagePath = "package.json";
const mainPackageLockPath = "package-lock.json";
const releaseAppPackagePath = "release/app/package.json";
const releaseAppPackageLockPath = "release/app/package-lock.json";

const error = chalk.bold.red;

const versionArgument = process.argv[2];
if (semver.valid(versionArgument)) {
  const mainPackageJson = JSON.parse(fs.readFileSync(mainPackagePath));
  const mainPackageLockJson = JSON.parse(fs.readFileSync(mainPackageLockPath));
  const releaseAppPackageJson = JSON.parse(
    fs.readFileSync(releaseAppPackagePath)
  );
  const releaseAppPackageLockJson = JSON.parse(
    fs.readFileSync(releaseAppPackagePath)
  );

  mainPackageJson.version = versionArgument;
  mainPackageLockJson.version = versionArgument;
  releaseAppPackageJson.version = versionArgument;
  releaseAppPackageLockJson.version = versionArgument;

  fs.writeFileSync(
    mainPackagePath,
    JSON.stringify(mainPackageJson, null, 2) + "\n"
  );
  fs.writeFileSync(
    mainPackageLockPath,
    JSON.stringify(mainPackageLockJson, null, 2) + "\n"
  );
  fs.writeFileSync(
    releaseAppPackagePath,
    JSON.stringify(releaseAppPackageJson, null, 2) + "\n"
  );
  fs.writeFileSync(
    releaseAppPackageLockPath,
    JSON.stringify(releaseAppPackageLockJson, null, 2) + "\n"
  );

  process.exit();
} else {
  throw new Error(
    error(
      `Version argument "${versionArgument}" not valid should be 0.3.3-beta for example`
    )
  );
}
