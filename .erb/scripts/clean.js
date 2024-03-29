import rimraf from "rimraf";
import process from "process";
import webpackPaths from "../configs/webpack.paths";

const foldersToRemove = [
  webpackPaths.distPath,
  webpackPaths.buildPath,
  webpackPaths.dllPath,
];

foldersToRemove.forEach((folder) => {
  if (folder !== undefined) {
    rimraf.sync(folder);
  }
});
