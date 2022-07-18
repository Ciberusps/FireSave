const checker = require("license-checker");
const exec = require("child_process").execSync;

checker.init(
  {
    start: "./",
    production: true,
    exclude:
      "MIT,ISC,Apache-2.0,BSD-3-Clause,WTFPL,CC-BY-4.0,0BSD,Python-2.0,Zlib,BSD-2-Clause,Unlicense",
  },
  function (err, packages) {
    if (err) {
      console.error(err);
      throw new Error("Faile to check licenses try again");
      //Handle error
    } else {
      // console.log(packages);
      if (!packages) return;

      if (Object.values(packages).length > 0) {
        console.log(Object.keys(packages));
        const packagesNames = Object.keys(packages)
          .map((k) => `  - ${k}`)
          .join("\n");
        console.log(packagesNames);
        throw new Error(
          `Found packages licenses that probably violate steam policy
use "npm explain {packageName}" to see what packages uses those dependencies and cause license issues
${packagesNames}`
        );
      }
    }
  }
);
