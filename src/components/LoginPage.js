import React from "react";
import {
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
import InputForm from "./InputForm.js";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    const {onLogin, onRegister} = this.props

    let grow = {flexGrow: "1"};
    let smoothDivStyle ={width: "400px"}

    return (
      <CenteredContainer className="gradient-background">
        <Banner> Broadcast </Banner>
        <SmoothDiv style={smoothDivStyle}>
              <ColumnFlexContainer>
                <Switch>
                  <Route path={"/login"}>
                    <form id="login-form"
                          onSubmit={evt => onLogin(evt, this.formRef)}
                          action="/signup"
                          method="post"
                          ref={this.formRef}
                    >
                      <StyledInput id="login-username" placeholder="Login…" type="text" />
                      <StyledInput id="login-password" placeholder="Password…" type="password" />
                      <RowFlexContainer>
                        <StyledButton onClick={()=>{this.formRef.current.dispatchEvent(new Event('submit'))}}
                                      style={grow}
                        > SIGN IN </StyledButton>
                        <Link to="/register">
                          <StyledButton type="button"> SIGN UP </StyledButton>
                        </Link>
                      </RowFlexContainer>
                    </form>
                  </Route>
                  <Route path={"/register"}>
                    <form id="register-form"
                          onSubmit={evt => onRegister(evt, this.formRef)}
                          action="/signup"
                          method="post"
                          ref={this.formRef}
                    >
                      <StyledInput id="register-username" placeholder="Login…" type="text" />
                      <StyledInput id="register-password" placeholder="Password…" type="password" />
                      {/*<StyledInput placeholder="Repeat Password…" type="password" />*/}
                      <StyledInput id="register-email" placeholder="Email…" type="email" />
                      <RowFlexContainer>
                        <StyledButton onClick={()=>{this.formRef.current.dispatchEvent(new Event('submit'))}}
                                      style={grow}
                        > SIGN UP </StyledButton>
                        <Link to="/login">
                          <StyledButton type="button"> GO BACK </StyledButton>
                        </Link>
                      </RowFlexContainer>
                    </form>
                  </Route>
                </Switch>
              </ColumnFlexContainer>
        </SmoothDiv>
      </CenteredContainer>
    );
  }
};

export default LoginPage;
