import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Home } from "../pages/home/home";

const MainDiv = styled.div`
width: 100%;
-webkit-box-align: center;
top: 118px;
display: flex;
-webkit-box-pack: center;
-ms-flex-pack: center;
justify-content: center;
overflow: overlay;
position: relative;
}
`;

const MiddleSectionDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 71px;
`;
export const MainLayout = () => {


  return (
    <>
      <MainDiv>
        <MiddleSectionDiv>
          <Switch>
            <Route path={`/`} exact={true}>
              <div style={{ background: `var('--color-text') !important` }}>
                <Home />
              </div>
            </Route>
          </Switch>
        </MiddleSectionDiv>
      </MainDiv>
    </>
  );
};
