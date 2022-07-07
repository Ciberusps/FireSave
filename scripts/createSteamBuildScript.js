require("dotenv").config();
const fs = require("fs");
const exec = require("child_process").exec;

const { STEAM_APP_ID } = process.env;

if (!STEAM_APP_ID) {
  throw new Error("process.env.STEAM_APP_ID should be defined");
}
const packageJson = JSON.parse(fs.readFileSync("package.json"));

const buildScript = `"AppBuild"
{
	"AppID" "${STEAM_APP_ID}" // your AppID
	"Desc" "v${packageJson.version}" // internal description for this build

	"ContentRoot" "../content/" // root content folder, relative to location of this file
	"BuildOutput" "../output/" // build output folder for build logs and build cache files

	"Depots"
	{
		"1904151" // your DepotID
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
