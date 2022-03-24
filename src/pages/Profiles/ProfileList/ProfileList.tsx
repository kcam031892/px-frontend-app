import React, { useState } from 'react';
import { useStyles } from './ProfileList.styles';
import { Box, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NewProfileDialog from './NewProfileDialog/NewProfileDialog';
import ProfileListItem from './ProfileListItem/ProfileListItem';
import { Button } from 'themes/elements';
import { profileService } from 'shared/services/profileService';
import { RepresentationType } from 'shared/enums/RepresentationType';

const { getProfiles } = profileService();
const ProfileList = () => {
  const { data } = getProfiles();
  const profileList = Array.from({ length: 12 }).fill('');
  const classes = useStyles();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState<boolean>(false);
  const handleOpenProfileDialog = () => setIsProfileDialogOpen(true);
  const handleCloseProfileDialog = () => setIsProfileDialogOpen(false);
  const hasFreelance = !!data?.data.some(
    (data) => data.attributes.representation_type === RepresentationType.FREELANCE,
  );

  console.log(hasFreelance);

  return (
    <Box className={classes.container}>
      <Box className={classes.pageHeader}>
        <Typography className={classes.header}>My Profiles</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenProfileDialog} customVariant="newButton">
          New Profile
        </Button>
      </Box>
      <Grid container spacing={3}>
        {data &&
          data.data.length > 0 &&
          data.data.map((profile, index) => <ProfileListItem attributes={profile.attributes} key={index} />)}
      </Grid>
      <NewProfileDialog open={isProfileDialogOpen} onClose={handleCloseProfileDialog} hasFreelance={hasFreelance} />
    </Box>
  );
};

export default ProfileList;
