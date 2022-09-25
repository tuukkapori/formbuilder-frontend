import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { Form, Field } from 'react-final-form'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { selectEditorSelectedField } from '../../../selectors/formEditor'
import { nanoid } from 'nanoid'
import { FormType } from '../../../types/forms'
import {
  addFormField,
  deleteFormField,
  selectFormField,
} from '../../../actions/formEditor'

const FormFields = ({ form }: any) => {
  const [newFieldDialogOpen, setNewFieldDialogOpen] = useState(false)
  const selectedField = useSelector(selectEditorSelectedField)
  const dispatch = useDispatch()

  const addField = (values: any) => {
    const newField = {
      title: values.name,
      id: nanoid(),
      type: values.type,
      required: values.required,
      questionNumber: form.fields.length + 1,
    }
    dispatch(addFormField(newField))
    setNewFieldDialogOpen(false)
  }

  const handleDeleteField = (fieldId: string) => {
    dispatch(deleteFormField(fieldId))
  }

  const handleSelectField = (fieldId: string) => {
    dispatch(selectFormField(fieldId))
  }
  if (!form) {
    return <div>no form</div>
  }

  return (
    <List>
      {form.formType === FormType.slides && (
        <>
          <ListSubheader>Preview</ListSubheader>
          <ListItem
            sx={{
              bgcolor:
                !selectedField || selectedField === 'openingScreen'
                  ? 'rgba(0, 0, 0, 0.1)'
                  : 'rgba(0, 0, 0, 0)',
            }}
          >
            <ListItemButton onClick={() => handleSelectField('openingScreen')}>
              Opening screen
            </ListItemButton>
          </ListItem>
        </>
      )}
      <ListItem
        secondaryAction={
          <IconButton
            onClick={() => setNewFieldDialogOpen(true)}
            color="primary"
          >
            <AddBoxIcon />
          </IconButton>
        }
      >
        <Typography>Fields</Typography>
      </ListItem>
      {form.fields.map((field: any, index: number) => {
        return (
          <ListItem
            key={index}
            style={{
              background:
                field.id === selectedField ? 'rgba(0, 0, 0, 0.1)' : '',
            }}
            secondaryAction={
              <IconButton onClick={() => handleDeleteField(field.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => handleSelectField(field.id)}>
              <ListItemText>
                {index + 1}. {field.title}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )
      })}

      <ListItem
        sx={{
          bgcolor:
            selectedField === 'afterSubmit'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'rgba(0, 0, 0, 0)',
        }}
      >
        <ListItemButton
          onClick={() => handleSelectField('afterSubmit')}
          disableRipple
        >
          After Submit
        </ListItemButton>
      </ListItem>
      <Dialog
        open={newFieldDialogOpen}
        onClose={() => setNewFieldDialogOpen(false)}
      >
        <DialogTitle>New field</DialogTitle>
        <DialogContent style={{ width: '300px', paddingTop: '20px' }}>
          <Form
            onSubmit={addField}
            validate={(values: any) => {
              const errors: any = {}
              if (!values.name) {
                errors.name = 'Required'
              }
              if (!values.type) {
                errors.type = 'Required'
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
                        label="Field name"
                        value={value}
                        onChange={onChange}
                      />
                      {touched && error && (
                        <Typography color="error">{error}</Typography>
                      )}
                    </>
                  )}
                </Field>
                <Field name="type">
                  {({
                    input: { name, value, onChange },
                    meta: { touched, error },
                  }) => (
                    <>
                      <TextField
                        name={name}
                        label={name}
                        value={value}
                        onChange={onChange}
                        select
                      >
                        <MenuItem value="textShort">Short text</MenuItem>
                        <MenuItem value="textLong">Long text</MenuItem>
                        <MenuItem value="selectOne">Select</MenuItem>
                        <MenuItem value="selectMultiple">
                          Select multiple
                        </MenuItem>
                      </TextField>
                      {touched && error && (
                        <Typography color="error">{error}</Typography>
                      )}
                    </>
                  )}
                </Field>
                {values.type === 'selectOne' && (
                  <>
                    <Typography>Options</Typography>
                  </>
                )}
                <Field name="required" type="checkbox">
                  {({ input: { name, value, onChange } }) => (
                    <FormControlLabel
                      label="Required"
                      control={
                        <Checkbox
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      }
                    />
                  )}
                </Field>

                <Button type="submit">Add</Button>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </List>
  )
}

export default FormFields
