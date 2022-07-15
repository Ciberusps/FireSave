import React from "react";
import LazyLoad from "react-lazyload";

import placeholderImg from "../../../assets/images/placeholder.png";

type TProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string | undefined;
  width: string | number;
  height: string | number;
};

const Image = (props: TProps) => {
  const { src, width, height, className, alt } = props;
  return (
    <LazyLoad
      height={height}
      once
      placeholder={
        <img
          width={width}
          height={height}
          src={placeholderImg}
          alt={alt || ""}
          className={className}
        />
      }
    >
      <img
        width={width}
        height={height}
        src={src || placeholderImg}
        alt={alt || ""}
        className={className}
      />
    </LazyLoad>
  );
};

export default Image;
