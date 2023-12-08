// import { BounceLoader } from "react-spinners";
import styled from "styled-components";

const LoadingBanner = () => {
  return (
    <LoadingBannerWrapper>
      <h1>Loading</h1>
      {/* <BounceLoader color="#36d7b7" size={300} /> */}
    </LoadingBannerWrapper>
  );
};

export default LoadingBanner;

const LoadingBannerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--pink);
  h1 {
    margin: 0;
  }
`;
