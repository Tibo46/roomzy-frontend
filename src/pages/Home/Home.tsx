import React from 'react';
import firebase from 'firebase';
import { db } from 'services/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import Button from 'components/MuiOverrides/Button/Button';
import { ModalContext } from 'context/ModalProvider';

const Home: React.FC = () => {
  const [value, loading, error] = useDocument(
    db.doc('rooms/iQyRNrz8ULPE08PX37q4'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [user] = useAuthState(firebase.auth());

  const { signUpModal } = React.useContext(ModalContext);

  const [, setIsSignUpModalOpen] = signUpModal;

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
          !user && setIsSignUpModalOpen(true);
        }}
      >
        Create a room
      </Button>
    </>
  );
};

export default Home;
