import { Box, Button, Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { MouseEvent } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { showError } from '../../../app/appSlice';
import { RootState } from '../../../app/rootReducer';
import { MyEditor } from '../../../components/textField';
import { isContainsURL } from '../../../utils/textUtils';
import {
  cancelBiographyChange,
  changeBiographyContent,
  fetchProfileBiography,
  saveProfileBiography,
} from './biographySlice';
import { BiographyState } from './biographyTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panelContainer: {
      margin: '41px 144px',
    },
    biographyContainer: {
      border: '2px solid #A4A4A4',
      boxShadow: 'none',
    },
    biographyTitle: {
      marginBottom: '10px',
    },
    biographyEditor: {
      width: '100%',
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

export default function Biography() {
  const dispatch = useDispatch();
  const { profileId } = useParams() as { profileId: string };
  const classes = useStyles();

  const biography: BiographyState = useSelector((state: RootState) => state.biography);

  useEffect(() => {
    dispatch(fetchProfileBiography(profileId));
  }, [dispatch, profileId]);

  const handleContentChange = (content: string) => {
    dispatch(changeBiographyContent(content));
  };

  const handleSaveChange = (event: MouseEvent) => {
    event.stopPropagation();
    if (isContainsURL(biography.tempContent || '')) {
      dispatch(
        showError(
          "Sorry we cannot save your Biography. Please remove any URL's/website links from your Biography in order to save it. For privacy and security, we don't allow links to external sites from this Biography",
        ),
      );
    } else {
      dispatch(saveProfileBiography({ ...biography.model, content: biography.tempContent || '' }));
    }
  };

  const handleCancelChange = () => {
    dispatch(cancelBiographyChange());
  };

  return (
    <Box className={classes.panelContainer}>
      <Card className={classes.biographyContainer}>
        <CardContent>
          <Typography variant="h6" className={classes.biographyTitle}>
            &nbsp; &nbsp;
          </Typography>
          <MyEditor
            content={biography.tempContent}
            key={biography.model.profileId}
            onChange={handleContentChange}
            minHeight={540}
          />
        </CardContent>
      </Card>
      <Box className={classes.actionPanel}>
        <Typography variant="body2" className={classes.noteStyle}>
          Note: No external URL’s are permitted in the Biography and will be auto removed when saved.
        </Typography>
        <Box>
          <Button
            variant="outlined"
            disableElevation
            onClick={handleCancelChange}
            style={{
              marginRight: '16px',
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#2962FF', textTransform: 'none' }}
            onClick={handleSaveChange}
            disableElevation
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
