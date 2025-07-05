'use client';

import useDisableRightClick from '@/hooks/useDisableRightClick';
import useDisableInspect from '@/hooks/disableInspect';
import useDisableCopy from '@/hooks/useDisableCopy';

const ClientGuards = () => {
  useDisableRightClick();
  useDisableInspect();
  useDisableCopy();

  return null; // no UI rendered, just logic
};

export default ClientGuards;
