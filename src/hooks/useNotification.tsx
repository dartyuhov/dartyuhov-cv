import { ReactNode, useCallback } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons';

const useNotification = () => useCallback((props: {
    message: ReactNode;
    title: string;
    timeout?: number;
    type: 'success' | 'error' | 'loading';
}) => {
  const color = props.type === 'error' ? 'red' : undefined;
  let icon;
  let loading = false;

  if (props.type === 'success') {
    icon = <IconCheck color="teal" />;
  } else if (props.type === 'error') {
    icon = <IconX color={color} />;
  } else if (props.type === 'loading') {
    loading = true;
  }

  showNotification({
    title: props.title,
    message: props.message,
    radius: 'md',
    icon,
    loading,
    closeButtonProps: {
      'aria-label': 'Hide notification',
    },
    disallowClose: props.type === 'loading',
    autoClose: props.timeout,
  });
}, [showNotification]);

export default useNotification;
