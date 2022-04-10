import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { ConfirmDialog, RichEditor } from 'components';
import { FormikProps, useFormik } from 'formik';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ITalentUpdatePayload } from 'shared/interfaces/ITalent';
import { talentService } from 'shared/services/talentService';
import { convertContent } from 'shared/utils/convertContent';
import { Backdrop, useAlert } from 'themes/elements';
import * as yup from 'yup';

import { useStyles } from './Biography.styles';
const { updateTalent, getBiography } = talentService();
const Biography = () => {
  const classes = useStyles();
  const { isOpen: isAlertOpen, alertRef, AlertOpen } = useAlert({ autoHideDuration: 2000, horizontal: 'center' });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<string>('');
  const { mutate, isLoading: isUpdateLoading } = updateTalent();
  const queryClient = useQueryClient();
  const { data, isLoading } = getBiography();
  const [oldInitialValues, setOldInitialValues] = useState<ITalentUpdatePayload>({ biography: '' });
  const [initialValues, setInitialValues] = useState<ITalentUpdatePayload>({
    biography: '',
  });
  const [oldEditorState, setOldEditorState] = useState(() => {
    return convertContent('');
  });
  const [editorState, setEditorState] = useState(() => {
    return convertContent('');
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
      if (data.data.attributes.biography) {
        setInitialValues(data.data.attributes);
        setOldInitialValues(data.data.attributes);
        setEditorState(convertContent(data.data.attributes.biography || ''));
        setOldEditorState(convertContent(data.data.attributes.biography || ''));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleOpenDialog = (type: string) => {
    setIsDialogOpen(true);
    setDialogType(type);
  };

  const handleSave = () => {
    form.handleSubmit();
    setIsDialogOpen(false);
  };

  const handleReset = () => {
    setEditorState(oldEditorState);
    form.setFieldValue('biography', oldInitialValues.biography);
    setIsDialogOpen(false);
  };

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

              <RichEditor
                editorState={editorState}
                setEditorState={setEditorState}
                onChange={handleContentChange}
                minHeight={0}
              />
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
                disabled={isEqual(form.values.biography, oldInitialValues.biography)}
                onClick={() => handleOpenDialog('reset')}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={isUpdateLoading || isEqual(form.values.biography, oldInitialValues.biography)}
                onClick={() => handleOpenDialog('save')}
              >
                Save
              </Button>
            </Box>
          </Box>
        </>
      )}
      <ConfirmDialog
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        title="Confirmation"
        onConfirm={() => (dialogType === 'save' ? handleSave() : handleReset())}
      >
        {dialogType === 'save' ? 'Are you sure you want to save this?' : 'Are you sure you want to cancel this?'}
      </ConfirmDialog>
      <Backdrop isLoading={isLoading || isUpdateLoading} />
    </Box>
  );
};

export default Biography;
