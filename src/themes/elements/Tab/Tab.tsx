import React from 'react';
import { ExtendButtonBase, Tab as MUITab, TabProps, TabTypeMap } from '@material-ui/core';

const Tab: React.FC<TabProps> = ({ ...props }) => {
  return <MUITab {...props} />;
};

export default Tab;
