import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Button } from 'themes/elements';
import { useStyles } from './CompositeTab.styles';
import Content from './Content/Content';
import Templates from './Templates/Templates';

const CompositeTab = () => {
  const [templateId, setTemplateId] = useState<number>(1);
  const classes = useStyles();
  const handleSelectTemplate = (newTemplateId: number) => {
    setTemplateId(newTemplateId);
  };
  return (
    <Box>
      <Grid container spacing={6}>
        {/* Templates */}
        <Grid item xs={12} lg={4}>
          <Box>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Templates</Typography>
              <Typography variant="caption">(2 of 16 hidden)</Typography>
            </Box>
            <Box className={classes.templateContainer}>
              <Templates templateId={templateId} setTemplateId={handleSelectTemplate} />
            </Box>
          </Box>
        </Grid>

        {/* Content */}
        <Grid item xs={12} lg={8} style={{ marginTop: 40 }}>
          <Box className={classes.actionContainer}>
            <Button color="default" variant="outlined">
              Edit
            </Button>
            <Button color="default" variant="outlined">
              Download
            </Button>
            <Button color="default" variant="outlined">
              Reset
            </Button>
          </Box>
          <Box className={classes.contentContainer}>
            <Content templateId={templateId} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompositeTab;
