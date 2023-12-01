import { device } from "./breakpoints";

export const responsiveCSS = (
  name: string,
  desktopXL: number| string ,
  desktop: number| string ,
  laptop: number| string ,
  tablet: number| string ,
  tablet_sm: number| string ,
  mobile: number| string ,
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
