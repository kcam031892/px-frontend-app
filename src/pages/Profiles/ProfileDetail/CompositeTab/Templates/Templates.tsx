import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './Templates.styles';

type Props = {
  templateId: number;
  setTemplateId: (templateId: number) => void;
};
const Templates: React.FC<Props> = ({ templateId, setTemplateId }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        {/* 5 Image Format */}
        <Box className={classes.template}>
          <Box
            className={clsx(classes.template__item, {
              [classes.template__itemSelected]: templateId === 1,
            })}
            onClick={() => setTemplateId(1)}
          >
            <Grid container spacing={4}>
              <Grid item xs>
                <Grid container spacing={1} style={{ height: 160 }}>
                  <Grid item lg={6}>
                    <Box className={clsx(classes.template__boxDark, classes.smallBox)} />
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={clsx(classes.template__boxDark, classes.smallBox)} />
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={clsx(classes.template__boxDark, classes.smallBox)} />
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={clsx(classes.template__boxDark, classes.smallBox)} />
                  </Grid>
                </Grid>
                <Box className={classes.flexCenter} mt={2}>
                  <Box className={clsx(classes.template__greyBox, classes.detailBox)} />
                </Box>
              </Grid>

              <Grid item xs>
                <Box className={classes.flexCenter}>
                  <Box className={clsx(classes.template__boxDark, classes.nameBox)} />
                </Box>
                <Box className={classes.bigBoxContainer}>
                  <Box className={clsx(classes.template__boxDark, classes.bigBox)} />
                </Box>
                <Box className={classes.flexCenter} mt={2}>
                  <Box className={clsx(classes.template__greyBox, classes.agencyBox)} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Typography variant="h6">5 Image Format</Typography>
        </Box>

        {/* 2 Image Format */}
        <Box className={classes.template} mt={3}>
          <Box
            className={clsx(classes.template__item, {
              [classes.template__itemSelected]: templateId === 2,
            })}
            onClick={() => setTemplateId(2)}
          >
            <Grid container spacing={4}>
              <Grid item xs>
                <Box>
                  <Box className={clsx(classes.template__boxDark, classes.leftBigBox)} />
                </Box>
                <Box className={classes.flexCenter} mt={2}>
                  <Box className={clsx(classes.template__greyBox, classes.leftDetailBox)} />
                </Box>
              </Grid>

              <Grid item xs>
                <Box className={classes.flexCenter}>
                  <Box className={clsx(classes.template__boxDark, classes.nameBox)} />
                </Box>
                <Box className={classes.bigBoxContainer}>
                  <Box className={clsx(classes.template__boxDark, classes.bigBox)} />
                </Box>
                <Box className={classes.flexCenter} mt={2}>
                  <Box className={clsx(classes.template__greyBox, classes.agencyBox)} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Typography variant="h6">2 Image Format</Typography>
        </Box>

        {/* 6 Image Format */}
        <Box className={classes.template} mt={3}>
          <Box
            className={clsx(classes.template__item, {
              [classes.template__itemSelected]: templateId === 3,
            })}
            onClick={() => setTemplateId(3)}
          >
            <Grid container spacing={4}>
              <Grid item xs>
                <Grid container spacing={1} style={{ height: 160 }}>
                  <Grid item lg={6}>
                    <Box className={clsx(classes.template__boxDark, classes.smallBox)} />
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={clsx(classes.template__boxDark, classes.smallBox)} />
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={clsx(classes.template__boxDark, classes.smallBox)} />
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={clsx(classes.template__boxDark, classes.smallBox)} />
                  </Grid>
                </Grid>
                <Box className={classes.flexCenter} mt={2}>
                  <Box className={clsx(classes.template__greyBox, classes.detailBox)} />
                </Box>
              </Grid>

              <Grid item xs>
                <Box className={classes.flexCenter}>
                  <Box className={clsx(classes.template__boxDark, classes.nameBox)} />
                </Box>
                <Box className={classes.twoBoxContainer} mt={2}>
                  <Box className={clsx(classes.template__boxDark, classes.twoBox)} />
                  <Box className={clsx(classes.template__boxDark, classes.twoBox)} />
                </Box>
                <Box className={classes.flexCenter} mt={4}>
                  <Box className={clsx(classes.template__greyBox, classes.agencyBox)} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Typography variant="h6">6 Image Format</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Templates;
