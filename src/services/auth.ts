import firebase from 'firebase';
import { auth } from './firebase';

export const login = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};
export const register = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const socialSignIn = () => {
  return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};
export const logout = () => {
  auth.signOut();
};
