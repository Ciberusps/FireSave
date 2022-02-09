import React from "react";
import LazyLoad from "react-lazyload";

const placeholderPath = "/static/images/placeholder.png";

type TProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string | undefined;
  width: string | number;
  height: string | number;
};

const Image = (props: TProps) => {
  const { src, width, height, className, ...restProps } = props;
  return (
    <LazyLoad
      height={height}
      once={true}
      placeholder={
        <img width={width} height={height} src={placeholderPath} className={className} />
      }
    >
      <img
        width={width}
        height={height}
        src={src || placeholderPath}
        className={className}
        {...restProps}
      />
    </LazyLoad>
  );
};

export default Image;
