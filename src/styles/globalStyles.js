import { css, createGlobalStyle } from "styled-components";
const fontSizeBase = "1";
const defaultSpacer = "1";
const theme = {
  spacers: [
    0,
    defaultSpacer * 0.5,
    defaultSpacer,
    defaultSpacer * 1.5,
    defaultSpacer * 2,
    defaultSpacer * 2.5,
  ],
  fonts: [
    0,
    fontSizeBase * 10,
    fontSizeBase * 1.75,
    fontSizeBase * 1.5,
    fontSizeBase * 1.25,
    fontSizeBase,
    fontSizeBase * 0.875,
  ],
};
const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'Noto Sans TC', sans-serif;
  }
  a{
    text-decoration: none;
  }
  ${theme.fonts.map(
    (font, fontKey) => css`
      .fs-${fontKey} {
        font-size: ${font}rem !important;
      }
    `
  )}
  ${theme.spacers.map(
    (spacer, spacerKey) => css`
      .m-${spacerKey} {
        margin: ${spacer}rem !important;
      }
      .p-${spacerKey} {
        padding: ${spacer}rem !important;
      }
      ${["top", "right", "bottom", "left"].map(
        (dir) => css`
        .m${dir[0]}-${spacerKey}{
          margin-${dir}: ${spacer}rem;
        }
        .p${dir[0]}-${spacerKey}{
          padding-${dir}: ${spacer}rem;
        }
      `
      )}
    `
  )}
`;
export default GlobalStyle;
