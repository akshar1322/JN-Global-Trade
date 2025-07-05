import { useEffect } from 'react';

const useDisableCopy = () => {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);
};

export default useDisableCopy;
