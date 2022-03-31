import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { useWindowSize } from '@react-hook/window-size';
import { UsageData } from 'components';
import { AudioIcon, DocumentIcon, MediaUploadIcon, PhotoIcon, VideoIcon } from 'components/Icons';
import React from 'react';
import { Button } from 'themes/elements';

import { useStyles } from './Dashboard.styles';

const Dashboard = () => {
  const classes = useStyles();
  const [width] = useWindowSize();
  const imageColl = Math.floor(((width - 240) * 8) / 12 / 180);
  const imageHeight = Math.floor(180 * 1.25);
  return (
    <Box className={classes.container}>
      <Box className={classes.pageHeader}>
        <Typography className={classes.header}>Media</Typography>
        <Button variant="contained" startIcon={<MediaUploadIcon />} customVariant="newButton">
          Upload Media
        </Button>
      </Box>
      <Grid container spacing={10}>
        {/* Image List */}
        <Grid item xs={12} lg={8}>
          <Box>
            <Typography className={classes.sectionTitle}>Images</Typography>
            <ImageList rowHeight={imageHeight} cols={imageColl} gap={8} className={classes.imageList}>
              <ImageListItem cols={1}>
                <img src={`https://picsum.photos/200/300`} />
              </ImageListItem>
              <ImageListItem cols={2}>
                <img src={`https://picsum.photos/200/300`} />
              </ImageListItem>
            </ImageList>
          </Box>
        </Grid>

        {/* Usage Data */}
        <Grid item xs={12} lg={4}>
          <UsageData />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
