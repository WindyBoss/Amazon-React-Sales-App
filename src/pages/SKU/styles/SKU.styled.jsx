import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
`;

export const PieContainer = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
`;

export const PieChartContainer = styled.div`
  margin-top: 100px;
`;

export const MarketSalesSectionContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 20px 40px;
  margin-top: 20px;
  max-width: 86%;
`;

export const CheckboxContainer = styled.div`
  display: inline-flex;
  border: ${(props) => `${props.theme.borderColor}`};
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  max-height: 200px;
  margin-left: auto;
  margin-bottom: 30px;
  margin-right: 20px;
`;

export const AsyncLineChartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MainInfoContainer = styled.div`
  display: flex;
`;

export const LocalNavigationContainer = styled.div`
  position: fixed;
  right: 0px;
  top: 130px;
  border: ${(props) => `1px solid ${props.theme.borderColor}`};
  z-index: 10000;
  background-color: ${(props) => props.theme.navigationBgColor};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  min-width: 13%;
  color: ${(props) => props.theme.mainTextColor};
`;

export const TableSectionContainer = styled.div`
  display: flex;
  position: relative;
`;

export const TableStickyContainer = styled.div`
  position: sticky;
  top: 150px;
  max-height: 200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

export const ConclusionTableContainer = styled.div`
  border: ${(props) => `1px solid ${props.theme.borderColor}`};
  border-radius: 5px;
  padding: 10px 30px;
  margin-top: 50px;
`;

export const ConclusionTitle = styled.h4`
  text-align: center;
  font-size: 20px;
`;

export const ConclusionEl = styled.div`
  display: flex;
`;

export const styledCell = (theme, header) => {
  return {
    fontSize: "inherit",
    border: `1px solid ${theme.borderColor}`,
    backgroundColor: header ? theme.tableHeaderBgColor : theme.tableBgColor,
    color: theme.mainTextColor,
    fontFamily: "Oswald",
    maxWidth: "10%",
  };
};

export const styledPaper = (theme) => {
  return {
    backgroundColor: "transparent",
    color: theme.mainTextColor,
    fontFamily: "Oswald",
    borderRadius: "5px",
    padding: "30px",
    minWidth: "80%",
  };
};
