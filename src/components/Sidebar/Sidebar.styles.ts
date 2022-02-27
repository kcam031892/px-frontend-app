import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 248;
const drawerCollapseWidth = 104;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    menuList: {
      flex: 1,
      margin: '32px 24px',
    },

    headShot: {
      // width: '64px !important',
      // height: '64px !important'
    },

    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
      height: '80px',
    },

    drawer: {
      // width: drawerWidth,
      // flexShrink: 0,
      // whiteSpace: 'nowrap',
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#212121',
    },
    drawerOpen: {
      backgroundColor: '#212121',
      width: drawerWidth,
      overflowY: 'visible',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowY: 'visible',
      width: drawerCollapseWidth,
      backgroundColor: '#212121',
      '& .MuiListItemText-root': {
        display: 'none',
      },
    },

    collapseContainerSmall: {},
    hidden: {
      display: 'none !important',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    collapseContainer: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: -20,
    },
    collapseButton: {
      position: 'absolute',
      top: -24,
      right: -24,
    },
    myAccountContent: {
      display: 'flex',
      color: '#000',
      alignItems: 'center',
      padding: '20px',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    myAccountContainer: {
      height: '120px',
    },
    accountMenuOpenButton: {
      color: '#A4A4A4',
    },
    accountMenuActionItem: {
      fontSize: '12px',
    },
  }),
);
