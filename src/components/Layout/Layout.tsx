import React from 'react';
import {
  AppBar,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from 'services/auth';
import { auth } from 'services/firebase';

import { ModalContext } from 'context/ModalProvider';

import Button from 'components/MuiOverrides/Button/Button';
import SignIn from 'components/SignIn/SignIn';
import SignUp from 'components/SignUp/SignUp';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const classes = useStyles();
  const { signInModal, signUpModal } = React.useContext(ModalContext);

  const [isSignInModalOpen, setIsSignInModalOpen] = signInModal;
  const [isSignUpModalOpen, setIsSignUpModalOpen] = signUpModal;

  const [user] = useAuthState(auth);

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Roomzy
          </Typography>
          {user ? (
            <Button variant="text" color="inherit" onClick={() => logout()}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="text"
                color="inherit"
                onClick={() => setIsSignInModalOpen(true)}
              >
                Sign In
              </Button>
              <Button
                color="secondary"
                onClick={() => setIsSignUpModalOpen(true)}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <SignIn
        isOpen={isSignInModalOpen}
        handleSignInClose={() => setIsSignInModalOpen(false)}
        handleOpenSignUp={() => {
          setIsSignInModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />
      <SignUp
        isOpen={isSignUpModalOpen}
        handleSignUpClose={() => setIsSignUpModalOpen(false)}
        handleOpenSignIn={() => {
          setIsSignUpModalOpen(false);
          setIsSignInModalOpen(true);
        }}
      />
      {children}
    </>
  );
};

export default Layout;
