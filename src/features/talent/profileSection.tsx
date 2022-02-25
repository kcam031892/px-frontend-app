import {
  Box,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Menu,
  MenuItem,
  CardMedia,
  Card,
  CardContent,
  Avatar,
} from '@material-ui/core';
import React, { useState } from 'react';
import { AgencyType } from '../../types';
import { ProfileStatus, ProfileViewModel } from './profileTypes';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileContiner: {
      width: '304px',
      height: '236px',
      position: 'relative',
      borderRadius: 12,
    },
    agencyLogoContainer: {
      display: 'flex',
      height: '250px',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '5px',
    },
    agencyLogo: {
      height: 172,
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    agencyInfo: {
      padding: '12px 16px',
    },
    agencyType: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '24px',
      color: '#25282A',
      maxWidth: '220px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    agencyDetail: {
      fontWeight: 400,
      fontSize: 12,
      color: '#707372',
      lineHeight: '16px',
    },
    agencyPriority: {
      fontWeight: 700,
      fontSize: 10,
      color: '#2962FF',
      lineHeight: '16px',
    },
    profileActionButton: {
      position: 'absolute',
      right: '0px',
      bottom: '20px',
      '& .MuiIconButton-label .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
    actionItem: {
      fontSize: '12px',
    },
    normalLink: {
      textDecoration: 'none',
      color: 'inherit',
    },
    profileFlag: {
      height: 24,
      backgroundColor: '#25282A',
      padding: '4px 8px',
      borderRadius: '6px',
      color: '#fff',
      fontWeight: 900,
      fontSize: 10,
      position: 'absolute',
      top: 28,
      left: 28,
      zIndex: 2,
    },
    pendingFlag: {
      background: 'rgba(37, 40, 42, 0.5)',
    },
    talentAvatar: {
      width: 96,
      height: 96,
    },
  }),
);

export interface ProfileSectionProp {
  profile: ProfileViewModel;
  profileIndex: number;
  onChangePrimary: (profileId: string) => void;
  onDeleteProfile: (profileId: string) => void;
  onChangeRepresentation: (profileId: string) => void;
}

export const ProfileSection = (props: ProfileSectionProp) => {
  const profile = props.profile;
  const classes = useStyles();
  const confirm = useConfirm();
  const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/${profile.agencyLogo}`;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePrimary = (profileId: string) => {
    props.onChangePrimary(profileId);
    setAnchorEl(null);
  };

  const handleChangeRepresentation = (profileId: string) => {
    props.onChangeRepresentation(profileId);
    setAnchorEl(null);
  };

  const handleDeleteProfile = (profileId: string) => {
    confirm({
      title: 'Are you sure you want to delete this profile?',
      description:
        'The content, text or media related to this profile you are deleting, will be removed if you proceed',
    }).then(() => {
      props.onDeleteProfile(profileId);
      setAnchorEl(null);
    });
  };

  return (
    <Grid item style={{ position: 'relative' }}>
      {profile.isPrimary && <Box className={classes.profileFlag}>PRIMARY</Box>}
      {profile.status === ProfileStatus.Pending && (
        <Box
          className={clsx(classes.profileFlag, {
            [classes.pendingFlag]: true,
          })}
        >
          PENDING APPROVAL
        </Box>
      )}
      <Card className={classes.profileContiner}>
        <Link to={profile.status !== ProfileStatus.Pending ? `/app/profiles/${profile.profileId}` : '#'}>
          <CardMedia className={classes.agencyLogo} image={`/StockPhoto-${props.profileIndex}.png`}>
            {profile.agencyType === AgencyType.Freelance && (
              <Avatar
                className={classes.talentAvatar}
                alt={`${props.profile.firstName} ${props.profile.lastName}`}
                src={imageUrl}
              />
            )}
            {profile.agencyType === AgencyType.Represented && (
              <img alt={`${props.profile.agencyName}`} src={imageUrl} />
            )}
          </CardMedia>
        </Link>
        <CardContent className={classes.agencyInfo}>
          <Box className={classes.agencyType}>
            {profile.agencyType === AgencyType.Freelance ? 'Freelance' : profile.agencyName}
          </Box>
          <Box className={classes.agencyDetail}>
            {profile.agencyTalentType} • {profile.agencyStateName} • {profile.agencyCountry}
          </Box>
          <IconButton
            disabled={profile.status === ProfileStatus.Pending}
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            className={classes.profileActionButton}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleClose} className={classes.actionItem}>
              <Link to={`/app/profiles/${profile.profileId}/primaryImage`} className={classes.normalLink}>
                View Profile
              </Link>
            </MenuItem>
            {!profile.isPrimary && (
              <MenuItem onClick={() => handleChangePrimary(profile.profileId)} className={classes.actionItem}>
                Make Primary
              </MenuItem>
            )}
            <MenuItem onClick={() => handleChangeRepresentation(profile.profileId)} className={classes.actionItem}>
              Change Rep
            </MenuItem>
            {!profile.isPrimary && (
              <MenuItem onClick={() => handleDeleteProfile(profile.profileId)} className={classes.actionItem}>
                Delete Profile
              </MenuItem>
            )}
          </Menu>
        </CardContent>
      </Card>
    </Grid>
  );
};
