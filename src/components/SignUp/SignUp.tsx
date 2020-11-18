import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import { ModalContext } from 'context/ModalProvider';
import { register, socialSignIn } from 'services/auth';

import Button from 'components/MuiOverrides/Button/Button';
import TextField from 'components/TextField/TextField';

const SignUp: React.FC = () => {
  const { signInModal, signUpModal } = React.useContext(ModalContext);

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [, setSignInModalOpen] = signInModal;
  const [signUpModalOpen, setSignUpModalOpen] = signUpModal;

  const handleOpenSignIn = () => {
    setSignUpModalOpen(false);
    setSignInModalOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await register(email, password);

    if (!result.user) {
      console.error('sign up failed');
      return;
    }
    console.log('sign up success');
    handleSignUpClose();
  };

  const handleSocialSignIn = async (socialNetwork: 'facebook' | 'google') => {
    const result = await socialSignIn(socialNetwork);

    if (!result.user) {
      console.error('sign up failed');
      return;
    }
    console.log('sign up success');
    handleSignUpClose();
  };

  return (
    <Dialog
      open={signUpModalOpen}
      fullWidth={true}
      maxWidth="lg"
      onClose={handleSignUpClose}
    >
      <DialogTitle>Sign in to Roomzy</DialogTitle>
      <DialogContent>
        <Button variant="text" onClick={handleOpenSignIn}>
          Already a member? Sign In
        </Button>
        <Button variant="text" onClick={() => handleSocialSignIn('google')}>
          Sign Up with Google
        </Button>
        <Button variant="text" onClick={() => handleSocialSignIn('facebook')}>
          Sign Up with Facebook
        </Button>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            label="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type="text"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="email"
          />
          <TextField
            label="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
