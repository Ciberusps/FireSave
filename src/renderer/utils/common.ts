import path from "path";

export const joinAndNormalize = (...args: string[]) => {
  return path.normalize(path.join(...args));
};
