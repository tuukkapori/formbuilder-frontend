import React, { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  LinearProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { selectEditorIntegrations } from '../../../selectors/formEditor'
import GoogleSheetsDialog from './GoogleSheetsDialog'
import {
  activateEmailAutomation,
  disableEmailAutomation,
  disableGoogleSheetsIntegration,
} from '../../../actions/formEditor'

const getDisplayNameForField = (fieldId: string, fields: any) => {
  return fields.find((field: any) => field.id === fieldId)?.title
}

const EmailIntegrationForm = ({ selectedForm, onSubmit, formId }: any) => {
  const integrations = useSelector(selectEditorIntegrations)
  const initialValues = integrations?.email?.enabled
    ? {
        ...integrations?.email,
        maxCapacity: integrations?.maxCapacity,
        limited: Boolean(integrations?.maxCapacity),
      }
    : {}
  const callToAction = integrations?.email?.enabled
    ? 'Update integration'
    : 'Activate integration'

  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, values }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              alignItems: 'start',
            }}
          >
            <Field name="fieldIdForName">
              {({ input: { name, value, onChange } }: any) => (
                <TextField
                  name={name}
                  value={value}
                  onChange={onChange}
                  label="Field for name"
                  fullWidth
                  select
                  placeholder="Field for name"
                >
                  {selectedForm &&
                    selectedForm.fields.map((field: any) => {
                      return (
                        <MenuItem key={field.id} value={field.id}>
                          {getDisplayNameForField(
                            field.id,
                            selectedForm.fields
                          )}
                        </MenuItem>
                      )
                    })}
                </TextField>
              )}
            </Field>
            <Field name="fieldIdForEmail">
              {({ input: { name, value, onChange } }: any) => (
                <TextField
                  name={name}
                  value={value}
                  onChange={onChange}
                  label="Field for email"
                  fullWidth
                  select
                  placeholder="Field for email"
                >
                  {selectedForm &&
                    selectedForm.fields.map((field: any) => {
                      return (
                        <MenuItem key={field.id} value={field.id}>
                          {getDisplayNameForField(
                            field.id,
                            selectedForm.fields
                          )}
                        </MenuItem>
                      )
                    })}
                </TextField>
              )}
            </Field>
            <Field name="mailerliteGroupId">
              {({ input: { name, value, onChange } }: any) => (
                <TextField
                  name={name}
                  value={value}
                  onChange={onChange}
                  label="Mailerlite group id"
                  fullWidth
                  placeholder="Mailerlite group id"
                />
              )}
            </Field>
            <Field name="limited" type="checkbox">
              {({ input: { name, value, onChange } }: any) => (
                <FormControlLabel
                  label="Limited"
                  control={<Switch checked={value} />}
                  onChange={onChange}
                />
              )}
            </Field>
            {values.limited && (
              <Field name="maxCapacity">
                {({ input: { name, value, onChange } }: any) => (
                  <TextField
                    name={name}
                    value={value}
                    onChange={onChange}
                    label="Max capacity"
                    fullWidth
                    type="number"
                    placeholder="Max capacity"
                  />
                )}
              </Field>
            )}

            <Button
              type="submit"
              disabled={
                !values.mailerliteGroupId ||
                (values.limited && !values.maxCapacity)
              }
            >
              {callToAction}
            </Button>
          </form>
        )}
      />
    </Box>
  )
}

const Integrations = ({ formId, form }: any) => {
  const dispatch = useDispatch()
  const [dialogsOpen, setDialogsOpen] = useState({
    email: false,
    googleSheets: false,
    notion: false,
  })

  const integrations = useSelector(selectEditorIntegrations)
  if (!integrations) {
    return <LinearProgress />
  }

  const closeDialog = (dialog: any) => {
    setDialogsOpen((prev: any) => {
      return {
        ...prev,
        [dialog]: false,
      }
    })
  }
  const openDialog = (dialogName: any) => {
    setDialogsOpen((prev: any) => {
      return {
        ...prev,
        [dialogName]: true,
      }
    })
  }
  const handleActivateEmailIntegration = async (values: any) => {
    dispatch(activateEmailAutomation({ ...values, formId }))

    closeDialog('email')
  }

  const handleDisableEmailAutomation = () => {
    dispatch(disableEmailAutomation(formId))
  }

  const handleDisableGoogleSheetsIntegration = () => {
    dispatch(disableGoogleSheetsIntegration(formId))
  }

  const googleSheetsInitialValues = integrations.googleSheets?.enabled
    ? {
        googleUserId: integrations.googleSheets.googleUserId,
        sheetName: integrations.googleSheets.sheetName,
      }
    : undefined

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Integrations
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Card sx={{ width: '250px' }}>
          <CardContent>
            {integrations.googleSheets?.enabled && (
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="body1">Active</Typography>
              </Box>
            )}
            <Typography variant="h5" gutterBottom>
              Google sheets
            </Typography>
            <Typography>
              Save submissions automatically to google sheets
            </Typography>
          </CardContent>
          <CardActions>
            {integrations?.googleSheets?.enabled ? (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDisableGoogleSheetsIntegration}
                >
                  disable
                </Button>
                <Button onClick={() => openDialog('googleSheets')}>Edit</Button>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => openDialog('googleSheets')}
              >
                Connect
              </Button>
            )}
          </CardActions>
        </Card>

        <Card sx={{ width: '250px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Email
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Automatically send email after submission
            </Typography>
          </CardContent>
          <CardActions>
            {integrations.email?.enabled ? (
              <>
                <Button
                  variant="outlined"
                  onClick={handleDisableEmailAutomation}
                  color="error"
                >
                  Disable
                </Button>
                <Button variant="outlined" onClick={() => openDialog('email')}>
                  view
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => openDialog('email')}
                disabled
              >
                Coming soon
              </Button>
            )}
          </CardActions>
        </Card>

        <Card sx={{ width: '250px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Notion
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Save submissions automatically to a Notion database
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              onClick={() => openDialog('notion')}
              disabled
            >
              Coming soon
            </Button>
          </CardActions>
        </Card>
      </Box>

      <GoogleSheetsDialog
        open={dialogsOpen['googleSheets']}
        onClose={() => closeDialog('googleSheets')}
        formId={formId}
        initialValues={googleSheetsInitialValues}
      />

      <Dialog open={dialogsOpen['email']} onClose={() => closeDialog('email')}>
        <DialogContent>
          <DialogTitle>Email</DialogTitle>
          <EmailIntegrationForm
            selectedForm={form}
            onSubmit={handleActivateEmailIntegration}
            formId={formId}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Integrations
