"use client";
import { useEffect } from 'react';

const useDisableRightClick = () => {
  useEffect(() => {
    const disableRightClick: (e: MouseEvent) => void = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);
};

export default useDisableRightClick;
