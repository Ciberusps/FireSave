import { useCallback } from "react";
import Tippy, { TippyProps } from "@tippyjs/react/headless";
import styled from "styled-components";
import { useSpring, motion } from "framer-motion";

type TProps = TippyProps & {
  text: string;
  children: any;
};

const Tooltip = (props: TProps) => {
  const { text, children, ...restProps } = props;
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  const onMount = useCallback(() => {
    scale.set(1);
    opacity.set(1);
  }, [scale, opacity]);

  const onHide = useCallback(
    // @ts-ignore
    ({ unmount }) => {
      const cleanup = scale.onChange((value) => {
        if (value <= initialScale) {
          cleanup();
          unmount();
        }
      });

      scale.set(initialScale);
      opacity.set(0);
    },
    [opacity, scale]
  );

  return (
    <Tippy
      render={(attrs) => (
        <Box style={{ scale, opacity }} {...attrs}>
          {text}
        </Box>
      )}
      animation
      onMount={onMount}
      onHide={onHide}
      {...restProps}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;

const Box = styled(motion.div)`
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
