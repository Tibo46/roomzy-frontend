import Layout from 'components/Layout/Layout';
import Home from 'pages/Home/Home';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// const ScrollToTop = () => window.scrollTo(0, 0);

// const PrivateRoute = ({ ...routeProps }) => {
//   const { loginWithRedirect } = useAuth0();

//   if (getAccessToken() === '') {
//     loginWithRedirect();
//   }

//   ScrollToTop();

//   return <Route {...routeProps} />;
// };

const Routes = () => {
  return (
    <Switch>
      <Layout>
        <Route
          exact
          path={''}
          render={() => (
            <Home
              handleOpenSignUp={() => {
                console.log('lol');
              }}
            />
          )}
        />
      </Layout>
    </Switch>
  );
};

export default Routes;
