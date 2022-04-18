import { Card, Box, CardMedia, CardContent, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import IMedia from 'shared/interfaces/IMedia';
import { IProfileMediaSetSelectPayload } from 'shared/interfaces/IProfile';
import { formatBytes } from 'shared/utils/formatBytes';
import { useStyles } from './VideoItem.styles';

type Props = {
  handleEditVideo: () => void;
  item: IMedia;
  handleSetSelect: (payload: IProfileMediaSetSelectPayload) => void;
};
const HiddenVideo: React.FC<Props> = ({ item, handleEditVideo, handleSetSelect }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    handleEditVideo();
  };

  const handleSelectVideo = () => {
    handleSetSelect({
      medium_id: item.id,
    });
  };
  return (
    <Card className={clsx(classes.card, [classes.card__hideImage])}>
      <Box className={classes.card__media}>
        <CardMedia
          component="img"
          image="https://picsum.photos/250/300"
          title="Live from space album cover"
          height="250"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <CardContent className={classes.card__content}>
        <Box>
          <Typography variant="h6" className={classes.card__title}>
            {item.attributes.file_name}
          </Typography>
          <Typography variant="subtitle1" className={classes.card__subtitle}>
            {formatBytes(item.attributes.file_size)}
          </Typography>
        </Box>
        <Box className={classes.card__actions}>
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                width: 256,
              },
            }}
          >
            <MenuItem style={{ height: 40 }} onClick={handleSelectVideo}>
              Select Video
            </MenuItem>
            <MenuItem onClick={() => handleEdit()}>Edit Video</MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HiddenVideo;
