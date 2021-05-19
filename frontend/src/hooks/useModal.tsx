import { useState, createContext, ReactNode, useContext } from 'react';

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  visible: boolean;
  handleOpen: () => void;
  handleOk: () => void;
  handleCancel: () => void;
}

const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData
);

export function ModalProvider({ children }: ModalProviderProps) {
  const [visible, setVisible] = useState(false);

  function handleOpen() {
    setVisible(true);
  }

  function handleCancel() {
    setVisible(false);
  }

  function handleOk() {
    setVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{
        visible,
        handleOpen,
        handleCancel,
        handleOk,
      }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  return context;
}
