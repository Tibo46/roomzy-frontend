import Layout from 'components/Layout/Layout';
import Home from 'pages/Home/Home';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

const ScrollToTop = () => window.scrollTo(0, 0);

// const PrivateRoute = ({ ...routeProps }) => {
//   const { loginWithRedirect } = useAuth0();

//   if (getAccessToken() === '') {
//     loginWithRedirect();
//   }

//   ScrollToTop();

//   return <Route {...routeProps} />;
// };

const Routes = () => {
  const { pathname } = useLocation();
  return (
    <Switch>
      <Layout>
        <Route exact path={''} render={() => <Home />} />
      </Layout>
    </Switch>
  );
};

export default Routes;
