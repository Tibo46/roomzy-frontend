import React from 'react';
import { auth, db } from 'services/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { login, logout, register } from 'services/auth';

const Home = () => {
  const [value, loading, error] = useDocument(
    db.doc('rooms/iQyRNrz8ULPE08PX37q4'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [user, loadingAuth, errorAuth] = useAuthState(auth);

  return (
    <>
      <h1>Home page</h1>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value && <span>Document: {JSON.stringify(value.data())}</span>}
      </p>
      <button>Create new room</button>
      <button onClick={() => login('test_user@gmail.com', 'Password123')}>
        Log in
      </button>
      <button onClick={() => register('tibo.lacan@gmail.com', 'Password123')}>
        Register
      </button>
      {user && (
        <div>
          <p>Current User: {user.email}</p>
          <button onClick={() => logout()}>Log out</button>
        </div>
      )}
    </>
  );
};

export default Home;
