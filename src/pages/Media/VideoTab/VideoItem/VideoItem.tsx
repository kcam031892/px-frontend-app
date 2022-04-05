import { Box, Divider, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { VideoPlayIcon } from 'components/Icons';
import React, { useState } from 'react';

import { useStyles } from './VideoItem.styles';

type Props = {
  src: string;
  handleEditVideo: () => void;
};
const VideoItem: React.FC<Props> = ({ src, handleEditVideo }) => {
  const classes = useStyles();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    handleEditVideo();
  };

  return (
    <Box
      className={classes.videoItemContainer}
      style={{ backgroundImage: `url(${src})` }}
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Icon Top Right */}
      <Box className={classes.iconContainer}>
        {isActive && (
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            className={classes.menuButton}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>

      {/* Menu */}
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 256,
          },
        }}
      >
        {/* Image Details */}
        <MenuItem style={{ cursor: 'auto' }}>
          <Box className={classes.imageInfo}>
            <Box className={classes.imageInfo__imageContainer}>
              <img src="/mp3.png" alt="" />
            </Box>
            <Box>
              <Typography variant="body1" className={classes.imageInfo__imageName}>
                No Title Yet
              </Typography>
              <Typography variant="body1" className={classes.imageInfo__imageDetails}>
                25 • 25 x 25 px
              </Typography>
              <Typography variant="body1" className={classes.imageInfo__tags}>
                {['nice', 'hello'].join(', ')}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        {/* Divider */}
        <Divider />
        {/* Image Actions  */}
        <MenuItem style={{ marginTop: 8, height: 40 }} onClick={() => handleEdit()}>
          View/Edit
        </MenuItem>
        <MenuItem style={{ height: 40 }}>
          <a>Download</a>
        </MenuItem>
        <MenuItem style={{ height: 40 }}>Delete</MenuItem>
      </Menu>
      <IconButton onClick={() => handleEdit()}>
        <VideoPlayIcon width="40" height="40" viewBox="0 0 40 40" style={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default VideoItem;
