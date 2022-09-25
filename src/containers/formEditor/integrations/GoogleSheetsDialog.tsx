import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Avatar,
} from '@mui/material'
import { Box } from '@mui/system'
import { Form, Field } from 'react-final-form'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activateGoogleSheetsIntegration } from '../../../actions/formEditor'
import { openGoogleAuthWindow } from '../../../actions/pubSub'
import { selectGoogleSheetsAccounts } from '../../../selectors/integrations'

interface GoogleSheetsDialogProps {
  open: boolean
  onClose: () => void
  formId: string
  initialValues: any
}

const GoogleSheetsDialog = ({
  open,
  onClose,
  formId,
  initialValues,
}: GoogleSheetsDialogProps) => {
  const dispatch = useDispatch()
  const googleSheetsAccounts = useSelector(selectGoogleSheetsAccounts)

  const onSubmit = async (values: any) => {
    console.log('values ', values)
    const { sheetName, googleUserId } = values
    dispatch(
      activateGoogleSheetsIntegration({
        formId,
        spreadSheetName: sheetName,
        googleUserId,
      })
    )
    onClose()
  }
  const handleAddAccount = () => {
    dispatch(openGoogleAuthWindow())
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h5">Google sheets</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2, width: '400px' }}>
          <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            render={({ handleSubmit, values }) => {
              const submitDisabled =
                !values.googleUserId ||
                !values.sheetName ||
                (initialValues &&
                  initialValues.sheetName === values.sheetName &&
                  initialValues.googleUserId === values.googleUserId)

              return (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    alignItems: 'start',
                  }}
                >
                  <Typography>1. Select Google Account</Typography>
                  <Field name="googleUserId">
                    {({ input: { name, value, onChange } }: any) => (
                      <TextField
                        name={name}
                        value={value}
                        onChange={onChange}
                        label="Google account"
                        fullWidth
                        placeholder="Token id"
                        select
                        sx={{ mb: 2 }}
                      >
                        {googleSheetsAccounts.map(
                          ({ name, id, picture }: any) => {
                            return (
                              <MenuItem key={id} value={id}>
                                <Box sx={{ display: 'flex' }}>
                                  <Avatar
                                    alt={name}
                                    src={picture}
                                    sx={{
                                      width: 25,
                                      height: 25,
                                      mr: 1,
                                    }}
                                  />
                                  {name}
                                </Box>
                              </MenuItem>
                            )
                          }
                        )}
                        <MenuItem>
                          <Button onClick={handleAddAccount}>
                            + Add account
                          </Button>
                        </MenuItem>
                      </TextField>
                    )}
                  </Field>

                  <Typography>2. Name for a Google Sheet</Typography>

                  <Field name="sheetName">
                    {({ input: { name, value, onChange } }: any) => (
                      <TextField
                        name={name}
                        value={value}
                        onChange={onChange}
                        label="Sheet name"
                        fullWidth
                        placeholder="Sheet name"
                        sx={{ mb: 2 }}
                      />
                    )}
                  </Field>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={submitDisabled}
                    >
                      {initialValues ? 'Update' : 'Activate Integration'}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </Box>
                </form>
              )
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default GoogleSheetsDialog
