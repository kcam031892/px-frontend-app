import React, { useState } from 'react';
import { Box, Tab, Grid, Card, CardContent, Typography, Button, Chip, Badge } from '@material-ui/core';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';
import { useSkillStyle } from 'themes/styles/useSkillStyle';
import ProfeciencyDialog from './ProfeciencyDialog/ProfeciencyDialog';
import SkillPopOver from '../SkillsPopOver/SkillsPopOver';

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
              <h2>North American</h2>
            </Typography>
            <Grid className={skillStyle.chipContainer} item>
              <Box className={skillStyle.chipsDisplay}>
                <SkillPopOver />
                <div>
                  <Chip
                    label="Canadian"
                    onDelete={() => {}}
                    avatar={<span className={skillStyle.badgeStyle}>I</span>}
                  />
                </div>
                <div>
                  <Chip
                    label="Caribbean"
                    onDelete={() => {}}
                    avatar={<span className={skillStyle.badgeStyle}>E</span>}
                  />
                </div>
              </Box>
              <div className={skillStyle.horizontalDivider} />
              <Box className={skillStyle.chipsDisplay}>
                <Chip label="Midwest" />
                <Chip label="New England" />
                <Chip label="New York" />
                <Chip label="Southern States" />
                <Chip label="Standard" />
                <Chip label="Urban" />
                <Chip label="Western States" />
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
