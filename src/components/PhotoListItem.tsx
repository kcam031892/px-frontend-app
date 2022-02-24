import {
  IconButton,
  ImageListItem,
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Divider,
  Link,
} from '@material-ui/core';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { ImageWarnIcon, VideoPlayIcon } from './icon';
import { bytesToSize } from '../utils/numberUtil';
import { standardHeightPixel, standardWidthPixel } from '../utils/constants';
import { useConfirm } from 'material-ui-confirm';
import axios from 'axios';
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
      width: '170px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
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
    badQualityWarnning: {
      padding: '12px 16px',
      background: 'rgba(244, 67, 54, 0.08)',
    },
    badQualityWarnningTitle: {
      color: '#F44336',
      fontSize: 14,
      fontWeight: 'bold',
    },
    badQualityWarnningText: {
      color: '#25282A',
      fontSize: 12,
      marginTop: 8,
    },
  }),
);

export interface PhotoListeItemProps {
  onEditImage: () => void;
  onDeleteImage: () => void;
  id: number;
  title: string;
  src: string;
  size: number;
  width: number;
  height: number;
  tags: string[];
}

export default function PhotoListItem(props: React.PropsWithChildren<PhotoListeItemProps>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isActive, setIsActive] = React.useState(false);
  const [dismiss, setDismiss] = React.useState(false);
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

  const confirm = useConfirm();

  const handleDeletePhoto = () => {
    setAnchorEl(null);
    confirm({
      title: 'Are you sure you want to delete this photo?',
      description: 'The photo will be removed from related profile if you proceed',
    }).then(() => {
      if (props.onDeleteImage) {
        props.onDeleteImage();
      }
    });
  };

  const downloadUrl = `${process.env.REACT_APP_API_URL}/api/v2/download?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&mediaId=${props.id}&mediaType=2`;

  const classes = useStyles();
  const badQuality = props.width < standardWidthPixel || props.height < standardHeightPixel;
  return (
    <Box
      style={{
        backgroundImage: `url(${props.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
      title={props.title}
      className={clsx(classes.photoItem, {
        [classes.quanlityIssue]: badQuality,
      })}
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Box className={classes.iconBox}>
        {badQuality && <ImageWarnIcon width="24" height="24" viewBox="0 0 24 24" />}
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
                {props.title}
              </Typography>
              <Typography variant="body1" className={classes.imageInfo}>
                {bytesToSize(props.size)} • {props.width} x {props.height} px
              </Typography>
              <Typography variant="body1" className={classes.imageTag}>
                {(props.tags || []).join(', ')}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => hanldeEdit()} style={{ height: 40, marginTop: 8 }}>
          View/Edit
        </MenuItem>
        <MenuItem style={{ height: 40 }}>
          <a download href={downloadUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
            Download
          </a>
        </MenuItem>
        <MenuItem style={{ height: 40 }} onClick={() => handleDeletePhoto()}>
          Delete
        </MenuItem>
        {badQuality && !dismiss && (
          <MenuItem className={classes.badQualityWarnning}>
            <Box>
              <Typography variant="body1" className={classes.badQualityWarnningTitle}>
                Image quality below standard
              </Typography>
              <Typography variant="body1" className={classes.badQualityWarnningText}>
                {' '}
                View our{' '}
                <a href="#" style={{ color: '#25282A' }}>
                  guide
                </a>{' '}
                here on selecting the best <br />
                quality media for your profile.
              </Typography>

              <Link
                style={{
                  color: '#F44336',
                  marginTop: 24,
                  fontSize: 12,
                  display: 'inline-block',
                }}
                onClick={() => setDismiss(true)}
              >
                Dismiss
              </Link>
            </Box>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
