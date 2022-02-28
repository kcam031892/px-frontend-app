import React from 'react';
import { useStyles } from './Header.style';
import clsx from 'clsx';
import { AppBar, IconButton, InputBase, Toolbar } from '@material-ui/core';
import { SearchIcon } from 'components/Icons';
import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  isDrawerCollapse?: boolean;
  handleDrawerToggle: () => void;
};

const Header: React.FC<Props> = ({ isDrawerCollapse, handleDrawerToggle }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: !isDrawerCollapse,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          className={clsx(classes.menuButton, {})}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
