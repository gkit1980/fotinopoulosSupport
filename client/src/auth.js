import React from 'react';
import { Navigate } from 'react-router-dom';

function withAuthCheck(WrappedComponent, isLoggedIn) {
  return function(props) {
    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/authentication/sign-in" />;
    }
  };
}

export default withAuthCheck;