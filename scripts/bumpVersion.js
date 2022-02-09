const chalk = require("chalk");
const process = require("process");
const semver = require("semver");
const fs = require("fs");

const packageJsonPath = "release/app/package.json";
const packageLockJsonPath = "release/app/package-lock.json";
const mainPackageJsonPath = "package.json";

const error = chalk.bold.red;

const versionArgument = process.argv[2];
if (semver.valid(versionArgument)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
  const packageLockJson = JSON.parse(fs.readFileSync(packageJsonPath));
  const mainPackageJson = JSON.parse(fs.readFileSync(mainPackageJsonPath));

  packageJson.version = versionArgument;
  packageLockJson.version = versionArgument;
  mainPackageJson.version = versionArgument;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  fs.writeFileSync(
    packageLockJsonPath,
    JSON.stringify(packageLockJson, null, 2)
  );
  fs.writeFileSync(
    mainPackageJsonPath,
    JSON.stringify(mainPackageJson, null, 2)
  );

  process.exit();
} else {
  throw new Error(
    error(
      `Version argument "${versionArgument}" not valid should be 0.3.3-beta for example`
    )
  );
}
