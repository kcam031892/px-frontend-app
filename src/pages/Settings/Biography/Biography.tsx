import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { RichEditor } from 'components';
import React from 'react';

import { useStyles } from './Biography.styles';

const Biography = () => {
  const classes = useStyles();
  const handleContentChange = (content: string) => {
    console.log(content);
  };
  return (
    <Box className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.card__title}>
            &nbsp; &nbsp;
          </Typography>
          <RichEditor content={'ss'} onChange={handleContentChange} minHeight={540} />
        </CardContent>
      </Card>
      <Box className={classes.actionContainer}>
        <Typography variant="body2" className={classes.note}>
          Note: No external URL’s are permitted in the Biography and will be auto removed when saved.
        </Typography>
        <Box>
          <Button
            variant="outlined"
            disableElevation
            style={{
              marginRight: '16px',
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" disableElevation>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Biography;
