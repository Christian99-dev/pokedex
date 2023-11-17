import { device } from "./breakpoints";

export const responsiveCSS = (
  name: string,
  desktopXL: number,
  desktop: number,
  laptop: number,
  tablet: number,
  tablet_sm: number,
  mobile: number,
  end = "px"
) => {
  return `
    @media ${device.desktopXL}    {${name} : ${desktopXL}${end}}
    @media ${device.desktop}      {${name} : ${desktop}${end}}
    @media ${device.laptop}       {${name} : ${laptop}${end}}
    @media ${device.tablet}       {${name} : ${tablet}${end}}
    @media ${device.tablet_sm}    {${name} : ${tablet_sm}${end}}
    @media ${device.mobile}       {${name} : ${mobile}${end}}
  `;
};
