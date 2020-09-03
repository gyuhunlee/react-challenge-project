import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import GuardedRouter from './guardedRouter';

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <GuardedRouter path="/order" exact component={OrderForm} />
      <GuardedRouter path="/view-orders" exact component={ViewOrders} />
    </Router>
  );
}

export default AppRouter;
