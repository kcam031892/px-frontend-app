import React, { useEffect } from 'react';
import { MyTabs } from '../../../components/nav';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { SkillDetail } from './skillDetail';
import { SkillList } from './skillList';
import { useTabStyle } from '../../../components/style';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { RootState } from '../../../app/rootReducer';
import { SkillState, SkillPageType, SkillGroup } from './skillTypes';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  changeGroup,
  applyChanges,
  fetchSkillData,
  changeToListView,
  changeItemStatus,
  changeSkillLevel,
  changeToDetailView,
  saveSkillData,
} from './skillSlice';
import { SkillLevel } from '../../../types';
import { AppState } from '../../../app/appSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      paddingTop: '40px',
    },
    tab: {
      width: '256px',
      borderBottom: 'none',
      '& .MuiTabs-indicator': {
        display: 'none',
      },
      '& .MuiTab-wrapper': {
        color: '#4A4A4A !important',
      },
      '& .Mui-selected .MuiTab-wrapper': {
        color: '#2962FF !important',
      },
    },
    card: {
      border: '1px solid #D9D9D9',
      boxSizing: 'border-box',
      borderRadius: '4px',
    },
    tabLabel: {
      '& span': {
        alignItems: 'flex-start',
        color: '#4A4A4A !important',
        textTransform: 'capitalize',
      },
    },
    formControlLabel: {
      '& svg': {
        width: '18px',
        height: '18px',
      },
    },
    formControlLabelText: {
      fontSize: '14px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export default function Skill() {
  const classes = useStyles();
  const tabStyle = useTabStyle();
  const [currentGroupIndex, setCurrentGroupIndex] = React.useState(0);
  const dispatch = useDispatch();
  const skill: SkillState = useSelector((state: RootState) => state.skill);

  const appState: AppState = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(fetchSkillData(appState.memberId));
  }, [appState.memberId, dispatch]);

  const handleTabChange = (event: React.ChangeEvent<{}>, groupIndex: number) => {
    setCurrentGroupIndex(groupIndex);
    dispatch(changeGroup(groupIndex));
  };

  const handleSaveChanges = () => {
    dispatch(applyChanges());
  };

  const handlePost = () => {
    dispatch(saveSkillData(skill.model));
  };

  const handleChangeToListView = () => {
    dispatch(changeToListView());
  };

  const handleChangeToDetailView = () => {
    dispatch(changeToDetailView());
  };

  const handleChangeItemStatus = (itemId: number, checked: boolean) => {
    dispatch(changeItemStatus({ itemId, checked }));
  };

  const handleChangeSkillLevel = (groupId: number, itemId: number, level: SkillLevel) => {
    dispatch(changeSkillLevel({ groupId, itemId, level }));
  };

  const selectedGroup = skill.model.groups.find((x) => x.id === skill.selectedGroupId);

  return (
    <div className={classes.container}>
      <MyTabs value={currentGroupIndex} onChange={handleTabChange} className={classes.tab} orientation="vertical">
        {skill.model.groups.map((group: SkillGroup, index: number) => {
          return <Tab label={group.name} classes={tabStyle} key={index} />;
        })}
      </MyTabs>
      <div style={{ flex: 1 }}>
        {skill.model.groups.map((group: SkillGroup, index: number) => {
          let selectedCount = 0;
          let totalCount = 0;
          if (skill.pageType === SkillPageType.List) {
            selectedCount = skill.editGroup?.items.filter((x) => x.selected)?.length || 0;
            totalCount = skill.editGroup?.items.length || 0;
          } else if (skill.pageType === SkillPageType.Detail) {
            selectedCount =
              skill.model.groups.find((x) => x.id === skill.selectedGroupId)?.items.filter((x) => x.selected)?.length ||
              0;
            totalCount = skill.model.groups.find((x) => x.id === skill.selectedGroupId)?.items.length || 0;
          }

          return (
            <TabPanel value={currentGroupIndex} index={index} key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" gutterBottom>
                    {skill.pageType === SkillPageType.List ? 'Select' : 'Selected'} <span>{group.name}</span>
                  </Typography>
                  <span>
                    ({selectedCount}/{totalCount} selected)
                  </span>
                </Box>
                <Box style={{ marginBottom: '20px' }}>
                  {skill.pageType === SkillPageType.List && selectedCount > 0 && (
                    <Button
                      variant="outlined"
                      disableElevation
                      style={{ marginRight: '20px' }}
                      onClick={() => handleChangeToDetailView()}
                    >
                      Cancel
                    </Button>
                  )}

                  {skill.pageType === SkillPageType.List && (
                    <Button variant="contained" color="primary" disableElevation onClick={() => handleSaveChanges()}>
                      Save
                    </Button>
                  )}

                  {skill.pageType === SkillPageType.Detail && (
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => handleChangeToListView()}
                    >
                      Select Skills
                    </Button>
                  )}

                  {skill.pageType === SkillPageType.Detail && (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={() => handlePost()}
                      style={{
                        marginLeft: '10px',
                        backgroundColor: '#000',
                        color: '#fff',
                      }}
                    >
                      Save Changes
                    </Button>
                  )}
                </Box>
              </div>
              {skill.pageType === SkillPageType.List && skill.editGroup && (
                <SkillList group={skill.editGroup} onItemChange={handleChangeItemStatus} />
              )}

              {skill.pageType === SkillPageType.Detail && selectedGroup && (
                <SkillDetail group={selectedGroup} onChangeSkillLevel={handleChangeSkillLevel} />
              )}
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
}
