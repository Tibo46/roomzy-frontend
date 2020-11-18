import firebase from 'firebase';
import { auth } from './firebase';

export const login = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const register = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const socialSignIn = (socialNetwork: 'facebook' | 'google') => {
  let provider: firebase.auth.AuthProvider;

  switch (socialNetwork) {
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider();
      break;
    case 'facebook':
      provider = new firebase.auth.FacebookAuthProvider();
      break;
    default:
      throw Error();
  }

  return auth.signInWithPopup(provider);
};

export const logout = () => {
  auth.signOut();
};
