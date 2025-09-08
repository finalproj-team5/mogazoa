import { ReactElement, useCallback, useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const renderModal = useCallback(
    <T extends object>(
      ModalComponent: React.ComponentType<T & { isOpen: boolean; onClose: () => void }>,
      props: T,
    ): ReactElement | null =>
      isOpen ? <ModalComponent {...props} isOpen={isOpen} onClose={closeModal} /> : null,
    [isOpen, closeModal],
  );

  return { isOpen, openModal, closeModal, renderModal };
};

export default useModal;
