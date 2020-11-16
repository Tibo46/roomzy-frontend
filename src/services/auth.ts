import firebase from 'firebase';
import { auth } from './firebase';

export const login = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};
export const register = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const socialSignIn = (socialNetwork: 'facebook' | 'google') => {
  return auth.signInWithPopup(
    socialNetwork === 'google'
      ? new firebase.auth.GoogleAuthProvider()
      : new firebase.auth.FacebookAuthProvider()
  );
};
export const logout = () => {
  auth.signOut();
};
