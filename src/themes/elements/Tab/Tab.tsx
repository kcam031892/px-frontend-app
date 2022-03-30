import { Tab as MUITab, TabProps } from '@material-ui/core';
import React from 'react';

const Tab: React.FC<TabProps> = ({ ...props }) => {
  return <MUITab {...props} />;
};

export default Tab;
