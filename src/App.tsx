


import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Header } from './layout/header';
import { MainLayout } from './layout/layout';
import './styles/layout.scss';
import { GlobalStyles } from './styles/variables';


function App() {
  

  return (
    <>
    <Router>
    <GlobalStyles />
   <Header />
   <PerfectScrollbar>
    <Switch>
      <Route path={'/'} ><MainLayout/></Route>
      </Switch>
      </PerfectScrollbar>
    </Router>
    
    </>
  );
}

export default App;

