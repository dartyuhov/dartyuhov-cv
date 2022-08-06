import { ReactNode, useCallback } from 'react';
import { showNotification } from '@mantine/notifications';
import { IconX, IconCheck } from '@tabler/icons';

const useNotification = () => useCallback((props: {
    message: ReactNode;
    title: string;
    timeout?: number;
    type: 'success' | 'error' | 'loading';
}) => {
  let color = 'white';
  let icon;
  let loading = false;

  if (props.type === 'success') {
    color = '#12b886';
    icon = (<IconCheck fillOpacity={0} />);
  } else if (props.type === 'error') {
    color = 'red';
    icon = <IconX />;
  } else if (props.type === 'loading') {
    loading = true;
  }

  showNotification({
    title: props.title,
    message: props.message,
    styles: () => ({
      icon: { backgroundColor: `${color} !important` },
    }),
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
