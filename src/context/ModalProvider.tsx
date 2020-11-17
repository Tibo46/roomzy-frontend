import React from 'react';

const ModalProvider: React.FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const [modalStates, setModalStates] = React.useState({
    signInModalOpen: false,
    signUpModalOpen: false,
  });

  const Context = React.createContext([modalStates, setModalStates]);

  return (
    <Context.Provider value={[modalStates, setModalStates]}>
      {children}
    </Context.Provider>
  );
};

export default ModalProvider;
