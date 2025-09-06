import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface modalProps {
  className: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

function Dialog({ isOpen, onClose, children }: modalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalNode(document.getElementById('modal'));
  }, []);

  if (!portalNode) return null;
  if (!isOpen) return null;

  return createPortal(
    <div
      className='fixed top-0 left-0 w-full h-full bg-black/70 z-[999] flex items-center justify-center'
      onClick={handleOverlayClick}
    >
      <div className='p-6 flex flex-col items-center bg-white rounded-lg'>{children}</div>
    </div>,
    portalNode,
  );
}

export default Dialog;
