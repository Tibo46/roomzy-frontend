import React from 'react';

//@ts-ignore
export const ModalContext = React.createContext<{
  signInModal: [boolean, React.Dispatch<boolean>];
  signUpModal: [boolean, React.Dispatch<boolean>];
}>();

const ModalProvider: React.FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const signInModal = React.useState<boolean>(false);
  const signUpModal = React.useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        signInModal,
        signUpModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
