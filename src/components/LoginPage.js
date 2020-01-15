import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {
  colors,
  CenteredContainer,
  SmoothDiv,
  ColumnFlexContainer,
  RowFlexContainer,
  StyledButton,
  StyledInput,
  Banner,
} from "./SharedStyledComponents.js";
import "../styles/gradient.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let grow = {flexGrow: "1", color: colors.white};
    let smoothDivStyle ={width: "400px"}

    return (
      <Router>
        <CenteredContainer className="gradient-background">
          <Banner> Broadcast </Banner>
          <SmoothDiv style={smoothDivStyle}>
              <form>
                <ColumnFlexContainer>
                  <Switch>
                    <Route path={"/login"}>
                      <StyledInput placeholder="Login…" type="text" />
                      <StyledInput placeholder="Password…" type="password" />
                      <RowFlexContainer>
                        <StyledButton style={grow} className="gradient"> SIGN IN </StyledButton>
                        <Link to="/register">
                          <StyledButton type="button"> SIGN UP </StyledButton>
                        </Link>
                      </RowFlexContainer>
                    </Route>
                    <Route path={"/register"}>
                      <StyledInput placeholder="Login…" type="text" />
                      <StyledInput placeholder="Email…" type="email" />
                      <StyledInput placeholder="Password…" type="password" />
                      <StyledInput placeholder="Repeat Password…" type="password" />
                      <RowFlexContainer>
                        <StyledButton style={grow} className="gradient"> SIGN UP </StyledButton>
                        <Link to="/login">
                          <StyledButton type="button"> GO BACK </StyledButton>
                        </Link>
                      </RowFlexContainer>
                    </Route>
                  </Switch>
                </ColumnFlexContainer>
              </form>
          </SmoothDiv>
        </CenteredContainer>
      </Router>
    );
  }
};

export default LoginPage;
