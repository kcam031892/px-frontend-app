import { ExtendButtonBase, Tab as MUITab, TabProps, TabTypeMap } from '@material-ui/core';
import React from 'react';

const Tab: React.FC<TabProps> = ({ ...props }) => {
  return <MUITab {...props} />;
};

export default Tab;
