import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ResumeSection, ResumeState, Direction, ResumeSectionType } from './ResumeTypes';
import { RootState } from '../../../app/rootReducer';
import {
  removeSection,
  orderSection,
  addSection,
  changeText,
  deleteTableRow,
  changeTableConfig,
  changeTitle,
  reorderTableRow,
  fetchResume,
  saveResume,
} from './resumeSlice';
import { ResumeSectionComponent } from './ResumeSection';
import { AddNewIcon } from '../../../components/Icons';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useConfirm } from 'material-ui-confirm';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panelContainer: {
      margin: '41px 144px',
    },

    resumeContainer: {},
    addNewContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'relative',
      '& svg': {
        cursor: 'pointer',
      },
    },
    newSectionPanel: {
      width: '112px',
      height: '110px',
      backgroundColor: '#FFFFFF',
      boxShadow:
        '0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08), 0px 10px 48px rgba(55, 71, 79, 0.08)',
      borderRadius: '4px',
      position: 'absolute',
      top: '-80px',
      right: '20px',
      display: 'none',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '8px 0px 0px 8px',
      backgroundColor: '#FFFFFF',
      boxShadow:
        '0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08), 0px 10px 48px rgba(55, 71, 79, 0.08)',
      borderRadius: '4px',
    },
    buttonContainer: {
      padding: '20px 0px',
      display: 'flex',
      justifyContent: 'flex-start',
      '& .MuiButton-root': {
        backgroundColor: '#000',
        color: '#fff',
      },
    },
    noteStyle: {
      fontSize: '12px',
      color: '#4A4A4A',
    },
    actionPanel: {
      marginTop: '11px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'middle',
    },
  }),
);

export default function Resume() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const confirm = useConfirm();
  const [selectedSection, setSelectedSection] = React.useState(0);
  const [newDialgoOpen, setNewDialgoOpen] = React.useState(false);

  const { profileId } = useParams() as { profileId: string };

  useEffect(() => {
    dispatch(fetchResume(profileId));
  }, [dispatch, profileId]);

  const handleSectionClick = (sectionId: number) => {
    setSelectedSection(selectedSection === sectionId ? 0 : sectionId);
  };
  const resume: ResumeState = useSelector((state: RootState) => state.resume);

  console.log(resume);

  const toRemoveSection = (sectionId: number) => {
    confirm({
      title: 'Are you sure you want to delete this content?',
      description:
        'The content, text or media related to this section you are deleting, will be removed if you proceed',
    }).then(() => {
      dispatch(removeSection(sectionId));
    });
  };

  const toOrderSection = (sectionId: number, direction: Direction) => {
    dispatch(orderSection({ sectionId, direction }));
  };

  const toAddSection = (title: string, type: ResumeSectionType) => {
    dispatch(addSection({ title, type }));
  };

  const toChangeText = (sectionId: number, text: string, row?: number, column?: number) => {
    dispatch(changeText({ sectionId, text, row, column }));
  };

  const toChangeTitle = (sectionId: number, title: string) => {
    dispatch(changeTitle({ sectionId, title }));
  };

  const toDleteTableRow = (sectionId: number, rowIndex: number) => {
    confirm({
      title: 'Are you sure you want to delete this content?',
      description: 'The content, text or media related to this row you are deleting, will be removed if you proceed',
    }).then(() => {
      dispatch(deleteTableRow({ sectionId, rowIndex }));
    });
  };

  const toChangeTableConfig = (sectionId: number, rows: number, columns: number) => {
    dispatch(changeTableConfig({ sectionId, rows, columns }));
  };

  const toReorderTableRow = (sectionId: number, sourceIndex: number, destIndex: number) => {
    dispatch(reorderTableRow({ sectionId, sourceIndex, destIndex }));
  };

  const handleSaveResume = () => {
    dispatch(saveResume(resume.model));
  };

  return (
    <Box onClick={() => setNewDialgoOpen(false)} className={classes.panelContainer}>
      <Box className={classes.resumeContainer}>
        <Grid container spacing={2}>
          {resume.model.sections.map((section: ResumeSection) => {
            return (
              <Grid xs={12} item>
                <ResumeSectionComponent
                  key={section.sectionId}
                  {...section}
                  onRemove={() => toRemoveSection(section.sectionId)}
                  onReOrder={(direction: Direction) => toOrderSection(section.sectionId, direction)}
                  onChangeText={(text: string, row?: number, column?: number) =>
                    toChangeText(section.sectionId, text, row, column)
                  }
                  onDeleteTableRow={(rowIndex: number) => toDleteTableRow(section.sectionId, rowIndex)}
                  onChangeTableConfig={(rows: number, columns: number) =>
                    toChangeTableConfig(section.sectionId, rows, columns)
                  }
                  onChangeTitle={(title: string) => toChangeTitle(section.sectionId, title)}
                  onReorderTableRow={(sourceIndex: number, destIndex: number) =>
                    toReorderTableRow(section.sectionId, sourceIndex, destIndex)
                  }
                  selected={selectedSection === section.sectionId}
                  onSectionClick={(sectionId: number) => handleSectionClick(sectionId)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {resume.model.profileId !== '' && (
        <Box className={classes.actionPanel}>
          <Typography variant="body2" className={classes.noteStyle}>
            Note: No external URL’s are permitted in the Biography and will be auto removed when saved.
          </Typography>
          <Box>
            <Button
              variant="outlined"
              disableElevation
              style={{
                marginRight: '16px',
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              onClick={() => handleSaveResume()}
              style={{
                backgroundColor: '#2962FF',
                textTransform: 'none',
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
