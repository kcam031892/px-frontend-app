import React, { Suspense, useState } from 'react';
import { Sidebar } from 'components';
import { Header } from 'components/Header';
import { useStyles } from './Layout.style';
import { useMediaQuery } from '@material-ui/core';
import theme from 'theme';

type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const screenLarge = useMediaQuery(theme.breakpoints.up('md'), {
    noSsr: true,
  });
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isDrawerCollapse, setIsDrawerCollapse] = useState(!screenLarge);
  const handleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  const toggleDrawerCollapse = () => {
    setIsDrawerCollapse((isCollapse) => !isCollapse);
  };

  return (
    <div className={classes.root}>
      <Header handleDrawerToggle={handleMobileDrawer} isDrawerCollapse={isDrawerCollapse} />
      <Sidebar
        handleMobileDrawer={handleMobileDrawer}
        isMobileDrawerOpen={isMobileDrawerOpen}
        isDrawerCollapse={isDrawerCollapse}
        toggleDrawerCollapse={toggleDrawerCollapse}
      />
      <Suspense fallback={<h1>Loading</h1>}>
        <main className={classes.content}>{children}</main>
      </Suspense>
    </div>
  );
};

export default Layout;
