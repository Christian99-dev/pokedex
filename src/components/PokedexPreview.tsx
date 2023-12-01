import styled from "styled-components";

type PokedexPreviewProps = {};

const PokedexPreview = ({}) => {
  return <PokedexCardWrapper>card</PokedexCardWrapper>;
};

export default PokedexPreview;

const PokedexCardWrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: var(--pink);
`;
