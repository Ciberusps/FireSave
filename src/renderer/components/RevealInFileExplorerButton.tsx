import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Button from "./Button";

type TProps = {
  path: string;
  isDisabled?: boolean;
};

const RevealInFileExplorerButton = (props: TProps) => {
  const { path, isDisabled } = props;
  const { t } = useTranslation();

  const onClickRevealInFileExplorer = useCallback(() => {
    window.api.revealInFileExplorer(path);
  }, [path]);

  return (
    <Button
      icon="openInNew"
      size="small"
      title={t("button.reveal_in_file_explorer.label")}
      isDisabled={isDisabled}
      onClick={onClickRevealInFileExplorer}
    />
  );
};

export default RevealInFileExplorerButton;
