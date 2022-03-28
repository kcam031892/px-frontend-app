import { Box, Button, Grid, Typography } from '@material-ui/core';
import { FileUpload, UsageData } from 'components';
import React from 'react';

import { useStyles } from './Upload.styles';

const Upload = () => {
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.header}>Media</Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          {/* DropZone / Upload */}
          <Box className={classes.dropzone}>
            <FileUpload onFileSelected={() => null} variant="uploader" />
          </Box>

          {/* Upload List  */}
          <Box className={classes.uploadList}>
            <Box className={classes.uploadList__action}>
              <Typography variant="h6" className={classes.uploadList__header}>
                Uploads
              </Typography>
              <Box>
                <Button variant="outlined" style={{ marginRight: 16, borderRadius: 40 }}>
                  Clear list
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* Usage Data */}
        <Grid item xs={12} lg={4}>
          <UsageData />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Upload;
