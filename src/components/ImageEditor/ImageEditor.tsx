import { Box, Grid, IconButton } from '@material-ui/core';
import { EditorBackIcon } from 'components/Icons';
import React from 'react';
import { EditorMode } from 'shared/enums/EditorMode';
import { useStyles } from './ImageEditor.styles';

type Props = {
  mode: EditorMode;
  onCloseEditor: () => void;
};
const ImageEditor: React.FC<Props> = ({ mode, onCloseEditor }) => {
  const classes = useStyles();
  return (
    <Box>
      {mode === EditorMode.VIEW && (
        <Grid container className={classes.container}>
          <Grid item className={classes.editorPanel}>
            <Box className={classes.toolbar}>
              <Box>
                <IconButton onClick={() => onCloseEditor()}>
                  <EditorBackIcon width="24" height="24" viewBox="0 0 24 24" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ImageEditor;
