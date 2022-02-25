import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 248;
const drawerCollapseWidth = 104;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: '#212121',
      height: '80px',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerCollapseWidth,
        width: `calc(100% - ${drawerCollapseWidth}px)`,
      },
    },
    appBarShift: {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    drawerContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    menuList: {
      flex: 1,
      margin: '32px 24px',
    },
    myAccountContainer: {
      height: '120px',
    },
    myAccountContent: {
      display: 'flex',
      color: '#000',
      alignItems: 'center',
      padding: '20px',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    headShot: {
      // width: '64px !important',
      // height: '64px !important'
    },
    search: {
      position: 'relative',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      // padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      fontSize: '14px',
      color: '#A4A4A4',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
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
    menuButton: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
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
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main,
      minHeight: '100vh',
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
    collapseContainerSmall: {},
    hidden: {
      display: 'none !important',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    accountMenuOpenButton: {
      color: '#A4A4A4',
    },
    accountMenuActionItem: {
      fontSize: '12px',
    },
  }),
);
