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
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { CSS } from '@dnd-kit/utilities';

import { useStyles } from './ImageItem.styles';

type Props = {
  isHideImage?: boolean;

  handleEditImage: () => void;

  item: any;
};
const ImageItem: React.FC<Props> = ({ isHideImage, handleEditImage, item }) => {
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
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const handleEdit = () => {
    handleEditImage();
    handleCloseMenu();
  };
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    cursor: 'grab',
  };

  return (
    <Card
      className={clsx(classes.card, {
        [classes.card__hideImage]: isHideImage,
      })}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {!isHideImage && (
        <div className={classes.card__moveIcon} ref={setNodeRef} {...attributes} {...listeners}>
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
            {item.id}
          </Typography>
          {!isHideImage && (
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
            {!isHideImage && <MenuItem style={{ height: 40 }}>Hide Image</MenuItem>}
            {isHideImage && <MenuItem style={{ height: 40 }}>Select Image</MenuItem>}
            <MenuItem onClick={() => handleEdit()}>Edit Image</MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageItem;
