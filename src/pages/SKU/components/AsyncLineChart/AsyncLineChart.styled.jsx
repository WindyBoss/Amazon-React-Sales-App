import styled from "@emotion/styled";

export const ChartContainer = styled.div`
  width: 48%;
  display: flex;
  margin-right: 30px;
  margin-bottom: 30px;
`;

export const MarketContainer = styled.div`
  width: 44%;
  border: ${(props) => `1px solid ${props.theme.borderColor}`};
  border-radius: 5px;
  padding: 20px 30px;
  margin: 5px;
`;

export const AmazonLink = styled.a`
  text-decoration: none;
`;

export const sliderStyles = (theme) => {
  return {
    maxWidth: "70%",
    marginLeft: "20%",
    color: theme.sliderColor,
  };
};

export const styledPaper = {
  minWidth: "80%",
  maxHeight: "20%",
  marginLeft: "30px",
  fontSize: "14px",
};

export const styledCell = (theme) => {
  return {
    fontSize: "inherit",
    border: `1px solid ${theme.borderColor}`,
    backgroundColor: theme.tableBgColor,
    color: theme.mainTextColor,
    fontFamily: "Oswald",
  };
};
