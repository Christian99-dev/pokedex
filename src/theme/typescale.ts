import { css } from 'styled-components';
import { device } from './breakpoints';

export default css`
  :root {
	@media ${device.desktopXL} {
		--fs-6: 12px;
		--fs-5: 16px;
		--fs-4: 21px;
		--fs-3: 28px;
		--fs-2: 37px;
		--fs-1: 49px;
	}

	@media ${device.desktop} {
		--fs-6: 13px;
		--fs-5: 16px;
		--fs-4: 20px;
		--fs-3: 25px;
		--fs-2: 31px;
		--fs-1: 39px;
	}

	@media ${device.laptop} {
		--fs-6: 13px;
		--fs-5: 16px;
		--fs-4: 19px;
		--fs-3: 23px;
		--fs-2: 28px;
		--fs-1: 34px;
	}

	@media ${device.tablet} {
		--fs-6: 14px;
		--fs-5: 16px;
		--fs-4: 18px;
		--fs-3: 20px;
		--fs-2: 22px;
		--fs-1: 25px;
	}

	@media ${device.tablet_sm} {
		--fs-6: 15px;
		--fs-5: 16px;
		--fs-4: 17px;
		--fs-3: 18px;
		--fs-2: 19px;
		--fs-1: 21px;
	}

	@media ${device.mobile} {
		--fs-6: 15px;
		--fs-5: 16px;
		--fs-4: 17px;
		--fs-3: 18px;
		--fs-2: 19px;
		--fs-1: 20px;
	}

}
`;