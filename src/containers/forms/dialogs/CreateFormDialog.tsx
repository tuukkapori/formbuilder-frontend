import React from 'react'
import { Form, Field } from 'react-final-form'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material'
import { useDispatch } from 'react-redux'

import { createForm } from '../../../actions/forms'

interface CreateFormDialogProps {
  open: boolean
  onClose: () => void
}

const CreateFormDialog = ({ open, onClose }: CreateFormDialogProps) => {
  const dispatch = useDispatch()

  const createNewForm = async (values: any) => {
    dispatch(createForm(values))
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New form</DialogTitle>
      <DialogContent style={{ paddingTop: '20px', width: '300px' }}>
        <Form
          onSubmit={createNewForm}
          validate={(values: any) => {
            const errors: any = {}
            if (!values.name) {
              errors.name = 'Required'
            }

            if (!values.template) {
              errors.template = 'Required'
            }

            return errors
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <Field name="name">
                {({
                  input: { name, value, onChange },
                  meta: { error, touched },
                }) => (
                  <>
                    <TextField
                      name={name}
                      label="Form name"
                      value={value}
                      onChange={onChange}
                      variant="standard"
                    />
                    {touched && error && (
                      <Typography color="error">{error}</Typography>
                    )}
                  </>
                )}
              </Field>

              <Field name="template">
                {({
                  input: { name, value, onChange },
                  meta: { error, touched },
                }) => (
                  <>
                    <TextField
                      name={name}
                      label="Template"
                      value={value}
                      onChange={onChange}
                      variant="standard"
                      select
                    >
                      <MenuItem value={'blank'}>Blank</MenuItem>
                      <MenuItem value={'eventSignUp'}>Event sign up</MenuItem>
                    </TextField>

                    {touched && error && (
                      <Typography color="error">{error}</Typography>
                    )}
                  </>
                )}
              </Field>

              <Button
                type="submit"
                disabled={submitting || !values.template || !values.name}
                variant="contained"
                sx={{ mt: 2 }}
              >
                {submitting ? (
                  <>
                    <CircularProgress size="16px" sx={{ mr: 1.5 }} />{' '}
                    Creating...
                  </>
                ) : (
                  <>Create!</>
                )}
              </Button>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CreateFormDialog
