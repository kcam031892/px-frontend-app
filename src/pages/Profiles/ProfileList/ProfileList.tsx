import React from 'react';
import { useStyles } from './ProfileList.style';
import { Box, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const ProfileList = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.pageHeader}>
        <Typography className={classes.header}>My Profiles</Typography>
        <Button variant="contained" startIcon={<AddIcon />} className={classes.newProfileButton}>
          New Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileList;
