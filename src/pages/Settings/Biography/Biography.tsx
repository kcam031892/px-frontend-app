import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { RichEditor } from 'components';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ITalentUpdatePayload } from 'shared/interfaces/ITalent';
import { talentService } from 'shared/services/talentService';
import { Backdrop, useAlert } from 'themes/elements';
import * as yup from 'yup';

import { useStyles } from './Biography.styles';
const { updateTalent, getBiography } = talentService();
const Biography = () => {
  const classes = useStyles();
  const { isOpen: isAlertOpen, alertRef, AlertOpen } = useAlert({ autoHideDuration: 2000, horizontal: 'center' });
  const { mutate, isLoading: isUpdateLoading } = updateTalent();
  const queryClient = useQueryClient();
  const { data, isLoading } = getBiography();
  const [initialValues, setInitialValues] = useState<ITalentUpdatePayload>({
    biography: '',
  });
  const biographyValidationSchema: yup.SchemaOf<ITalentUpdatePayload> = yup.object().shape({
    resume: yup.array(),
    biography: yup.string(),
  });

  const handleUpdateBiography = (values: ITalentUpdatePayload) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries('talents/biography');
        AlertOpen('success', 'Biography has been successfully updated');
      },
    });
  };

  const form: FormikProps<ITalentUpdatePayload> = useFormik({
    initialValues,
    validationSchema: biographyValidationSchema,
    onSubmit: (values) => handleUpdateBiography(values),
    enableReinitialize: true,
  });
  const handleContentChange = (content: string) => {
    form.setFieldValue('biography', content);
  };

  useEffect(() => {
    if (data) {
      setInitialValues(data.data.attributes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box className={classes.container}>
      {isAlertOpen && alertRef}
      {!isLoading && (
        <>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" className={classes.card__title}>
                &nbsp; &nbsp;
              </Typography>
              {form.values.biography && (
                <RichEditor content={form.values.biography} onChange={handleContentChange} minHeight={540} />
              )}
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
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={isUpdateLoading}
                onClick={() => form.handleSubmit()}
              >
                Save
              </Button>
            </Box>
          </Box>
        </>
      )}
      <Backdrop isLoading={isLoading || isUpdateLoading} />
    </Box>
  );
};

export default Biography;
