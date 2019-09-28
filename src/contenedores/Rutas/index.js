import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TestPagina from '../Test';
import ProgramaPagina from '../ProgramaPagina';
import InventarioPagina from '../InventarioPagina';

const RutasAssy = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route component={ProgramaPagina} exact={true} path='/' />
          <Route component={InventarioPagina} exact={true} path='/hhp' />
          <Route component={TestPagina} exact={true} path='/test' />
        </Switch>
      </Router>
    </div>
  );
};

export default RutasAssy;
