import styled from "@emotion/styled";

export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MarketTitle = styled.h3`
  display: inline-block;
`;

export const MarketContainer = styled.div`
  width: 42%;
  margin: 10px 20px;
  position: relative;
  max-height: 280px;
  border: ${(props) => `1px solid ${props.theme.borderColor}`};
  border-radius: 5px;
  padding: 5px 20px;
`;

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const TimeTitle = styled.p`
  margin-left: 10px;
  max-width: 100px;
  font-size: 20px;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin-left: 50px;
`;

export const ControllersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const AmazonLink = styled.a`
  text-decoration: none;
`;

export const sliderStyles = (theme) => {
  return {
    width: 10,
    height: "20vw",
    marginBottom: "30px",
    color: theme.sliderColor,
  };
};

export const styledPaper = {
  minWidth: "50%",
  maxHeight: "80%",
  marginLeft: "30px",
  marginTop: "-50px",
  fontSize: "11px",
};

export const styledCell = (theme) => {
  return {
    fontSize: "inherit",
    padding: "10px 20px",
    border: `1px solid ${theme.borderColor}`,
    backgroundColor: theme.tableBgColor,
    color: theme.mainTextColor,
    fontFamily: "Oswald",
  };
};
