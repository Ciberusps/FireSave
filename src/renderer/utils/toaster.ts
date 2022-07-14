import { toast, TypeOptions } from "react-toastify";

import { TOASTER_DEFAULT_AUTO_CLOSE } from "./config";

export type TIntent = Exclude<TypeOptions, "default">;

type TAddProps = {
  content: any;
  intent: TIntent;
};

const add = (props: TAddProps) => {
  const { content, intent } = props;

  let autoClose = TOASTER_DEFAULT_AUTO_CLOSE;
  if (intent === "success") {
    autoClose = 2500;
  }

  toast(content, { type: intent, autoClose });
};

const Toaster = {
  add,
};

export default Toaster;
