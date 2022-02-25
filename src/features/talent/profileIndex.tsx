import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MyTabs } from '../../components/nav';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useTabStyle } from '../../components/style';
import { Route, Link, Switch, useRouteMatch, useParams, Redirect, useLocation } from 'react-router-dom';
import Resume from './resume';
import Biography from './biography';
import PrimaryImage from './primaryImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabPanel: {},
  }),
);

const tabs = [
  {
    name: 'primaryImage',
    header: 'Primary Image',
    component: <PrimaryImage />,
    disabled: false,
  },
  {
    name: 'biography',
    header: 'Biography',
    component: <Biography />,
    disabled: false,
  },
  {
    name: 'resume',
    header: 'Resume',
    component: <Resume />,
    disabled: false,
  },
  {
    name: 'images',
    header: 'Images',
    component: <div>Images</div>,
    disabled: true,
  },
  {
    name: 'videos',
    header: 'Video',
    component: <div>Videos</div>,
    disabled: true,
  },
  {
    name: 'audios',
    header: 'Audio',
    component: <div>Audios</div>,
    disabled: true,
  },
  {
    name: 'compositeCard',
    header: 'Composite Card',
    component: <div>Composite Card</div>,
    disabled: true,
  },
];

type ProfileProps = {
  profileId: number;
};

export default function ProfileIndex(props: ProfileProps) {
  const tabStyle = useTabStyle();
  let defaultTabName = 'primaryImage';
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
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setActiveTab(newValue);
  };

  const { path, url } = useRouteMatch();

  return (
    <>
      <MyTabs value={activeTab} onChange={handleChange}>
        {tabs.map((x) => {
          return (
            <Tab
              key={x.name}
              label={x.header}
              component={Link}
              disabled={x.disabled}
              to={`${url}/${x.name}`}
              classes={tabStyle}
              value={x.name}
            />
          );
        })}
      </MyTabs>

      <Switch>
        {props.profileId > 0 && (
          <Route exact path={path}>
            <Redirect to={`${url}/${props.profileId}/${defaultTabName}`} />
          </Route>
        )}
        {props.profileId === 0 && (
          <Route exact path={path}>
            <Redirect to={`${url}/${defaultTabName}`} />
          </Route>
        )}
        {props.profileId > 0 && (
          <Route path={`${path}/${props.profileId}/:tabName`}>
            <TabItem onInit={(tabName: string) => setActiveTab(tabName)} />
          </Route>
        )}
        {props.profileId === 0 && (
          <Route path={`${path}/:tabName`}>
            <TabItem onInit={(tabName: string) => setActiveTab(tabName)} />
          </Route>
        )}
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
