import React, { useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/Login/SignIn";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Login/SignUp";
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";

const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center", width: "100%", fontSize: "70px" }}>
      <h1>404 Page not found</h1>
    </div>
  );
};

function App() {
  const Routing = () => {
    return (
      <Routes>
        <Route path="/" exact Component={Home}></Route>
        <Route path="/signup" Component={SignUp}></Route>
        <Route path="/signin" Component={SignIn}></Route>
        <Route path='forgot-password' Component={ForgotPassword}></Route>
        <Route path='reset-password/:id/:token' Component={ResetPassword}></Route>

        <Route path="*" Component={PageNotFound}></Route>
      </Routes>
    );
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Routing />
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
