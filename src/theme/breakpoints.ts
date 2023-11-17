export const size = {
  mobile: 411,
  tablet_sm: 768,
  tablet: 1000,
  laptop: 1400,
  desktop: 1921,
};

export const device = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet_sm: `(max-width: ${size.tablet_sm}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
  laptop: `(max-width: ${size.laptop}px)`,
  desktop: `(max-width: ${size.desktop}px)`,
  desktopXL: `(min-width: ${size.desktop}px)`,
};
