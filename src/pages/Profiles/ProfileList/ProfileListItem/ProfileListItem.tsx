import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './ProfileListItem.styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ROUTES } from 'shared/constants/ROUTES';
import { IProfile } from 'shared/interfaces/IProfile';
import { RepresentationType } from 'shared/enums/RepresentationType';

type Props = {
  profile: IProfile;
};
const ProfileListItem: React.FC<Props> = ({ profile }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item className={classes.container}>
      <Box className={classes.profileFlag}>
        <span style={{ textTransform: 'uppercase' }}>
          {profile.attributes.primary ? 'PRIMARY' : profile.attributes.status}
        </span>
      </Box>
      <Card className={classes.card}>
        <Link to={`${ROUTES.APP.PROFILE_DETAIL}/primary_image`}>
          <CardMedia image={profile.attributes.agency_banner_url ?? ''} className={classes.card__media}>
            <Avatar src={profile.attributes.primary_image_url} className={classes.card__avatar} />
          </CardMedia>
        </Link>
        <CardContent className={classes.card__content}>
          <Typography variant="body1" className={classes.agency__type}>
            {profile.attributes.representation_type === RepresentationType.FREELANCE
              ? 'Freelance'
              : profile.attributes.agency_name}
          </Typography>
          <Typography variant="body2" className={classes.agency__detail}>
            {profile.attributes.agency_state} • {profile.attributes.agency_country}
          </Typography>

          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            className={classes.profile__action__button}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={handleMenuClose} className={classes.action__item}>
              <Link to={`/app/profiles/primaryImage`} className={classes.action__link}>
                View Profile
              </Link>
            </MenuItem>

            {!profile.attributes.primary && <MenuItem className={classes.action__item}>Make Primary</MenuItem>}

            <MenuItem className={classes.action__item}>Change Rep</MenuItem>
            {!profile.attributes.primary && <MenuItem className={classes.action__item}>Delete Primary</MenuItem>}
          </Menu>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfileListItem;
