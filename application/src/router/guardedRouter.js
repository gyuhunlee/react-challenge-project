import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

const GuardedRouter = ({ component: Component, auth: { token }, ...rest}) => {
  return (
    <Route {...rest}
      render={props => token ?
        <Component {...props}/> :
        <Redirect to='/login'/>}
    />
  )
}


export default connect(mapStateToProps)(GuardedRouter);