import styled from '@emotion/styled';

export const Container = styled.section`
  position: relative;
  max-width: 83%;
  min-width: 83%;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 20px;

  padding: 20px 40px;

  font-family: 'Oswald';

  color: ${props => props.theme.mainTextColor};
  border: ${props => `1px solid ${props.theme.borderColor}`};
`;
