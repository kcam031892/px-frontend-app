import { Box, Button, Typography } from '@material-ui/core';

import React from 'react';
import { useStyles } from './Profile.style';
import AddIcon from '@material-ui/icons/Add';

const Profile = () => {
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

export default Profile;
