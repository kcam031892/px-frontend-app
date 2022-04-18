import { Box, Card, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import { useQueries } from 'react-query';
import { mediaDao } from 'shared/dao/mediaDao';

import { useStyles } from './Content.styles';

type Props = {
  templateId: number;
  isEditing?: boolean;
  handleEditorOpen: (index: number) => void;
  images: string[];
};

const FALLBACK_IMAGE_URL = '/no-image-placeholder.svg';
const { retrieveMediaUrl } = mediaDao();
const Content: React.FC<Props> = ({ templateId, isEditing, handleEditorOpen, images }) => {
  // console.log('images', images);

  // const mediaQueries = useQueries(
  //   images.map((image) => {
  //     return {
  //       queryKey: ['images', image],
  //       queryFn: () => retrieveMediaUrl(image),
  //     };
  //   }),
  // );

  // console.log(mediaQueries);

  const classes = useStyles();
  const getTemplate = useCallback(
    (images: string[]) => {
      if (templateId === 1) {
        return (
          <Box className={classes.template}>
            <Box className={classes.template__item}>
              <Grid container spacing={4}>
                <Grid item xs>
                  <Grid container spacing={2}>
                    <Grid item lg={6}>
                      <Box className={clsx(classes.imageContainer)}>
                        <img src={images[0] ? images[0] : FALLBACK_IMAGE_URL} />

                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={() => handleEditorOpen(0)}>
                                <AddIcon htmlColor="black" />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box className={classes.imageContainer}>
                        <img src={images[1] ? images[1] : FALLBACK_IMAGE_URL} />

                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={() => handleEditorOpen(1)}>
                                <AddIcon htmlColor="black" />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box className={classes.imageContainer}>
                        <img src={images[2] ? images[2] : FALLBACK_IMAGE_URL} />

                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={() => handleEditorOpen(2)}>
                                <AddIcon htmlColor="black" />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box className={classes.imageContainer}>
                        <img src={images[3] ? images[3] : FALLBACK_IMAGE_URL} />

                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={() => handleEditorOpen(3)}>
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
                    <img src={images[4] ? images[4] : FALLBACK_IMAGE_URL} />

                    {isEditing && (
                      <>
                        <Box className={classes.isEditing} />
                        <Box className={classes.editIconContainer}>
                          <IconButton onClick={() => handleEditorOpen(4)}>
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
                    <img src={images[0] ? images[0] : FALLBACK_IMAGE_URL} />
                    {isEditing && (
                      <>
                        <Box className={classes.isEditing} />
                        <Box className={classes.editIconContainer}>
                          <IconButton onClick={() => handleEditorOpen(0)}>
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
                    <img src={images[1] ? images[1] : FALLBACK_IMAGE_URL} />
                    {isEditing && (
                      <>
                        <Box className={classes.isEditing} />
                        <Box className={classes.editIconContainer}>
                          <IconButton onClick={() => handleEditorOpen(1)}>
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
                        <img src={images[0] ? images[0] : FALLBACK_IMAGE_URL} />
                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={() => handleEditorOpen(0)}>
                                <AddIcon htmlColor="black" />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box className={classes.imageContainer}>
                        <img src={images[1] ? images[1] : FALLBACK_IMAGE_URL} />
                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={() => handleEditorOpen(1)}>
                                <AddIcon htmlColor="black" />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box className={classes.imageContainer}>
                        <img src={images[2] ? images[2] : FALLBACK_IMAGE_URL} />
                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={() => handleEditorOpen(2)}>
                                <AddIcon htmlColor="black" />
                              </IconButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Grid>
                    <Grid item lg={6}>
                      <Box className={classes.imageContainer}>
                        <img src={images[3] ? images[3] : FALLBACK_IMAGE_URL} />
                        {isEditing && (
                          <>
                            <Box className={classes.isEditing} />
                            <Box className={classes.editIconContainer}>
                              <IconButton onClick={() => handleEditorOpen(3)}>
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
                          <img src={images[4] ? images[4] : FALLBACK_IMAGE_URL} />
                          {isEditing && (
                            <>
                              <Box className={classes.isEditing} />
                              <Box className={classes.editIconContainer}>
                                <IconButton onClick={() => handleEditorOpen(4)}>
                                  <AddIcon htmlColor="black" />
                                </IconButton>
                              </Box>
                            </>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs lg={6}>
                        <Box className={classes.imageContainer} style={{ height: 320 }}>
                          <img src={images[5] ? images[5] : FALLBACK_IMAGE_URL} />
                          {isEditing && (
                            <>
                              <Box className={classes.isEditing} />
                              <Box className={classes.editIconContainer}>
                                <IconButton onClick={() => handleEditorOpen(5)}>
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [templateId, isEditing, images],
  );
  return (
    <Card className={classes.card}>
      <CardContent>{getTemplate(images)}</CardContent>
    </Card>
  );
};

export default Content;
