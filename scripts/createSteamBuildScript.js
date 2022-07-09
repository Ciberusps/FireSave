require("dotenv").config();
const fs = require("fs");
const exec = require("child_process").execSync;

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

const depotId = undefined;

switch (RUNNER_OS) {
  case "Windows":
    if (!DEPOT_WINDOWS_ID) throw new Error("DEPOT_WINDOWS_ID is required");
    depotId = DEPOT_WINDOWS_ID;
    break;
  case "Linux":
    if (!DEPOT_LINUX_ID) throw new Error("DEPOT_LINUX_ID is required");
    depotId = DEPOT_LINUX_ID;
    break;
  case "MacOS":
    if (!DEPOT_MACOS_ID) throw new Error("DEPOT_MACOS_ID is required");
    depotId = DEPOT_MACOS_ID;
    break;
  default:
    break;
}

if (!depotId) {
  throw new Error("Failed to choose DepotId");
}

const packageJson = JSON.parse(fs.readFileSync("package.json"));

const buildScript = `"AppBuild"
{
	"AppID" "${STEAM_APP_ID}" // your AppID
	"Desc" "v${packageJson.version}" // internal description for this build
  "SetLive" "${RELEASE_BRANCH}"

	"ContentRoot" "../content/" // root content folder, relative to location of this file
	"BuildOutput" "../output/" // build output folder for build logs and build cache files

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

fs.writeFileSync(
  "./steamworks_sdk/tools/ContentBuilder/scripts/simple_build.vdf",
  buildScript
);
