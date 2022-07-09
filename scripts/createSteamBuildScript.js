require("dotenv").config();
const fs = require("fs");
const exec = require("child_process").execSync;
const path = require("path");

const { checkRequiredEnvs } = require("./utils");

const {
  STEAM_APP_ID,
  RELEASE_BRANCH,
  DEPOT_WINDOWS_ID,
  DEPOT_LINUX_ID,
  DEPOT_MACOS_ID,
  RUNNER_OS,
} = process.env;
checkRequiredEnvs(["STEAM_APP_ID", "RELEASE_BRANCH", "RUNNER_OS"]);
console.log("RUNNER_OS", RUNNER_OS);

let depotId = undefined;
let contentRoot = undefined;
const buildOutput = path.resolve("./BuildOutput/");

switch (RUNNER_OS) {
  case "Windows":
    if (!DEPOT_WINDOWS_ID) throw new Error("DEPOT_WINDOWS_ID is required");
    depotId = DEPOT_WINDOWS_ID;
    contentRoot = path.resolve("./release/build/win-unpacked/");
    break;
  case "Linux":
    if (!DEPOT_LINUX_ID) throw new Error("DEPOT_LINUX_ID is required");
    depotId = DEPOT_LINUX_ID;
    contentRoot = path.resolve("./release/build/linux-unpacked/");
    break;
  case "macOS":
    if (!DEPOT_MACOS_ID) throw new Error("DEPOT_MACOS_ID is required");
    depotId = DEPOT_MACOS_ID;
    contentRoot = path.resolve("./release/build/mac/");
    break;
  default:
    break;
}

if (!depotId) {
  throw new Error("Failed to choose DepotId");
}
if (!contentRoot) {
  throw new Error("Failed to choose contentRoot");
}

const packageJson = JSON.parse(fs.readFileSync("package.json"));

const buildScript = `"AppBuild"
{
	"AppID" "${STEAM_APP_ID}" // your AppID
	"Desc" "v${packageJson.version} - ${RUNNER_OS}" // internal description for this build
  "SetLive" "${RELEASE_BRANCH}"

	"ContentRoot" "${contentRoot}" // root content folder, relative to location of this file
	"BuildOutput" "${buildOutput}" // build output folder for build logs and build cache files

	"Depots"
	{
		"${depotId}" // your DepotID
		{
			"FileMapping"
			{
				"LocalPath" "*" // all files from contentroot folder
				"DepotPath" "." // mapped into the root of the depot
				"recursive" "1" // include all subfolders
			}
		}
	}
}`.toString();

fs.writeFileSync("./steam_build.vdf", buildScript);
