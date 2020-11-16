import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Button from 'components/MuiOverrides/Button/Button';
import TextField from 'components/TextField/TextField';
import React from 'react';
import { register, socialSignIn } from 'services/auth';

const SignUp: React.FC<{
  isOpen: boolean;
  handleSignUpClose: () => void;
  handleOpenSignIn: () => void;
}> = ({ isOpen, handleSignUpClose, handleOpenSignIn }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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

  const handleSignUpGoogle = async () => {
    const result = await socialSignIn();

    if (!result.user) {
      console.error('sign up failed');
      return;
    }
    console.log('sign up success');
    handleSignUpClose();
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="lg"
      onClose={handleSignUpClose}
    >
      <DialogTitle>Sign in to Roomzy</DialogTitle>
      <DialogContent>
        <Button variant="text" onClick={handleOpenSignIn}>
          Already a member? Sign In
        </Button>
        <Button variant="text" onClick={handleSignUpGoogle}>
          Sign Up with Google
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
