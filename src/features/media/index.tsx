import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MyTabs } from '../../components/nav';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useTabStyle } from '../../components/style';
import { Route, Link, Switch, useRouteMatch, useLocation, Redirect, useParams } from 'react-router-dom';
import Images from './images';
import Videos from './videos';
import Audios from './audios';
import Documents from './documents';
import Dashboard from './dashboard';
import Uploader from './uploader';
import { AppState } from '../../app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { queryMedia, queryPhotos } from './mediaSlice';
import { MediaType } from '../../types';

const tabs = [
  {
    name: 'dashboard',
    header: 'Dashboard',
    component: <Dashboard />,
    disabled: false,
  },
  {
    name: 'images',
    header: 'Images',
    component: <Images />,
    disabled: false,
  },
  {
    name: 'videos',
    header: 'Videos',
    component: <Videos />,
    disabled: false,
  },
  {
    name: 'audios',
    header: 'Audios',
    component: <Audios />,
    disabled: false,
  },
  {
    name: 'documents',
    header: 'Documents',
    component: <Documents />,
    disabled: true,
  },
  {
    name: 'upload',
    header: 'Upload',
    component: <Uploader />,
    disabled: false,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabLabel: {
      '& span': {
        alignItems: 'flex-start',
        color: '#4A4A4A !important',
        textTransform: 'capitalize',
      },
    },
    tabPanel: {
      // padding: '0 144px',
      // marginTop: '16px'
    },
  }),
);

export default function Media() {
  const tabStyle = useTabStyle();
  let defaultTabName = 'dashboard';
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const pathName = usePathname();
  tabs.forEach((x) => {
    if (pathName.indexOf(x.name) > 0) {
      defaultTabName = x.name;
    }
  });

  const [activeTab, setActiveTab] = React.useState(defaultTabName);
  const { path, url } = useRouteMatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setActiveTab(newValue);
  };

  const dispatch = useDispatch();
  const appState: AppState = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(queryPhotos(appState.memberId));
    dispatch(queryMedia(appState.memberId, MediaType.VIDEO));
    dispatch(queryMedia(appState.memberId, MediaType.AUDIO));
  }, [appState.memberId, dispatch]);
  return (
    <>
      <MyTabs value={activeTab} onChange={handleChange}>
        {tabs.map((x) => {
          return (
            <Tab
              label={x.header}
              key={x.name}
              disabled={x.disabled}
              component={Link}
              to={`${url}/${x.name}`}
              classes={tabStyle}
              value={x.name}
            />
          );
        })}
      </MyTabs>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}/${defaultTabName}`} />
        </Route>
        <Route path={`${path}/:tabName`}>
          <TabItem onInit={(tabName: string) => setActiveTab(tabName)} />
        </Route>
      </Switch>
    </>
  );
}

interface TabItemProps {
  onInit: (tabName: string) => void;
}

function TabItem(props: TabItemProps) {
  const { tabName } = useParams() as { tabName: string };
  const classes = useStyles();
  return <Box className={classes.tabPanel}>{tabs.find((x) => x.name === tabName)?.component}</Box>;
}
