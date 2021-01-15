import { toast, TypeOptions } from "react-toastify";

type TIntent = Exclude<TypeOptions, "default">;
type TAddProps = {
  content: any;
  intent: TIntent;
};

const defaultAutoClose = 5000;

const init = () => {
  toast.configure({
    newestOnTop: true,
    hideProgressBar: true,
    autoClose: defaultAutoClose,
    position: "bottom-right",
  });
};

const add = (props: TAddProps) => {
  const { content, intent } = props;

  let autoClose = defaultAutoClose;
  if (intent === "success") {
    autoClose = 2500;
  }

  toast(content, { type: intent, autoClose });
};

const Toaster = {
  init,
  add,
};

export default Toaster;
