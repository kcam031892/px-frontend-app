import { Box, Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { ProfileViewModel, RepresentationRequestType } from './profileTypes';
import { ProfileSection } from './profileSection';
import NewProfileDialog from './newProfileDialog';
import { AgencyType } from '../../types';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { Guid } from 'guid-typescript';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../app/appSlice';
import { RootState } from '../../app/rootReducer';
import { changePresentationRequest, changeProfilePrimary, deleteMyProfile } from './profileSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '0 24px',
    },
    header: {
      margin: '50px 0px 41px 8px',
      fontWeight: 700,
      fontSize: 34,
    },
    pageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    newProfileButton: {
      background: '#FFFFFF',
      boxShadow:
        '0px 6px 8px rgba(37, 40, 42, 0.02), 0px 8px 16px rgba(37, 40, 42, 0.04), 0px 10px 24px rgba(37, 40, 42, 0.06)',
      borderRadius: '48px',
      color: '#25282A',
      fontWeight: 700,
      fontSize: 18,
    },
  }),
);

export interface ProfileListProp {
  profiles: ProfileViewModel[];
}

interface ProfileListState {
  dialogOpen: boolean;
  dialogId: string;
  changeProfileId: string;
}

export const ProfileList = (props: ProfileListProp) => {
  const classes = useStyles();
  const [state, setState] = useState<ProfileListState>({
    dialogOpen: false,
    dialogId: Guid.create().toString(),
    changeProfileId: '',
  });
  const handleClose = () => {
    setState({ ...state, dialogOpen: false, dialogId: Guid.create().toString(), changeProfileId: '' });
  };

  const appState: AppState = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();
  const handleChangeRepresentationPost = (agencyId: number, note: string) => {
    const profileId =
      state.changeProfileId.length > 0
        ? state.changeProfileId
        : props.profiles.find((x) => x.isPrimary)?.profileId || '';
    dispatch(
      changePresentationRequest(
        appState.memberId,
        profileId,
        agencyId,
        state.changeProfileId.length > 0 ? RepresentationRequestType.CHANGE : RepresentationRequestType.ADD,
        note,
      ),
    );
    setState({ ...state, dialogOpen: false, dialogId: Guid.create().toString(), changeProfileId: '' });
  };
  const handleDeleteProfile = (profileId: string) => {
    dispatch(deleteMyProfile(profileId));
  };

  const handleChangePrimary = (profileId: string) => {
    dispatch(changeProfilePrimary(profileId));
  };

  const handleChangeRepresentation = (profileId: string) => {
    setState({ ...state, dialogOpen: true, dialogId: Guid.create().toString(), changeProfileId: profileId });
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.pageHeader}>
        <Typography className={classes.header}>My Profiles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className={classes.newProfileButton}
          onClick={() => setState({ ...state, dialogOpen: true })}
        >
          New Profile
        </Button>
      </Box>
      <Grid container spacing={3}>
        {props.profiles.map((profile: ProfileViewModel, index) => {
          return (
            <ProfileSection
              profile={profile}
              key={index}
              profileIndex={index}
              onChangePrimary={handleChangePrimary}
              onDeleteProfile={handleDeleteProfile}
              onChangeRepresentation={handleChangeRepresentation}
            ></ProfileSection>
          );
        })}
      </Grid>
      <NewProfileDialog
        key={state.dialogId}
        open={state.dialogOpen}
        onClose={handleClose}
        onSubmit={handleChangeRepresentationPost}
        hasFreelance={props.profiles.find((x) => x.agencyType === AgencyType.Freelance) !== null}
        existedAgencyIds={props.profiles
          .filter((x) => x.agencyType !== AgencyType.Freelance)
          .map((x) => x.agencyId || 0)}
      />
    </Box>
  );
};
