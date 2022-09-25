import React from 'react'
import {
  FormControlLabel,
  TextField,
  Switch,
  MenuItem,
  List,
  ListSubheader,
  ListItem,
  IconButton,
  ListItemButton,
} from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AddIcon from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectEditorFormFieldById,
  selectEditorFormOpeningScreen,
  selectEditorFormAfterSubmit,
  selectEditorSelectedField,
  selectOpeningScreenStyles,
  selectAfterSubmitStyles,
} from '../../../selectors/formEditor'
import {
  isMultipleChoicefield,
  SelectMultipleField,
  SelectOneField,
} from '../../../types/forms'
import { isArray } from 'lodash'
import {
  setAfterSubmitProperty,
  setFormAfterSubmitStyleProperty,
  setFormOpeningScreenStyleProperty,
  setOpeningScreenProperty,
} from '../../../actions/formEditor'
import TextAlignControl from '../../../components/input/TextAlignControl'

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

interface OptionsProps {
  onChange: (options: string[]) => void
  field: SelectMultipleField | SelectOneField
}

const Options = ({ field, onChange }: OptionsProps) => {
  const { options } = field

  const addOption = (option: string) => {
    const newOptions = isArray(options) ? [...options, option] : [option]
    onChange(newOptions)
  }
  const changeOptionValue = (value: string, index: number) => {
    const newOptions = [...options]
    newOptions[index] = value
    onChange(newOptions)
  }
  const deleteOption = (index: number) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    onChange(newOptions)
  }
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const oldOptions = [...options]
    const reorderedOptions = reorder(
      oldOptions,
      result.source.index,
      result.destination.index
    )

    onChange(reorderedOptions)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-id">
        {(provided: any, snapshot: any) => (
          <List
            subheader={
              <ListSubheader sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}>
                Options
              </ListSubheader>
            }
            dense
            {...provided.droppabledProps}
            ref={provided.innerRef}
          >
            {options &&
              options.map((option: string, index: number) => {
                return (
                  <Draggable
                    key={index}
                    draggableId={`${option}-${index}`}
                    index={index}
                  >
                    {(provided: any, snapshot: any) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index}
                        secondaryAction={
                          <IconButton onClick={() => deleteOption(index)}>
                            <RemoveCircleIcon fontSize="small" />
                          </IconButton>
                        }
                        sx={{ pl: 0 }}
                      >
                        <div style={{ display: 'flex' }}>
                          <IconButton>
                            <DragIndicatorIcon />
                          </IconButton>
                          <TextField
                            sx={{ p: 0, m: 0 }}
                            size="small"
                            variant="standard"
                            value={option}
                            onChange={(e) => {
                              changeOptionValue(e.target.value, index)
                            }}
                          />
                        </div>
                      </ListItem>
                    )}
                  </Draggable>
                )
              })}
            {provided.placeholder}
            <ListItem>
              <div style={{ display: 'flex' }}>
                <ListItemButton onClick={() => addOption('')}>
                  <AddIcon /> Add option
                </ListItemButton>
              </div>
            </ListItem>
          </List>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const FieldSettingsForm = () => {
  const fieldId = useSelector(selectEditorSelectedField)
  const field = useSelector(selectEditorFormFieldById(fieldId))
  const openingScreen = useSelector(selectEditorFormOpeningScreen)
  const afterSubmit = useSelector(selectEditorFormAfterSubmit)
  const dispatch = useDispatch()

  const screen = fieldId === 'openingScreen' ? openingScreen : afterSubmit

  const openingScreenStyles = useSelector(selectOpeningScreenStyles)
  const afterSubmitStyles = useSelector(selectAfterSubmitStyles)

  const changeAlignItems = (value: any) => {
    if (fieldId === 'afterSubmit') {
      dispatch(setFormAfterSubmitStyleProperty({ key: 'alignItems', value }))
    } else if (fieldId === 'openingScreen') {
      dispatch(setFormOpeningScreenStyleProperty({ key: 'alignItems', value }))
    }
  }

  const onChange = (key: any, value: any) => {
    if (fieldId === 'afterSubmit') {
      dispatch(setAfterSubmitProperty({ key, value }))
    } else if (fieldId === 'openingScreen') {
      dispatch(setOpeningScreenProperty({ key, value }))
    }
    dispatch({
      type: 'FORM_EDITOR/SET_FIELD_PROPERTY',
      payload: { fieldId, key, value },
    })
  }

  if (fieldId === 'afterSubmit' || fieldId === 'openingScreen') {
    return (
      <List>
        <TextField
          label="Title"
          multiline={true}
          value={screen?.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Title..."
          minRows={2}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Subtitle"
          multiline={true}
          value={screen?.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Subtitle..."
          minRows={2}
          sx={{ mb: 3 }}
        />

        {fieldId === 'openingScreen' && (
          <TextField
            sx={{ mb: 4 }}
            variant="standard"
            label="Button text"
            value={screen?.callToAction}
            onChange={(e) => onChange('callToAction', e.target.value)}
          />
        )}
        <TextAlignControl
          value={
            fieldId === 'afterSubmit'
              ? afterSubmitStyles?.alignItems
              : openingScreenStyles?.alignItems || ''
          }
          onChange={(value) => changeAlignItems(value)}
        />
      </List>
    )
  }
  if (!field) {
    return (
      <ListSubheader sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}>
        Select field to edit
      </ListSubheader>
    )
  }
  const { title, description, required, type } = field
  return (
    <List
      dense
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        bgcolor: 'rgba(0, 0, 0, 0)',
        height: 'calc(100vh - 98px)',
      }}
    >
      <ListSubheader sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}>
        Field title
      </ListSubheader>
      <ListItem>
        <TextField
          variant="standard"
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </ListItem>
      <ListSubheader sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}>
        Description (optional)
      </ListSubheader>
      <ListItem>
        <TextField
          variant="standard"
          value={description || ''}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </ListItem>
      <ListSubheader sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}>
        Field type
      </ListSubheader>
      <ListItem>
        <TextField
          variant="standard"
          value={type}
          onChange={(e) => onChange('type', e.target.value)}
          select
        >
          <MenuItem value={'textShort'}>Short text</MenuItem>
          <MenuItem value={'textLong'}>Long text</MenuItem>
          <MenuItem value={'email'}>Email</MenuItem>
          <MenuItem value={'selectOne'}>Select one</MenuItem>
          <MenuItem value={'selectMultiple'}>Select multiple</MenuItem>
        </TextField>
      </ListItem>

      <ListSubheader sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}>
        Required
      </ListSubheader>
      <ListItem>
        <FormControlLabel
          label="required"
          control={
            <Switch
              checked={required}
              onChange={(e) => onChange('required', !required)}
            />
          }
        />
      </ListItem>

      {isMultipleChoicefield(field) && (
        <Options
          field={field}
          onChange={(value: string[]) => onChange('options', value)}
        />
      )}
    </List>
  )
}

export default FieldSettingsForm
