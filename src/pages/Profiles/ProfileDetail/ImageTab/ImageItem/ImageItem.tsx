import { useSortable } from '@dnd-kit/sortable';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import clsx from 'clsx';
import { MoveIcon } from 'components/Icons';
import React, { useState } from 'react';

import { CSS } from '@dnd-kit/utilities';

import { useStyles } from './ImageItem.styles';
import { IProfileMedia } from 'shared/interfaces/IProfile';
import { Button } from 'themes/elements';

type Props = {
  handleEditImage: () => void;
  item: IProfileMedia;
  handleUnselectMedia: (profileMediaId: string) => void;
};
const ImageItem: React.FC<Props> = ({ handleEditImage, item, handleUnselectMedia }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const sortable = useSortable({ id: item.id });
  const { attributes, listeners, isDragging, setNodeRef, transform, transition } = sortable;
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleEditImage();
    handleCloseMenu();
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
          image={item.attributes.attachment}
          title={item.attributes.medium_name}
          height="300"
          width="100%"
          style={{ objectFit: 'contain', maxHeight: 300 }}
        />
      </Box>

      <CardContent className={classes.card__content} {...attributes} {...listeners}>
        <Box>
          <Typography variant="h6" className={classes.card__title}>
            {item.attributes.medium_name}
          </Typography>
          <Typography variant="subtitle1" className={classes.card__subtitle}>
            {`${Math.floor(item.attributes.medium_width)}x${Math.floor(item.attributes.medium_height)}`}
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
            Hide Image
          </MenuItem>
          <MenuItem onClick={() => handleEdit()}>Edit Image</MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default ImageItem;
