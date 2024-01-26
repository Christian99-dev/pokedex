import { BounceLoader } from "react-spinners";
import styled from "styled-components";

const LoadingBanner = () => {
  return (
    <LoadingBannerWrapper>
      <h1>Loading</h1>
      <BounceLoader />
    </LoadingBannerWrapper>
  );
};

export default LoadingBanner;

const LoadingBannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  background-color: var(--dark);

  h1 {
    padding-bottom: var(--space-xxl);
    margin: 0;
    color: var(--pink);
  }

  span{
    width: 200px !important;
    height: 200px !important;

    >*{
      background-color: var(--pink) !important;
    }
  }
`;
