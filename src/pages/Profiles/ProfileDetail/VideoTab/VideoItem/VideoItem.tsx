import { Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import clsx from 'clsx';
import { MoveIcon } from 'components/Icons';
import React, { useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import { useStyles } from './VideoItem.styles';

type Props = {
  isHideVideo?: boolean;
  providedDraggable?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  isDragging?: boolean;
  handleEditVideo: () => void;
};
const VideoItem: React.FC<Props> = ({ isHideVideo, providedDraggable, isDragging, snapshot, handleEditVideo }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const handleEdit = () => {
    handleCloseMenu();
    handleEditVideo();
  };
  return (
    <Card
      className={clsx(classes.card, {
        [classes.card__hideImage]: isHideVideo,
        [classes.card__isDragging]: snapshot?.isDragging,
      })}
    >
      {!isHideVideo && providedDraggable && snapshot && (
        <div
          className={classes.card__moveIcon}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, providedDraggable.draggableProps.style)}
        >
          <IconButton>
            <MoveIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }} />
          </IconButton>
        </div>
      )}
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
            Google G Logo
          </Typography>
          <Typography variant="subtitle1" className={classes.card__subtitle}>
            5184 x 3546px
          </Typography>
          {!isHideVideo && (
            <Typography variant="caption" className={classes.card__caption}>
              Selected
            </Typography>
          )}
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
            {!isHideVideo && <MenuItem style={{ height: 40 }}>Hide Video</MenuItem>}
            {isHideVideo && <MenuItem style={{ height: 40 }}>Select Video</MenuItem>}
            <MenuItem onClick={() => handleEdit()}>Edit Video</MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoItem;
