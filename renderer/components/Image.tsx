import React from "react";
import LazyLoad from "react-lazyload";

type TProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Image = (props: TProps) => {
  const { className, ...restProps } = props;
  return (
    <LazyLoad once={true}>
      <img className={className} {...restProps} />
    </LazyLoad>
  );
};

export default Image;
