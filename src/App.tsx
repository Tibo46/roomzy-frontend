import React from 'react';
import { db } from 'services/firebase';

const App = () => {
  db.collection('test')
    .doc('iQyRNrz8ULPE08PX37q4')
    .onSnapshot({
      next: (querySnapshot) => {
        console.log('OMFG', querySnapshot.data());
      },
    });
  return <div>asdas</div>;
};

export default App;
