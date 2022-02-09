// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    borderRadius: string;
    dark: string;
    darkOpacity: string;
    underlay: string;
    purple: string;
    purpleHovered: string;
    white: string;
    feedback: {
      info: string;
      warning: string;
      error: string;
      success: string;
    };
  }
}
