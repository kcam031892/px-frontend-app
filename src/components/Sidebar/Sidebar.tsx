import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Hidden,
  Drawer,
  List,
} from '@material-ui/core';
import { logOut } from 'app/appSlice';
import { ExpandIcon, CollapseIcon } from 'components/Icons';
import { Logo } from 'components/nav';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import theme from 'theme';
import { useStyles } from './Sidebar.styles';
import clsx from 'clsx';
import { useMainListeItemStyle } from 'components/style';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { SIDEBAR_ITEMS } from 'shared/constants/SIDEBAR_ITEMS';
import { MyAccountState } from 'features/settings/myAccount/myAccountTypes';
import { useAuth } from 'shared/hooks/useAuth';
import { tokenService } from 'shared/services/tokenService';
import { selectUserState, userLogout } from 'shared/redux/slicers/user.slicer';
import { ROUTES } from 'shared/constants/ROUTES';
import { Backdrop } from 'themes/elements';
// import { RootState } from 'app/rootReducer';
// import { PrimaryImageState } from 'features/talent/primaryImage/primaryImageTypes';
// import { ProfileState } from 'features/talent/profileTypes';

type Props = {
  isMobileDrawerOpen?: boolean;
  handleMobileDrawer: () => void;
  isDrawerCollapse?: boolean;
  toggleDrawerCollapse: () => void;
};

const { getUser } = tokenService();

const Sidebar: React.FC<Props> = ({
  isMobileDrawerOpen,
  handleMobileDrawer,
  isDrawerCollapse,
  toggleDrawerCollapse,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const listItemStyle = useMainListeItemStyle();
  const [selectedMenu, setSelectedMenu] = React.useState('');
  const { isLoading, user } = useSelector(selectUserState);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const myAccount: MyAccountState = useSelector((state: RootState) => state.myAccount);
  // const primaryImage: PrimaryImageState = useSelector((state: RootState) => state.primaryImage);
  // const profile: ProfileState = useSelector((state: RootState) => state.profile);

  // const displayImage = () => {
  //   if (primaryImage.model.image.length > 0) {
  //     return primaryImage.model.image;
  //   }

  //   return profile.profiles.find((x) => x.isPrimary)?.primaryImage || '';
  // };

  const handleLogOut = async () => {
    await dispatch(userLogout());
    history.push(ROUTES.LOGIN);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleNavItemHover = (over: boolean) => {
    // if (over) {
    //   if (isDrawerCollapse) {
    //     setCurrentCollapseState(drawerCollapse);
    //     setDrawerCollapse(false);
    //   }
    // } else {
    //   setDrawerCollapse(currentCollapseState);
    // }
  };

  const drawer = (
    <div className={classes.drawerContainer}>
      <div className={classes.drawerHeader}>
        <Link to={ROUTES.APP.PROFILE}>
          <Logo />
        </Link>
      </div>
      <List
        className={classes.menuList}
        onMouseEnter={() => handleNavItemHover(true)}
        onMouseLeave={() => handleNavItemHover(false)}
      >
        {SIDEBAR_ITEMS.map((item) => {
          return (
            <ListItem
              button
              key={item.name}
              selected={selectedMenu === item.name}
              disabled={!item.link}
              component={Link}
              to={item.link || ''}
              onClick={() => setSelectedMenu(item.name)}
              classes={listItemStyle}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
      <div
        className={classes.myAccountContainer}
        onClick={() => {
          setSelectedMenu('');
        }}
      >
        <div
          className={clsx(classes.collapseContainer, {
            [classes.collapseContainerSmall]: isDrawerCollapse,
          })}
        >
          <IconButton onClick={toggleDrawerCollapse}>
            {isDrawerCollapse ? (
              <ExpandIcon
                width="48"
                height="48"
                viewBox="0 0 48 48"
                style={{ width: 48, height: 48 }}
                className={classes.collapseButton}
              />
            ) : (
              <CollapseIcon
                width="48"
                height="48"
                viewBox="0 0 48 48"
                style={{ width: 48, height: 48 }}
                className={classes.collapseButton}
              />
            )}
          </IconButton>
        </div>
        <div>
          <Box className={classes.myAccountContent}>
            <Link to="/app/settings">
              {/* <Avatar
                alt={myAccount.model.firstName + ' ' + myAccount.model.lastName}
                src={displayImage()}
                className={classes.headShot}
              /> */}
            </Link>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#fff',
                  padding: '20px',
                }}
                className={clsx({
                  [classes.hidden]: isDrawerCollapse,
                })}
              >
                <Link to="/app/settings" style={{ textDecoration: 'none' }}>
                  <h4
                    style={{
                      margin: '0px 0px 0px 0px',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                    }}
                  >
                    {/* {myAccount.model.firstName} {myAccount.model.lastName} */}
                    {`${user?.attributes?.first_name || ''} ${user?.attributes?.last_name || ''}`}
                  </h4>
                </Link>
                <Link to="/app/settings" style={{ textDecoration: 'none' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#B6B7B7',
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                    }}
                  >
                    My Account
                  </span>
                </Link>
              </div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                className={clsx({
                  [classes.hidden]: isDrawerCollapse,
                })}
              >
                <MoreVertIcon style={{ color: '#707372' }} />
              </IconButton>
              <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleMenuClose}>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={isMobileDrawerOpen}
          onClose={handleMobileDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: !isDrawerCollapse,
            [classes.drawerClose]: isDrawerCollapse,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: !isDrawerCollapse,
              [classes.drawerClose]: isDrawerCollapse,
            }),
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Backdrop isLoading={isLoading} />
    </>
  );
};

export default Sidebar;
