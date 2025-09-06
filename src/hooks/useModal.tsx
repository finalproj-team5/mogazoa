import { ReactElement, useCallback, useState } from 'react';

const useModal = () => {
  const [isOpen, setisOpen] = useState(false);

  const openModal = useCallback(() => setisOpen(true), []);
  const closeModal = useCallback(() => setisOpen(false), []);

  const renderModal = useCallback(
    (ModalComponent: React.ElementType, props: any = {}): ReactElement | null =>
      isOpen ? <ModalComponent {...props} isOpen={isOpen} onClose={closeModal} /> : null,
    [isOpen, closeModal],
  );

  return { isOpen, openModal, closeModal, renderModal };
};

export default useModal;
