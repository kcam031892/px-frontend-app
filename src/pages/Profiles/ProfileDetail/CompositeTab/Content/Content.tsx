import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useStyles } from './Content.styles';

type Props = {
  templateId: number;
};
const Content: React.FC<Props> = ({ templateId }) => {
  const classes = useStyles();
  const getTemplate = useMemo(() => {
    if (templateId === 1) {
      return (
        <Box className={classes.template}>
          <Box className={classes.template__item}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                    </Box>
                  </Grid>
                </Grid>
                <Box className={classes.agencyContainer} mt={4}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
              </Grid>
              <Grid item xs>
                <Box className={classes.profileContainer}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
                <Box className={classes.bigImageContainer} mt={4}>
                  <img src={`https://picsum.photos/200/300`} />
                </Box>
                <Box className={classes.agencyContainer} mt={4}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    } else if (templateId === 2) {
      return (
        <Box className={classes.template}>
          <Box className={classes.template__item}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Box className={classes.leftBigImageContainer}>
                  <img src={`https://picsum.photos/200/300`} />
                </Box>
                <Box className={classes.agencyContainer} mt={4}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
              </Grid>

              <Grid item xs>
                <Box className={classes.profileContainer}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
                <Box className={classes.bigImageContainer} mt={4}>
                  <img src={`https://picsum.photos/200/300`} />
                </Box>
                <Box className={classes.agencyContainer} mt={4}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    } else if (templateId === 3) {
      return (
        <Box className={classes.template}>
          <Box className={classes.template__item}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                    </Box>
                  </Grid>
                </Grid>
                <Box className={classes.agencyContainer} mt={4}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
              </Grid>
              <Grid item xs>
                <Box className={classes.profileContainer}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
                <Box className={classes.twoImageContainer} mt={4}>
                  <img src={`https://picsum.photos/200/300`} />
                  <img src={`https://picsum.photos/200/300`} />
                </Box>
                <Box className={classes.agencyContainer} mt={4}>
                  <Typography variant="h6">JEMMA RIVERA</Typography>
                  <Typography variant="caption">Actor</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);
  return (
    <Card className={classes.card}>
      <CardContent>{getTemplate}</CardContent>
    </Card>
  );
};

export default Content;
