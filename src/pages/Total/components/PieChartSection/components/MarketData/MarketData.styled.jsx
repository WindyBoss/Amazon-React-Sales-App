import styled from '@emotion/styled';

export const MarketContainer = styled.div`
  border: ${props => `1px solid ${props.theme.borderColor}`};
  margin-top: 20px;
  padding: 20px 50px;
  border-radius: 5px;
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 50px;
  min-width: 100px;
`;
