import {
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { PhotoIcon, VideoIcon, AudioIcon, DocumentIcon } from 'components/Icons';
import React from 'react';
import { useStyles } from './UsageData.styles';

const UsageData = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box>
        <Typography variant="h6">Allowance</Typography>
        <List className={classes.allowanceList}>
          <ListItem disableGutters>
            <ListItemIcon>
              <PhotoIcon />
            </ListItemIcon>
            <ListItemText primary="Images" />
            <ListItemSecondaryAction>
              <Typography>12 / 15</Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <VideoIcon />
            </ListItemIcon>
            <ListItemText primary="Video" />
            <ListItemSecondaryAction>
              <Typography>{Math.floor(23 / 60)} / 5 min</Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <AudioIcon />
            </ListItemIcon>
            <ListItemText primary="Audio" />
            <ListItemSecondaryAction>
              <Typography>Unlimited</Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <DocumentIcon />
            </ListItemIcon>
            <ListItemText primary="Documents" />
            <ListItemSecondaryAction>
              <Typography>Unlimited</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
      <Box>
        <Typography variant="h6">Storage</Typography>
        <Box className={classes.progressBar}>
          <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#25282A' }}>
            1.93 GB of 3 GB used
          </Typography>
          <Typography variant="body2" style={{ color: '#707372' }}>
            64%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={40} className={classes.linearProgress} />
      </Box>
    </Box>
  );
};

export default UsageData;
