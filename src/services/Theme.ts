import * as Color from "color";
import styled from "styled-components";

/**
 * Here we will define a ThemeProvider containing all of the theme
 * information from our app.
 */
const ThemeValues = {
  colors: {
    text: "#333",
    quiet: "#aaa",
    loud: "#000",
    heading: "#111",
    accent: "#e36",
    get accentDark() { return Color(this.accent).darken(0.4).string(); },
    background: "#fff"
  }
};

console.log(ThemeValues);

