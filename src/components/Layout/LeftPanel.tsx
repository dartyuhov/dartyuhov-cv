import { FC, ReactNode } from 'react';
import { Drawer } from '@mantine/core';

import './LeftPanel.css';

type Props = {
  opened: boolean,
  onClose: () => void,
  children: ReactNode
};

const LeftPanel: FC<Props> = ({ opened, onClose, children }) => (
  <Drawer
    opened={opened}
    onClose={onClose}
    color="dark"
    title="Menu"
    padding="md"
    size="md"
    lockScroll={false}
    id="drawer"
  >
    {children}
  </Drawer>
);

export default LeftPanel;
