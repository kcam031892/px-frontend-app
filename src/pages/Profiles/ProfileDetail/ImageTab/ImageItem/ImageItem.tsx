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
  handleMakePrimary: (mediaId: string) => void;
};
const ImageItem: React.FC<Props> = ({ handleEditImage, item, handleUnselectMedia, handleMakePrimary }) => {
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

  const handleClickMakePrimary = () => {
    handleMakePrimary(item.attributes.medium_id);
    handleCloseMenu();
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <Card className={clsx(classes.card)} ref={setNodeRef} style={style}>
      <div className={classes.card__moveIcon} {...attributes} {...listeners}>
        <IconButton color="primary" style={{ background: '#fff', padding: 8 }}>
          <MoveIcon viewBox="0 0 16 16" style={{ width: 12, height: 12 }} />
        </IconButton>
      </div>
      <Box className={classes.card__media} {...attributes} {...listeners}>
        <CardMedia
          component="img"
          image={item.attributes.attachment}
          title={item.attributes.medium_name}
          alt=""
          height={150}
          width={'100%'}
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Box className={classes.card__actions}>
        <IconButton onClick={handleOpenMenu} style={{ background: '#fff', padding: 6 }}>
          <MoreVert style={{ width: 16, height: 16 }} />
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
          {!item.attributes.primary && <MenuItem onClick={handleClickMakePrimary}>Make Primary</MenuItem>}
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
