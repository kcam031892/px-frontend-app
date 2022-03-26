import React, { useState } from 'react';
import { useStyles } from './ProfileList.styles';
import { Box, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NewProfileDialog from './NewProfileDialog/NewProfileDialog';
import ProfileListItem from './ProfileListItem/ProfileListItem';
import { Button, useAlert } from 'themes/elements';
import { profileService } from 'shared/services/profileService';
import { RepresentationType } from 'shared/enums/RepresentationType';

const { getProfiles } = profileService();
const ProfileList = () => {
  const { data } = getProfiles();
  const { isOpen: isAlertOpen, alertRef, AlertOpen } = useAlert({ autoHideDuration: 2000, horizontal: 'right' });

  const classes = useStyles();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState<boolean>(false);
  const handleOpenProfileDialog = () => setIsProfileDialogOpen(true);
  const handleCloseProfileDialog = () => setIsProfileDialogOpen(false);
  const hasFreelance = !!data?.data.some(
    (data) => data.attributes.representation_type === RepresentationType.FREELANCE,
  );

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
          data.data.map((profile, index) => <ProfileListItem profile={profile} key={index} />)}
      </Grid>

      {data && (
        <NewProfileDialog
          open={isProfileDialogOpen}
          onClose={handleCloseProfileDialog}
          hasFreelance={hasFreelance}
          profiles={data.data}
          AlertOpen={AlertOpen}
        />
      )}
      {isAlertOpen && alertRef}
    </Box>
  );
};

export default ProfileList;
