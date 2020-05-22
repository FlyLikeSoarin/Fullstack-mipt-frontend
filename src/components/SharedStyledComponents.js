import styled from "styled-components";

const colors = {
  blue: "#008CDA",
  grey: "#3030305C",
  white: "#FFFFFF",
  black: "#000000",
}

const CenteredContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScreenContainer = styled.div`
  height: 100vh;
`;

const SmoothDiv = styled.div`
  background-color: ${colors.grey};
  /* border-style: solid;
  border-width: 15px; */
  padding: 15px 10px;
  border-radius: 10px;
  border-color: ${colors.grey};
`;

const SmoothSolidWhiteDiv = styled.div`
  background-color: ${colors.white};
  /* border-style: solid;
  border-width: 15px; */
  padding: 15px 10px;
  border-radius: 10px;
  border-color: ${colors.white};
`;

const SmoothSolidBlackDiv = styled.div`
  background-color: ${colors.black};
  /* border-style: solid;
  border-width: 15px; */
  padding: 15px 10px;
  border-radius: 10px;
  border-color: ${colors.black};
`;

const RowFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ColumnFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.div`
  color: #0099CC;
  background: transparent;
  border-radius: 5px;
  text-decoration: none;
  text-transform: uppercase;
  color: white;
  padding: 8px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;

  background-color: white;
  color: black;
  /* border: 2px solid ${colors.blue}; */

  :hover {
    background-color: ${colors.grey} !important;
    color: white;
  }
`;

const StyledInput = styled.input`
  display: block;
  font-size: 16px;
  padding: 5px;
  margin: 4px 2px;
  border: none;
  /* border: 2px solid ${colors.grey}; */
  border-radius: 5px;
  color: #333;
  transition: all 0.3s ease-out;

  width: calc(100% - calc(8px + 5px));
  background-color: ${colors.white};

  :hover {
    /* border-ras */
  }

  :focus {
    outline: none;
    /* border-radius: 8px;
    border-color: #EBD292; */
    background-color: ${colors.grey} !important;
    color: white;
  }
`;

const Banner = styled.div`
  font-size: 50px;
  margin: 50px;
  color: ${colors.white}
  transition: all 0.3s ease-out;
  cursor: default;
`;

const MiniBanner = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 0px 20px 0px 10px;
  color: ${colors.white}
  cursor: default;
`;

const MicroBanner  = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin: 10px 20px 10px 10px;
  color: ${colors.white}
  cursor: default;
`;

const ScrollBody = styled.div`
  display: block;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
`;

export {
  colors,
  CenteredContainer,
  SmoothDiv,
  SmoothSolidWhiteDiv,
  SmoothSolidBlackDiv,
  RowFlexContainer,
  ColumnFlexContainer,
  StyledButton,
  StyledInput,
  Banner,
  MiniBanner,
  MicroBanner,
  ScrollBody,
  ScreenContainer,
};
