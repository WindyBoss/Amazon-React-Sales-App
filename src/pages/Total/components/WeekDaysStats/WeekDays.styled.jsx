import styled from '@emotion/styled';

export const TableContainer = styled.div`
  max-width: 100%;
  margin-top: 100px;
  margin-left: auto;
  border: ${props => `1px solid ${props.theme.borderColor}`};
  border-radius: 5px;
`;

export const tableCellStyles = (theme, header) => {
  return {
    fontSize: '16px',
    fontFamily: 'Oswald',
    backgroundColor: header ? theme.tableHeaderBgColor : theme.tableBgColor,
    borderColor: theme.tableBorderColor,
    color: theme.mainTextColor,
  };
};