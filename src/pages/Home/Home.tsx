import React from 'react';
import { db } from 'services/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import Button from 'components/MuiOverrides/Button/Button';

const Home: React.FC<{ handleOpenSignUp: () => void }> = ({
  handleOpenSignUp,
}) => {
  const [value, loading, error] = useDocument(
    db.doc('rooms/iQyRNrz8ULPE08PX37q4'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [user] = useAuthState(firebase.auth());

  return (
    <>
      <h1>Home page</h1>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value && <span>Document: {JSON.stringify(value.data())}</span>}
      </p>
      <Button
        onClick={() => {
          !user && handleOpenSignUp();
        }}
      >
        Create a room
      </Button>
      {/* <button
        onClick={() => {
          !user && setIsLoginModalOpen(true);
        }}
      >
        Create new room
      </button> */}
    </>
  );
};

export default Home;
