import styled from "styled-components";

const Icon = ({
  iconname,
  onClick,
  className
}: {
  iconname: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <IconWrapper
    className={className}
      src={`/static/${iconname}`}
      alt={`${iconname}`}
      onClick={onClick}
    ></IconWrapper>
  );
};

const IconWrapper = styled.img`
  max-block-size: 28px;
  cursor: pointer;
/* 
  &:hover{
    box-shadow: 0px 0px 5px 0.27px rgba(255, 255, 255, 0.5);
  } */
`;

export default Icon;
