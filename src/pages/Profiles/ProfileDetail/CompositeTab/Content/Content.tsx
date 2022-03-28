import { Box, Card, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useStyles } from './Content.styles';

type Props = {
  templateId: number;
  isEditing?: boolean;
  handleEditorOpen: () => void;
};
const Content: React.FC<Props> = ({ templateId, isEditing, handleEditorOpen }) => {
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
                    <Box className={clsx(classes.imageContainer)}>
                      <img src={`https://picsum.photos/200/300`} />

                      {isEditing && (
                        <>
                          <Box className={classes.isEditing} />
                          <Box className={classes.editIconContainer}>
                            <IconButton onClick={handleEditorOpen}>
                              <AddIcon htmlColor="black" />
                            </IconButton>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />

                      {isEditing && (
                        <>
                          <Box className={classes.isEditing} />
                          <Box className={classes.editIconContainer}>
                            <IconButton onClick={handleEditorOpen}>
                              <AddIcon htmlColor="black" />
                            </IconButton>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />

                      {isEditing && (
                        <>
                          <Box className={classes.isEditing} />
                          <Box className={classes.editIconContainer}>
                            <IconButton onClick={handleEditorOpen}>
                              <AddIcon htmlColor="black" />
                            </IconButton>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />

                      {isEditing && (
                        <>
                          <Box className={classes.isEditing} />
                          <Box className={classes.editIconContainer}>
                            <IconButton onClick={handleEditorOpen}>
                              <AddIcon htmlColor="black" />
                            </IconButton>
                          </Box>
                        </>
                      )}
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

                  {isEditing && (
                    <>
                      <Box className={classes.isEditing} />
                      <Box className={classes.editIconContainer}>
                        <IconButton onClick={handleEditorOpen}>
                          <AddIcon htmlColor="black" />
                        </IconButton>
                      </Box>
                    </>
                  )}
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
                  {isEditing && (
                    <>
                      <Box className={classes.isEditing} />
                      <Box className={classes.editIconContainer}>
                        <IconButton onClick={handleEditorOpen}>
                          <AddIcon htmlColor="black" />
                        </IconButton>
                      </Box>
                    </>
                  )}
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
                  {isEditing && (
                    <>
                      <Box className={classes.isEditing} />
                      <Box className={classes.editIconContainer}>
                        <IconButton onClick={handleEditorOpen}>
                          <AddIcon htmlColor="black" />
                        </IconButton>
                      </Box>
                    </>
                  )}
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
                      {isEditing && (
                        <>
                          <Box className={classes.isEditing} />
                          <Box className={classes.editIconContainer}>
                            <IconButton onClick={handleEditorOpen}>
                              <AddIcon htmlColor="black" />
                            </IconButton>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                      {isEditing && (
                        <>
                          <Box className={classes.isEditing} />
                          <Box className={classes.editIconContainer}>
                            <IconButton onClick={handleEditorOpen}>
                              <AddIcon htmlColor="black" />
                            </IconButton>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                      {isEditing && (
                        <>
                          <Box className={classes.isEditing} />
                          <Box className={classes.editIconContainer}>
                            <IconButton>
                              <AddIcon htmlColor="black" />
                            </IconButton>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box className={classes.imageContainer}>
                      <img src={`https://picsum.photos/200/300`} />
                      {isEditing && (
                        <>
                          <Box className={classes.isEditing} />
                          <Box className={classes.editIconContainer}>
                            <IconButton onClick={handleEditorOpen}>
                              <AddIcon htmlColor="black" />
                            </IconButton>
                          </Box>
                        </>
                      )}
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
                <Box className={classes.twoImageContainer}>
                  <Grid container spacing={2}>
                    <Grid item xs lg={6}>
                      <Box className={classes.imageContainer} style={{ height: 320 }}>
                        <img src={`https://picsum.photos/200/300`} />
                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={handleEditorOpen}>
                                <AddIcon htmlColor="black" />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs lg={6}>
                      <Box className={classes.imageContainer} style={{ height: 320 }}>
                        <img src={`https://picsum.photos/200/300`} />
                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={handleEditorOpen}>
                                <AddIcon htmlColor="black" />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box className={classes.agencyContainer} mt={8}>
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
  }, [templateId, isEditing]);
  return (
    <Card className={classes.card}>
      <CardContent>{getTemplate}</CardContent>
    </Card>
  );
};

export default Content;
