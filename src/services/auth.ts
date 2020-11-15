import { auth } from './firebase';

export const login = (email: string, password: string) => {
  auth.signInWithEmailAndPassword(email, password);
};
export const register = (email: string, password: string) => {
  auth.createUserWithEmailAndPassword(email, password);
};
export const logout = () => {
  auth.signOut();
};
