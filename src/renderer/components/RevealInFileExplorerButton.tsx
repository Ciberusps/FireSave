import { useCallback } from "react";

import Button from "./Button";

type TProps = {
  path: string;
  isDisabled?: boolean;
};

const RevealInFileExplorerButton = (props: TProps) => {
  const { path, isDisabled } = props;

  const onClickRevealInFileExplorer = useCallback(() => {
    window.api.revealInFileExplorer(path);
  }, [path]);

  return (
    <Button
      icon="openInNew"
      size="small"
      title="Reveal in expolorer"
      isDisabled={isDisabled}
      onClick={onClickRevealInFileExplorer}
    />
  );
};

export default RevealInFileExplorerButton;
