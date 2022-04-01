import { useState, useCallback } from 'react';

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    if (!isOpen) setIsOpen(true);
  }, [isOpen]);
  const onClose = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  return { isOpen, onOpen, onClose };
};

export default useDisclosure;
