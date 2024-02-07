import styled from "styled-components";

const Icon = ({
  iconname,
  onClick,
  className,
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
`;

export default Icon;
