import React, { useState } from 'react';
import { useStyles } from './ProfileList.style';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NewProfileDialog from './NewProfileDialog/NewProfileDialog';
import ProfileListItem from './ProfileListItem/ProfileListItem';

const ProfileList = () => {
  const profileList = Array.from({ length: 12 }).fill('');
  const classes = useStyles();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState<boolean>(false);
  const handleOpenProfileDialog = () => setIsProfileDialogOpen(true);
  const handleCloseProfileDialog = () => setIsProfileDialogOpen(false);
  return (
    <Box className={classes.container}>
      <Box className={classes.pageHeader}>
        <Typography className={classes.header}>My Profiles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className={classes.newProfileButton}
          onClick={handleOpenProfileDialog}
        >
          New Profile
        </Button>
      </Box>
      <Grid container spacing={3}>
        {profileList.map((i, index) => (
          <ProfileListItem key={index} />
        ))}
      </Grid>
      <NewProfileDialog open={isProfileDialogOpen} onClose={handleCloseProfileDialog} />
    </Box>
  );
};

export default ProfileList;
