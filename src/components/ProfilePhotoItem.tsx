import {
  IconButton,
  ImageListItem,
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Divider,
} from '@material-ui/core';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { ImageWarnIcon, VideoPlayIcon } from './icon';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconBox: {
      position: 'absolute',
      right: 0,
      top: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    menuButton: {
      background: 'rgba(37, 40, 42, 0.6)',
      marginLeft: 8,
      padding: 8,
      fontSize: 16,
      '& svg': {
        fontSize: 16,
        color: '#fff',
      },
      '&.MuiIconButton-root:hover': {
        background: 'rgba(37, 40, 42, 0.6)',
      },
    },
    photoItem: {
      height: '100%',
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    quanlityIssue: {
      border: '2px solid #F44336',
    },
    infoContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    imageName: {
      fontWeight: 700,
      fontSize: 14,
      color: '#25282A',
    },
    imageInfo: {
      color: '#707372',
      fontWeight: 400,
      fontSize: 12,
    },
    imageTag: {
      fontWeight: 900,
      color: '#707372',
      fontSize: 10,
    },
  }),
);

export interface ProfilePhotoProps {
  onEditImage: () => void;
  onHandlePlay?: () => void;
  src: string;
  title?: string;
  badQuality: boolean;
  isVideo?: boolean;
}

export default function ProfilePhotoItem(props: React.PropsWithChildren<ProfilePhotoProps>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isActive, setIsActive] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hanldeEdit = () => {
    setAnchorEl(null);
    if (props.onEditImage) {
      props.onEditImage();
    }
  };

  const handlePlay = () => {
    if (props.onHandlePlay) {
      props.onHandlePlay();
    }
  };

  const classes = useStyles();
  return (
    <Box
      style={{ backgroundImage: `url(${props.src})` }}
      title={props.title}
      className={clsx(classes.photoItem, {
        [classes.quanlityIssue]: props.badQuality,
      })}
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Box className={classes.iconBox}>
        {props.badQuality && <ImageWarnIcon width="24" height="24" viewBox="0 0 24 24" />}
        {isActive && (
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.menuButton}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 256,
          },
        }}
      >
        <MenuItem style={{ cursor: 'auto' }}>
          <Box className={classes.infoContainer}>
            <Box style={{ margin: '0 20px 0 0' }}>
              <img src="/jpg.png" alt="" />
            </Box>
            <Box>
              <Typography variant="body1" className={classes.imageName}>
                JemmaRivera.Jpg
              </Typography>
              <Typography variant="body1" className={classes.imageInfo}>
                2.67 MB • 1920 x 1080 px
              </Typography>
              <Typography variant="body1" className={classes.imageTag}>
                HEADSHOT, ON SET
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => hanldeEdit()} style={{ height: 40, marginTop: 8 }}>
          View/Edit
        </MenuItem>
        <MenuItem style={{ height: 40 }}>Download</MenuItem>
        <MenuItem style={{ height: 40 }}>Delete</MenuItem>
      </Menu>
      {props.isVideo && (
        <IconButton>
          <VideoPlayIcon
            onClick={handlePlay}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            style={{ fontSize: 40 }}
          ></VideoPlayIcon>
        </IconButton>
      )}
    </Box>
  );
}
