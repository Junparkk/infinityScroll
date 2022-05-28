import React from 'react';
import styled from 'styled-components';

const Card = ({ title, contents, image, idx }) => {
  return (
    <Box>
      <p>{idx + 1}</p>
      <ImageWrapper>
        <img src={image} alt="" width="100%" height="100%" />
      </ImageWrapper>
      <p>{title}</p>
      <p>{contents}</p>
    </Box>
  );
};

export default Card;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  margin: 1px;
`;

const ImageWrapper = styled.div`
  aspect-ratio: 3 / 2;
`;
