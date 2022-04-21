import { useSortable } from '@dnd-kit/sortable';
import { Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import clsx from 'clsx';
import { MoveIcon } from 'components/Icons';
import React, { useState } from 'react';

import { CSS } from '@dnd-kit/utilities';

import { useStyles } from './VideoItem.styles';
import { IProfileMedia } from 'shared/interfaces/IProfile';
import { formatBytes } from 'shared/utils/formatBytes';
import { ellipseText } from 'shared/utils/ellipseText';

type Props = {
  handleEditVideo: () => void;
  item: IProfileMedia;
  handleUnselectMedia: (profileMediaId: string) => void;
};
const VideoItem: React.FC<Props> = ({ handleEditVideo, item, handleUnselectMedia }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sortable = useSortable({ id: item.id });
  const { attributes, listeners, isDragging, setNodeRef, transform, transition } = sortable;
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

  const handleUnselect = () => {
    handleUnselectMedia(item.id);
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <Card className={clsx(classes.card)} ref={setNodeRef} style={style}>
      <div className={classes.card__moveIcon} {...attributes} {...listeners}>
        <IconButton>
          <MoveIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }} />
        </IconButton>
      </div>
      <Box className={classes.card__media} {...attributes} {...listeners}>
        <CardMedia
          component="img"
          image="https://picsum.photos/250/300"
          title="Live from space album cover"
          height="250"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <CardContent className={classes.card__content} {...attributes} {...listeners}>
        <Box>
          <Typography variant="h6" className={classes.card__title}>
            {ellipseText(item.attributes.medium_name)}
          </Typography>
          <Typography variant="subtitle1" className={classes.card__subtitle}>
            {formatBytes(item.attributes.medium_size)}
          </Typography>

          <Typography variant="caption" className={classes.card__caption}>
            {item.attributes.primary ? 'Primary' : 'Selected'}
          </Typography>
        </Box>
      </CardContent>
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
          <MenuItem style={{ height: 40 }} onClick={handleUnselect}>
            Hide Video
          </MenuItem>
          <MenuItem onClick={() => handleEdit()}>Edit Video</MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default VideoItem;
