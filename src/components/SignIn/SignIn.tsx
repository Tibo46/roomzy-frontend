import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Button from 'components/MuiOverrides/Button/Button';
import Link from 'components/MuiOverrides/Link/Link';
import TextField from 'components/TextField/TextField';
import React from 'react';
import { login, socialSignIn } from 'services/auth';

const SignIn: React.FC<{
  isOpen: boolean;
  handleSignInClose: () => void;
  handleOpenSignUp: () => void;
}> = ({ isOpen, handleSignInClose, handleOpenSignUp }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await login(email, password);

    if (!result.user) {
      console.error('login failed');
      return;
    }
    console.log('logged in');
    handleSignInClose();
  };
  const handleSocialSignIn = async (socialNetwork: 'facebook' | 'google') => {
    const result = await socialSignIn(socialNetwork);

    if (!result.user) {
      console.error('sign in failed');
      return;
    }
    console.log('sign in success');
    handleSignInClose();
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="lg"
      onClose={handleSignInClose}
    >
      <DialogTitle>Welcome back</DialogTitle>
      <DialogContent>
        <Button variant="text" onClick={handleOpenSignUp}>
          Not a member? Sign up now
        </Button>
        <Button variant="text" onClick={() => handleSocialSignIn('google')}>
          Sign In with Google
        </Button>
        <Button variant="text" onClick={() => handleSocialSignIn('facebook')}>
          Sign In with Facebook
        </Button>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            helperText={<Link href="#">Forgot password?</Link>}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
          />
          <Button type="submit">Sign In</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
