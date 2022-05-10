export type TNode = {
  value: string;
  label: string;
  children: TNode[];
  disabled?: boolean;
};

const globToTreeRecursive = (tree: any, glob: string): void => {
  const parts = glob.split("/");
  let current = tree;
  for (let i = 0; i <= parts.length; i++) {
    const part = parts[i];
    if (i === parts.length - 1) {
      current[part] = part;
    } else if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }
};

const globToTree = (globs: string[]): any => {
  const tree = {};

  for (const glob of globs) {
    globToTreeRecursive(tree, glob);
  }

  return tree;
};

const globToNodeRecursive = (tree: any, glob: string): void => {
  const parts = glob.split("/");
  // console.log({ parts, glob });

  let part = parts[0];
  let current = tree;

  const currentCandidate = current.find((n) => n.value === part);
  // console.log({ currentCandidate });
  if (!currentCandidate) {
    tree.push({ value: part, label: part });
    current = current.find((n) => n.value === part);
  } else {
    current = currentCandidate;
  }
  // console.log({ current, partsLenght: parts.length });

  for (let i = 1; i < parts.length; i++) {
    const partsPath = parts.slice(0, i + 1).join("/");
    part = parts[i];
    // console.log({ glob, partsPath });
    const newChild = { value: partsPath, label: part };

    if (!current.children?.length) {
      // console.log(
      //   "create children",
      //   !current.children?.length,
      //   current.children?.length
      // );
      current.children = [];
      current.children.push(newChild);
      current = current.children.find((c) => c.value === partsPath);
    } else {
      const exist = current.children.find((c) => c.value === partsPath);
      if (exist) {
        current = exist;
      } else {
        current.children.push(newChild);
        current = current.children.find((c) => c.value === partsPath);
      }
    }
  }

  current.path = glob;
};

const globToNodes = (globs: string[]): TNode[] => {
  const tree: TNode[] = [];

  const globsSorted = globs.sort((a, b) => b.length - a.length);
  // console.log({ globsSorted });
  for (const glob of globsSorted) {
    globToNodeRecursive(tree, glob);
  }

  return tree;
};

export { globToTree, globToNodes };
