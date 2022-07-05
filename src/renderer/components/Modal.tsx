import ReactModal, { Props } from "react-modal";
import { useTheme } from "styled-components";
import { transparentize } from "polished";

type TProps = Props;

const Modal = (props: TProps) => {
  const { children, ...restProps } = props;
  const theme = useTheme();

  return (
    <ReactModal
      style={{
        overlay: {
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: transparentize(0.2, theme.background),
        },
        content: {
          display: "flex",
          flexDirection: "column",
          background: theme.underlay,
          position: "relative",
          padding: "25px 25px",
          alignItems: "center",
          borderWidth: "0px",
          borderRadius: "8px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
          overflowY: "auto",
          maxHeight: "90%",
          zIndex: 99999,
        },
      }}
      {...restProps}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
