import { css } from "styled-components";

import RobotoBlack from "../../../assets/fonts/Roboto-Black.ttf";
import RobotoBlackItalic from "../../../assets/fonts/Roboto-BlackItalic.ttf";
import RobotoBold from "../../../assets/fonts/Roboto-Bold.ttf";
import RobotoBoldItalic from "../../../assets/fonts/Roboto-BoldItalic.ttf";
import RobotoItalic from "../../../assets/fonts/Roboto-Italic.ttf";
import RobotoLight from "../../../assets/fonts/Roboto-Light.ttf";
import RobotoLightItalic from "../../../assets/fonts/Roboto-LightItalic.ttf";
import RobotoMedium from "../../../assets/fonts/Roboto-Medium.ttf";
import RobotoMediumItalic from "../../../assets/fonts/Roboto-MediumItalic.ttf";
import RobotoRegular from "../../../assets/fonts/Roboto-Regular.ttf";
import RobotoThin from "../../../assets/fonts/Roboto-Thin.ttf";
import RobotoThinItalic from "../../../assets/fonts/Roboto-ThinItalic.ttf";

const Fonts = css`
  @font-face {
    font-family: "Roboto";
    src: url(${RobotoBold}) format("truetype");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoMedium}) format("truetype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoLightItalic}) format("truetype");
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoLight}) format("truetype");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoItalic}) format("truetype");
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoRegular}) format("truetype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoMediumItalic}) format("truetype");
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoBoldItalic}) format("truetype");
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoBold}) format("truetype");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoBoldItalic}) format("truetype");
    font-weight: 800;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoThin}) format("truetype");
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoThinItalic}) format("truetype");
    font-weight: 100;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoBlack}) format("truetype");
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Roboto";
    src: url(${RobotoBlackItalic}) format("truetype");
    font-weight: 900;
    font-style: italic;
    font-display: swap;
  }
`;

export default Fonts;
