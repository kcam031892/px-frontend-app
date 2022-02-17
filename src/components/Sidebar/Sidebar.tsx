import React from 'react';

import SidebarMenu from './SidebarMenu';
import { SidebarWrapper } from './Sidebar.styled';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarMenu />
    </SidebarWrapper>
  );
};

export default Sidebar;
