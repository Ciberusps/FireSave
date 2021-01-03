import path from "path";

export const getFileNameWithExtension = (filePath: string) => path.basename(filePath);

export const getFileName = (filePath: string) =>
  getFileNameWithExtension(filePath).split(".")[0];
