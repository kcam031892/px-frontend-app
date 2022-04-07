import React, { useState } from 'react';
import { Box, Tab, Grid, Card, CardContent, Typography, Button, Chip } from '@material-ui/core';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';
import { useSkillStyle } from 'themes/styles/useSkillStyle';
import ProfeciencyDialog from './ProfeciencyDialog/ProfeciencyDialog';

const Accents = () => {
  const cardContentStyle = useCardContentStyle();
  const skillStyle = useSkillStyle();

  const [isProfeciencyDialogOpen, setIsProfeciencyDialogOpen] = useState<boolean>(false);
  const handleOpenProfeciencyDialog = () => setIsProfeciencyDialogOpen(true);
  const handleCloseProfeciencyDialog = () => setIsProfeciencyDialogOpen(false);

  return (
    <Grid container className={skillStyle.contentContainer}>
      <Grid container spacing={2} className={skillStyle.headerContainer}>
        <Grid xs={12} md={6} item>
          <Typography>
            <h2>Select accents</h2>
            <p className={skillStyle.small}>(#/## selected)</p>
          </Typography>
        </Grid>
        <Grid xs={12} md={6} item className={skillStyle.flexRight}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" color="primary" className={skillStyle.btnPrimary}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Card variant="outlined">
          <CardContent className={cardContentStyle.root}>
            <Typography>
              <h2>European</h2>
            </Typography>
            <Grid className={skillStyle.chipContainer} item>
              <Box component="div">
                <Chip label="Clickable Link" component="button" onClick={handleOpenProfeciencyDialog} clickable />
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <ProfeciencyDialog open={isProfeciencyDialogOpen} onClose={handleCloseProfeciencyDialog} />
    </Grid>
  );
};

export default Accents;
