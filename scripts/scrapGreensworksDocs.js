const { default: axios } = require("axios");
const { writeFileSync, rmSync, mkdirSync } = require("fs");

const rawPageLink =
  "https://github.com/greenheartgames/greenworks/raw/master/docs/REPLACE_IT";

// Docs from https://github.com/greenheartgames/greenworks/tree/master/docs
const docsPagesNames = [
  "achievement.md",
  "authentication.md",
  "cloud.md",
  "dlc.md",
  "events.md",
  "friends.md",
  "gotchas.md",
  "matchmaking.md",
  "mocha-test.md",
  "setting.md",
  "stats.md",
  "troubleshooting.md",
  "utils.md",
  "workshop.md",
];

const newDocs = {
  path: "greenworks-docs",
  file: "greenworks-docs.md",
};

const getContent = async () => {
  let result = "# Greenworks Docs \n";
  const pagesPromises = docsPagesNames.map(async (pageName) => {
    const pageLink = rawPageLink.replace("REPLACE_IT", pageName);
    return axios.get(pageLink);
  });
  await Promise.all(pagesPromises)
    .then((res) => {
      console.log(res);
      res.forEach((pageRes) => {
        result += pageRes.data;
        result += "\n";
      });
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return result;
};

const generateDocs = async () => {
  const content = await getContent();

  rmSync(newDocs.path, { force: true, recursive: true });
  mkdirSync(newDocs.path);
  writeFileSync(
    `${newDocs.path}/${newDocs.file}`,
    content,
    { encoding: "utf-8", flag: "w" },
    (err) => {
      if (err) throw err;
      console.log("File created");
    }
  );
};

generateDocs();
